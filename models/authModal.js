const { query } = require("../config/database");
async function getUserById(id) {
  try {
    const result = await query("SELECT * FROM users WHERE id=? limit 1", [id]);
    console.log("result", result);
    return result;
  } catch (err) {
    throw new Error(err);
  }
}
async function userExistCheck(name, email) {
  try {
    const result = await query(
      "SELECT * FROM users WHERE email=? OR name=? limit 1",
      [email, name]
    );
    return result;
  } catch (err) {
    throw new Error(err);
  }
}
async function getUserByEmail(email) {
  try {
    const [result] = await query("SELECT * FROM users WHERE email=? limit 1", [
      email,
    ]);
    console.log("result", result);
    return result;
  } catch (err) {
    throw new Error(err);
  }
}
async function getUserByPhoneNo(phoneNo) {
  try {
    const [result] = await query("SELECT * FROM users WHERE phone=? limit 1", [
      phoneNo,
    ]);
    console.log("result", result);
    return result.length ? result[0] : null;
  } catch (err) {
    throw new Error(err);
  }
}
async function createUserByPhoneNo(userId, name, phone, firebaseToken) {
  try {
    const [result] = await query(
      "INSERT INTO users(userId,name,phone,firebaseToken) VALUES(?, ?, ?, ?)",
      [userId, name, phone, firebaseToken]
    );
    const id = result.insertId;
    return getUserById(id);
  } catch (err) {
    throw new Error(err);
  }
}
async function createUserByEmail(userId, name, email, password) {
  try {
    const result = await query(
      "INSERT INTO users(userId,name,email,password,role_id) VALUES(?, ?, ?, ?, ?)",
      [userId, name, email, password, 2]
    );
    const id = result.insertId;
    return getUserById(id);
  } catch (err) {
    throw new Error(err);
  }
}
async function getRoleById(id) {
  try {
    const result = await query("SELECT * FROM roles WHERE id=? limit 1", [id]);
    console.log("result", result);
    return result[0];
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  getUserByEmail,
  getUserByPhoneNo,
  userExistCheck,
  createUserByEmail,
  getRoleById,
};
