const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const key = process.env.SECRET_KEY;

const HashPassword = (password) => {
  return bcrypt.hashSync(password, 8);
};

const CompareHash = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

const SignToken = (payload) => {
  return jwt.sign(payload, key);
};

const VerifyToken = (token) => {
  return jwt.verify(token, key);
};

module.exports = {
  HashPassword,
  CompareHash,
  SignToken,
  VerifyToken,
};
