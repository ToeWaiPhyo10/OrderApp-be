const express = require("express");
const noteRoutes = require("./routes/notesRoutes");

const app = express();
app.use(express.json());

app.use("/", noteRoutes);
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
