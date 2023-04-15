require("dotenv").config();
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

const serviceAccount = require("./elearn.json");

const app = express();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.databaseURL,
});

// muiddleware to parse JSON request body
app.use(express.json());
// Allow requests from any origin
app.use(cors());
// Verify Firebase ID token middleware
const verifyIdToken = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    const idToken = authorizationHeader.split("Bearer ")[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Get the user's UID that you want to add custom claims to
const uid = process.env.UID; // Replace with your UID

// Route to get all authenticated users
app.get("/users", async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers();
    const users = listUsersResult.users;
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// route to add new user
app.post("/signup/users", async (req, res) => {
  const { email, password, firstName, lastName, type, country } = req.body;
  try {
    const userCredential = await admin.auth().createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    });

    // Set custom claims
    await admin.auth().setCustomUserClaims(userCredential.uid, {
      type,
      country,
    });

    // Add additional user information to Firestore
    const user = {
      uid: userCredential.uid,
      email,
      displayName: `${firstName} ${lastName}`,
      country,
      type,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await admin
      .firestore()
      .collection("users")
      .doc(userCredential.uid)
      .set(user);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
});

app.get("/user/:uid", async (req, res) => {
  const { uid } = req.params;

  try {
    const userRecord = await admin.auth().getUser(uid);
    const user = {
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
      customClaims: userRecord.customClaims,
    };
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user data" });
  }
});

// route to update user custom claims
app.put("/users/:userId/customClaims", async (req, res) => {
  const userId = req.params.userId;
  const customClaims = req.body;
  try {
    // update user custom claims
    await admin.auth().setCustomUserClaims(userId, customClaims);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating custom claims");
  }
});

// Update user profile endpoint
app.put("/users/:userId/profile", async (req, res) => {
  const { userId } = req.params;
  const { name, email, bio } = req.body;

  try {
    // Check if user exists
    const userRecord = await admin.auth().getUser(userId);

    // Update user's name and email in Firebase Auth
    await admin.auth().updateUser(userId, { displayName: name, email });

    // Update user's bio in Firestore
    await admin.firestore().collection("users").doc(userId).update({ bio });

    res.status(200).send("User profile updated successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating user profile.");
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is running on: ${PORT}`);
});
