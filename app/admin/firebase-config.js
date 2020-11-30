
// var admin = require("firebase-admin");

// var serviceAccount = require("./serviceAccountKey.json");
// // var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://blood-a.firebaseio.com"
// });


// module.exports = admin





var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://blood-a.firebaseio.com"
});
