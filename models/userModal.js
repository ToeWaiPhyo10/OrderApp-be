const { query } = require("../config/database");

async function getAllUsers() {
  try {
    const [users] = await query(`SELECT * FROM users`);
    return users;
  } catch (err) {
    throw new Error(err);
  }
}
async function getUserById(id) {
  try {
    const [user] = await query(`SELECT * FROM users WHERE id=?`, [id]);
    return user[0];
  } catch (err) {
    throw new Error(err);
  }
}
module.exports = { getAllUsers, getUserById };
