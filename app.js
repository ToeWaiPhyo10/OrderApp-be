const express = require("express");
const noteRoutes = require("./routes/notesRoutes");
const authRoutes = require("./routes/authRoutes");
const { firebaseAdmin } = require("./config/firebase");
const { uploadRoutes } = require("./routes/uploadRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", noteRoutes);
app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);

// async function verifyAccessToken(accessToken) {
//   try {
//     const decodedToken = await firebaseAdmin.auth().verifyIdToken(accessToken);
//     const uid = decodedToken.uid;
//     // The access token is valid and belongs to the user with the corresponding UID
//     console.log("User ID:", uid);
//     return uid;
//   } catch (error) {
//     console.error("Error verifying access token:", error);
//     // The access token is invalid or verification failed
//     throw error;
//   }
// }

// app.get("/notes", async (req, res) => {
//   const notes = await getNotes();
//   res.send(notes);
// });
// app.get("/notes/:id", async (req, res) => {
//   const id = req.params.id;
//   const notes = await getNote(id);
//   res.send(notes);
// });
// app.post("/notes", async (req, res) => {
//   const { title, contents } = req.body;
//   const notes = await createNote(title, contents);
//   res.status(201).send(notes);
// });
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke");
});
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
