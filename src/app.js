// #region Imports & Setup
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");

const { dateTime } = require("./tools/dateTime");

const fs = require("fs");

const app = express(); // creates app for server's client
const chalk = require("chalk"); // console colors
const bcrypt = require("bcrypt"); // encryption
const crypto = require("crypto"); // generate strings

const axios = require("axios");

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

dotenv.config({ path: "../.env" });

app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.static("views")); // load the files that are in the views directory

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(bodyParser.json()); // Express modules / packages
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
); // Express modules / packages

// #endregion

// #region Database Stuff

const client = new MongoClient(process.env.URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

db = client.db("ppsbathrooms");
dataColl = db.collection("data");
userColl = db.collection("users");

client
  .connect()
  .then(() => {
    console.error(chalk.green("connected to database"));
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });

//updates bathroom data

async function setBrData(school, value, request) {
  try {
    doc = await dataColl.findOne({ _id: "schoolData" });
    doc = doc.value;

    chs = doc[0];
    fhs = doc[1];
    ihs = doc[2];

    switch (school) {
      case "chs":
        chs = value;
        break;
      case "fhs":
        fhs = value;
        break;
      case "ihs":
        ihs = value;
        break;
    }

    newValue = [chs, fhs, ihs];
    numDiff = numDiffCharacters(newValue, doc);
    if (numDiff > 0) {
      dbEntry(request, "bathrooms", value, school, numDiff);
    }
    await updateBrs(newValue);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

async function updateBrs(newValue) {
  brUpdated();
  try {
    await client.connect();
    await dataColl.updateOne(
      { _id: "schoolData" },
      { $set: { value: newValue } },
      {}
    );
    updateExtensionData();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// #endregion

// #region Pages
async function getLastUpdated() {
  try {
    const [chsData, fhsData, ihsData] = await Promise.all([
      db
        .collection("bathrooms")
        .find({ school: "chs" })
        .sort({ time: -1 })
        .limit(1)
        .toArray(),
      db
        .collection("bathrooms")
        .find({ school: "fhs" })
        .sort({ time: -1 })
        .limit(1)
        .toArray(),
      db
        .collection("bathrooms")
        .find({ school: "ihs" })
        .sort({ time: -1 })
        .limit(1)
        .toArray(),
    ]);

    // Get time for each school, default to null if no data found
    const chstime = chsData.length > 0 ? chsData[0].time : null;
    const fhstime = fhsData.length > 0 ? fhsData[0].time : null;
    const ihstime = ihsData.length > 0 ? ihsData[0].time : null;

    // Return the array of times
    return { chs: chstime, fhs: fhstime, ihs: ihstime };
  } catch (error) {
    console.error(
      "An error occurred while fetching last updated times:",
      error
    );
    throw new Error("Unable to fetch last updated times");
  }
}

// Bathrooms
app.get("/", async (req, res) => {
  try {
    pageVisited();
    res.render("html/index");
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/cleveland", async (req, res) => {
  try {
    const bathroomData = await dataColl.findOne({ _id: "schoolData" });
    const lastUpdatedData = await getLastUpdated();
    const dataToSendToClient = {
      brData: bathroomData.value,
      lastUpdated: JSON.stringify(lastUpdatedData),
      school: "chs",
    };
    pageVisited();
    res.render("html/home", { data: dataToSendToClient });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/franklin", async (req, res) => {
  try {
    const bathroomData = await dataColl.findOne({ _id: "schoolData" });
    const lastUpdatedData = await getLastUpdated();
    const dataToSendToClient = {
      brData: bathroomData.value,
      lastUpdated: JSON.stringify(lastUpdatedData),
      school: "fhs",
    };
    pageVisited();
    res.render("html/home", { data: dataToSendToClient });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/ida", async (req, res) => {
  try {
    const bathroomData = await dataColl.findOne({ _id: "schoolData" });
    const lastUpdatedData = await getLastUpdated();
    const dataToSendToClient = {
      brData: bathroomData.value,
      lastUpdated: JSON.stringify(lastUpdatedData),
      school: "ihs",
    };
    pageVisited();
    res.render("html/home", { data: dataToSendToClient });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/help", (req, res) => {
  res.render("html/help.html");
  pageVisited();
});

app.get("/about", (req, res) => {
  res.render("html/about.html");
  pageVisited();
});

app.get("/contact", (req, res) => {
  res.render("html/contact.html");
  pageVisited();
});

app.get("/privacy", (req, res) => {
  res.render("html/privacy.html");
  pageVisited();
});

app.get("/terms", (req, res) => {
  res.render("html/terms.html");
  pageVisited();
});

app.get("/schools", (req, res) => {
  res.render("html/schools.html");
  pageVisited();
});

//404 keep at end of redirects
app.get("*", (req, res) => {
  res.status(404).render("html/404.html", {});
});

// #endregion

// #region Posts
app.post("/bathroomUpdate", async function (req, res) {
  try {
    var values = req.body.values;
    var school = req.body.school;
    var providedPassword = req.body.confirmation;

    var schoolData = await db
      .collection("data")
      .findOne({ _id: school + "Pass" });

    if (!schoolData || !schoolData.password) {
      console.log("Invalid request or password not found for school: ", school);
    }

    var neededPassword = schoolData.password;

    if (
      req.session.authenticated &&
      providedPassword === "c2fRCdYotZ" &&
      hasAccess("multiBathroomUpdate", req.session)
    ) {
      res.json({ isCorrect: true });
      setBrData(school, values, req);
    } else {
      if (
        neededPassword &&
        providedPassword.toLowerCase() === neededPassword.toLowerCase()
      ) {
        values = values.toString().replace(/[\n\r\s]/g, "");
        res.json({ isCorrect: true });
        setBrData(school, values, req);
      } else {
        res.json({ isCorrect: false, error: "Incorrect password" });
      }
    }
  } catch (err) {
    console.error("Error:", err);
  }
});

app.post("/sendFeedback", function (req, res) {
  dbEntry(req, "feedback", req.body.feedback);
});

async function dbEntry(request, collectionName, value, school, numChanged) {
  try {
    await client.connect();
    const collection = db.collection(collectionName);
    const dt = dateTime();
    const reqTime = `${dt.date.year}/${dt.date.month}/${dt.date.day} ${dt.time.hours}:${dt.time.minutes}:${dt.time.seconds} ${dt.time.ampm}`;
    const dbentry = {
      time: reqTime,
      ip: request.headers["x-forwarded-for"] || request.socket.remoteAddress,
    };
    if (school) {
      dbentry.school = school;
    }
    if (value) {
      dbentry.value = value;
    }
    if (numChanged) {
      dbentry.numChanged = numChanged;
    }
    await collection.insertOne(dbentry);
  } catch (err) {
    console.error("Error: ", err);
  }
}

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function pageVisited() {
  try {
    await client.connect();
    const collection = db.collection("pageVisits");
    dt = dateTime();
    const reqDate = `${dt.date.year}/${dt.date.month}/${dt.date.day}`;
    const filter = { date: reqDate };

    const existingDocument = await collection.findOne(filter);

    if (existingDocument) {
      // If the document exists, update the 'visits' field by incrementing it
      await collection.updateOne(filter, { $inc: { visits: 1 } });
    } else {
      // If the document doesn't exist, insert a new one with 'visits' set to 1
      await collection.insertOne({
        date: reqDate,
        visits: 1,
      });
    }
  } catch (err) {
    console.error("Error: ", err);
  }
}

async function brUpdated() {
  try {
    await client.connect();
    await dataColl.updateOne(
      { _id: "bathroomUpdates" },
      { $inc: { value: 1 } }
    );
  } catch (err) {
    console.error("Error: ", err);
  }
}
// #endregion

// #region Other Nonsense
function numDiffCharacters(arr1, arr2) {
  let differentCharacters = 0;

  for (let i = 0; i < arr1.length; i++) {
    const str1 = arr1[i];
    const str2 = arr2[i];

    for (let j = 0; j < Math.min(str1.length, str2.length); j++) {
      if (str1[j] !== str2[j]) {
        differentCharacters++;
      }
    }

    differentCharacters += Math.abs(str1.length - str2.length);
  }
  return differentCharacters;
}

app
  .route("/reqtypes")
  .get(function (req, res) {
    res.send("Get");
  })
  .post(function (req, res) {
    res.send("Post");
  })
  .put(function (req, res) {
    res.send("Put");
  });

const PORT = process.env.PORT || 42069;
// thing that works but nobody knows how PLZ DONT TOUCH PLZZZZ
// i touched it... sorry :(
app.listen(PORT, "0.0.0.0", () => {
  console.log(`server started on port ${PORT}`);
});

// #endregion
