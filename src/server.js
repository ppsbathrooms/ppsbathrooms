const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");
const chalk = require("chalk");

// .env file must be in src folder
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

const validSchools = ["franklin", "cleveland", "ida"];

// MongoDB
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_NAME}.${process.env.DB_ID}.mongodb.net/`;
const DB_NAME = process.env.DB_NAME;

async function connectToDatabase() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log(chalk.green("Successfully connected to MongoDB"));

    const db = client.db(DB_NAME);
    const collections = await db.listCollections().toArray();

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
app.use(express.json());

app.get("/", (req, res) => {
  res.render("html/index");
});

const staticPages = ["contact", "privacy", "terms", "help"];
staticPages.forEach((page) => {
  app.get(`/${page}`, (req, res) => {
    res.render(`html/${page}`);
  });
});

app.get("/update", async (req, res) => {
  try {
    if (!mongoClient)
      return res
        .status(500)
        .send("Error: Database not connected, please reload your page");

    const bathroomCollection = req.db.collection("bathroomStatus");
    const results = await Promise.all(
      validSchools.map((s) => bathroomCollection.findOne({ school: s }))
    );

    if (results.includes(null))
      return res.status(500).send("Error finding data for a school");

    const schools = Object.fromEntries(
      results.map((r, i) => [validSchools[i], { bathrooms: r.data }])
    );
    res.render("html/update", { data: { schools } });
  } catch (e) {
    console.error("An error occurred:", e);
    res.status(500).render("html/error");
  }
});

// update bathrooms post
app.post("/update-bathrooms", async (req, res) => {
  try {
    const bathroomUpdates = req.body;
    const bathroomCollection = req.db.collection("bathroomStatus");

    // Update each school's bathroom status
    for (const school in bathroomUpdates) {
      await bathroomCollection.updateOne(
        { school: school },
        { $set: { data: bathroomUpdates[school] } }
      );
    }

    res.status(200).json({ message: "Bathrooms updated successfully" });
  } catch (error) {
    console.error("Error updating bathrooms:", error);
    res.status(500).json({ message: "Failed to update bathrooms" });
  }
});

// schools
app.get("/:school", async (req, res) => {
  try {
    if (!mongoClient) {
      return res
        .status(500)
        .send("Error: Database not connected, please reload your page");
    }

    const school = req.params.school.toLowerCase();

    // is valid school
    if (!validSchools.includes(school)) {
      return res.status(404).render("html/404");
    }

    const bathroomCollection = req.db.collection("bathroomStatus");

    const bathroomData = await bathroomCollection.findOne({
      school: school,
    });

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
