const { query } = require("../config/database.js");

async function getNotes() {
  try {
    const [result] = await query("SELECT * from notes");

    return result;
  } catch (err) {
    throw new Error(err);
  }
}
async function getNote(id) {
  try {
    const [result] = await query(
      `
    SELECT *
    FROM notes
    WHERE id = ?`,
      [id]
    );

    return result[0];
  } catch (err) {
    throw new Error(err);
  }
}
async function createNote(title, contents) {
  try {
    const [result] = await query(
      `
    INSERT INTO notes (title,contents)
    VALUES (?,?)`,
      [title, contents]
    );
    const id = result.insertId;

    return getNote(id);
  } catch (err) {
    throw new Error(err);
  }
}
module.exports = {
  getNotes,
  getNote,
  createNote,
};
