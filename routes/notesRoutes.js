const express = require("express");
const noteController = require("../controllers/notesController");
const { verifyUserRole } = require("../config/jwt");
const noteRoutes = express.Router();
noteRoutes.get("/notes", verifyUserRole("user"), noteController.getAllNotes);
noteRoutes.get("/note/:id", noteController.getNoteById);
noteRoutes.post("/notes", noteController.createNote);
module.exports = noteRoutes;
