const {
  getUserByEmail,
  userExistCheck,
  createUserByEmail,
  getRoleById,
} = require("../models/authModal");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { generateToken } = require("../config/jwt");

async function login(req, res) {
  const { name, email, password } = req.body;
  const userExist = await getUserByEmail(email);
  if (!userExist) {
    return res.status(401).send("Invalid email or password");
  }
  const isPasswordValid = await bcrypt.compare(password, userExist?.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const role = await getRoleById(userExist?.role_id);
  console.log("role", role);
  const token = generateToken(userExist?.id, role.name);
  const userData = {
    userId: userExist?.userId,
    id: userExist?.id,
    name: userExist?.name,
    email: userExist?.email,
    phone: userExist?.phone,
    created_at: userExist?.created_at,
    updated_at: userExist?.updated_at,
    role: role,
  };
  const response = { token: token, user: userData };
  res.json({ message: "Successfully logged in", response });
}
async function register(req, res) {
  const { name, email, password } = req.body;

  const userNameOrEmailCheck = await userExistCheck(name, email);

  if (userNameOrEmailCheck.length > 0) {
    return res.status(401).send("This email is already used");
  }
  const userId = uuidv4();

  // Generate a salt to use during the hashing process
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  // Hash the password using the generated salt
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await createUserByEmail(userId, name, email, hashedPassword);
  return res.status(201).send(user);
}

module.exports = { login, register };
