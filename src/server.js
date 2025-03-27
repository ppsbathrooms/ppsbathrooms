const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");
const chalk = require("chalk");

const app = express();
const PORT = process.env.PORT || 42069;

// MongoDB
const MONGODB_URI =
  "mongodb+srv://admin:fUg234tkVwVz47B@ppsbathrooms.ht1h6xw.mongodb.net/";
const DB_NAME = "ppsbathrooms";

async function connectToDatabase() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log(chalk.green("Successfully connected to MongoDB"));

    const db = client.db(DB_NAME);
    const collections = await db.listCollections().toArray();

    // console.log(chalk.blue("Available Collections:"));
    // collections.forEach((collection) => {
    //   console.log(chalk.blue(`- ${collection.name}`));
    // });

    return client;
  } catch (error) {
    console.error(chalk.red("MongoDB Connection Error:"), error);
    throw error;
  }
}

let mongoClient;
connectToDatabase()
  .then((client) => {
    mongoClient = client;
  })
  .catch((error) => {
    console.error("Failed to connect to database", error);
    process.exit(1);
  });

app.use((req, res, next) => {
  if (mongoClient) {
    req.db = mongoClient.db(DB_NAME);
  } else {
    console.error(chalk.red("Database connection not established"));
  }
  next();
});

app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
  res.render("html/index");
});

const staticPages = ["contact", "privacy", "terms", "help"];
staticPages.forEach((page) => {
  app.get(`/${page}`, (req, res) => {
    res.render(`html/${page}`);
  });
});

// schools
app.get("/:school", async (req, res) => {
  try {
    if (!mongoClient) {
      return res
        .status(500)
        .send("Error: Database not connected, please reload your page");
    }

    const validSchools = ["franklin", "cleveland", "ida"];
    const school = req.params.school.toLowerCase();

    // is valid school
    if (!validSchools.includes(school)) {
      return res.status(404).render("html/404");
    }

    const bathroomCollection = req.db.collection("bathroomStatus");

    const bathroomData = await bathroomCollection.findOne({
      school: school,
    });

    // console.log(chalk.green(`Bathroom Data for ${school}:`));
    // console.log(JSON.stringify(bathroomData, null, 2));

    if (!bathroomData) {
      return res.send("Error finding school's data, please reload your page");
    }

    const dataToClient = {
      school: school,
      bathrooms: bathroomData.data,
    };

    res.render("html/maps", { data: dataToClient });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).render("html/error");
  }
});

// 404 handler - this should be the last route
app.use((req, res) => {
  res.status(404).render("html/404");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  if (mongoClient) {
    await mongoClient.close();
    console.log(chalk.yellow("MongoDB connection closed"));
  }
  process.exit();
});
