const admin = require("firebase-admin");
const serviceAccount = require("../testotp-1be8c-firebase-adminsdk-s4nlh-f40d557fe3.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const firebase = admin.firestore();
module.exports = firebase;
