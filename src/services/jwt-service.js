import jwt from "jsonwebtoken";

const generateAccessToken = (user) =>
  jwt.sign(user, process.env.JWT_TOKEN_SECRET, { expiresIn: "1d" });

const verifyAccessToken = (token) =>
  jwt.verify(token, process.env.JWT_TOKEN_SECRET);

export default {
  generateAccessToken,
  verifyAccessToken,
};
