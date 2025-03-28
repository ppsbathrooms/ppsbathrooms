const express = require("express");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const session = require("express-session");
const MongoStore = require("connect-mongo");

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

// Initialize session middleware with MemoryStore first
// This ensures session is available even if MongoDB connection fails initially
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback_secret_key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGODB_URI,
      dbName: DB_NAME,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    },
  })
);

// Database middleware
app.use(async (req, res, next) => {
  try {
    if (mongoClient) {
      req.db = mongoClient.db(DB_NAME);
    } else {
      console.error(chalk.red("Database connection not established"));
      return res.status(500).send("Database connection error");
    }
    next();
  } catch (error) {
    console.error(chalk.red("Database middleware error:"), error);
    res.status(500).send("Internal server error");
  }
});

// Authentication middleware
function requireAuth(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect(`/login?returnTo=${encodeURIComponent(req.originalUrl)}`);
  }
}

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

let mongoClient;
connectToDatabase()
  .then((client) => {
    mongoClient = client;
    console.log("MongoDB connected and session store initialized");

    // start server after database is connected
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database", error);
    process.exit(1);
  });

app.get("/login", (req, res) => {
  // if already logged in, redirect to update page
  if (req.session.user) {
    return res.redirect("/update");
  }

  const returnTo = req.query.returnTo || "/update";
  res.render("html/login", { returnTo });
});

// login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Ensure db is available
    if (!req.db) {
      return res.status(500).json({ message: "Database connection error" });
    }

    const accountsCollection = req.db.collection("accounts");

    // Find user by email
    const user = await accountsCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create session
    req.session.user = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    // Redirect to either the returnTo URL or /update
    const returnTo = req.body.returnTo || "/update";
    res.status(200).json({
      message: "Login successful",
      redirectTo: returnTo,
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ message: "Error during login", details: error.message });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Could not log out" });
    }
    res.clearCookie("connect.sid");
    res.status(200).json({
      message: "Logged out successfully",
      redirectTo: "/",
    });
  });
});

app.post("/change-password", requireAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // validate input
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Current and new passwords are required" });
    }

    // ensure db is available
    if (!req.db) {
      return res.status(500).json({ message: "Database connection error" });
    }

    const accountsCollection = req.db.collection("accounts");
    const userId = new ObjectId(req.session.user.id);

    // find current user
    const user = await accountsCollection.findOne({
      _id: userId,
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // validate new password requirements
    if (
      newPassword.length < 8 ||
      !/[a-zA-Z]/.test(newPassword) ||
      !/[0-9]/.test(newPassword) ||
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword)
    ) {
      return res
        .status(400)
        .json({ message: "New password does not meet requirements" });
    }

    // hash new password
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
    // update password in database
    await accountsCollection.updateOne(
      { _id: userId },
      { $set: { password: hashedNewPassword } }
    );

    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Password change error:", error);
    res.status(500).json({
      message: "Error changing password",
      details: error.message,
    });
  }
});

app.get("/update", requireAuth, async (req, res) => {
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

    const userEmail = req.session.user.email;

    res.render("html/update", { data: { schools, userEmail } });
  } catch (e) {
    console.error("An error occurred:", e);
    res.status(500).render("html/error");
  }
});

app.post("/update-bathrooms", requireAuth, async (req, res) => {
  try {
    const bathroomUpdates = req.body;
    const bathroomCollection = req.db.collection("bathroomStatus");

    // update each school's bathroom status
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

// Graceful shutdown
process.on("SIGINT", async () => {
  if (mongoClient) {
    await mongoClient.close();
    console.log(chalk.yellow("MongoDB connection closed"));
  }
  process.exit();
});
