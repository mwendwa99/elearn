require("dotenv").config();

var admin = require("firebase-admin");

var serviceAccount = require("./elearn.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://elearn-381507.firebaseio.com",
});

// Get the user's UID that you want to add custom claims to
const uid = process.env.UID; // Replace with your UID

// Set custom claims
const customClaims = {
  admin: true, // Replace with your custom claims
};

// Set the custom claims to the user's token
// admin
//   .auth()
//   .setCustomUserClaims(uid, customClaims)
//   .then(() => {
//     console.log("Custom claims added to the user successfully!");
//   })
//   .catch((error) => {
//     console.error(error);
//   });

admin
  .auth()
  .listUsers()
  .then((userRecords) => {
    if (userRecords && typeof userRecords === "object") {
      Object.values(userRecords).forEach((user) => {
        console.log(user);
      });
    }
  })
  .catch((error) => {
    console.log(`Error fetching user data: ${error}`);
  });
