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

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is running on: ${PORT}`);
});

// // Set custom claims
// const customClaims = {
//   admin: true, // Replace with your custom claims
// };

// // Set the custom claims to the user's token
// // admin
// //   .auth()
// //   .setCustomUserClaims(uid, customClaims)
// //   .then(() => {
// //     console.log("Custom claims added to the user successfully!");
// //   })
// //   .catch((error) => {
// //     console.error(error);
// //   });

// admin
//   .auth()
//   .listUsers()
//   .then((userRecords) => {
//     if (userRecords && typeof userRecords === "object") {
//       Object.values(userRecords).forEach((user) => {
//         console.log(user);
//       });
//     }
//   })
//   .catch((error) => {
//     console.log(`Error fetching user data: ${error}`);
//   });
