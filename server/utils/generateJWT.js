const jwt = require("jsonwebtoken");

const generateToken = ({ username, _id }) => {
  const payload = { username, _id };
  return jwt.sign({ data: payload }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });
};

module.exports = { generateToken };
