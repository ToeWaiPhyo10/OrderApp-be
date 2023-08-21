const express = require("express");
const noteController = require("../controllers/notesController");
const noteRoutes = express.Router();
noteRoutes.get("/notes", noteController.getAllNotes);
noteRoutes.get("/note/:id", noteController.getNoteById);
noteRoutes.post("/notes", noteController.createNote);
module.exports = noteRoutes;
