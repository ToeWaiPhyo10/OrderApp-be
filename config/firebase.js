const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("../testotp-1be8c-firebase-adminsdk-s4nlh-655ea012df.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

module.exports = { firebaseAdmin };
