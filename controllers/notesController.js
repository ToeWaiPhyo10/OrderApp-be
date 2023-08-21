const noteModals = require("../models/notesModel");
const crypto = require("crypto");
const getAllNotes = async (req, res, next) => {
  const notes = await noteModals.getNotes();
  function generateSecretKey(length = 32) {
    return crypto.randomBytes(length).toString("hex");
  }

  const secretKey = generateSecretKey();
  console.log("Generated Secret Key:", secretKey);

  res.send(notes);
};
const getNoteById = async (req, res) => {
  const { id } = req.params;
  const note = await noteModals.getNote(id);
  res.send(note);
};
const createNote = async (req, res) => {
  const { title, contents } = req.body;
  const note = await noteModals.createNote(title, contents);
  res.status(201).send(note);
};
module.exports = { getAllNotes, getNoteById, createNote };
