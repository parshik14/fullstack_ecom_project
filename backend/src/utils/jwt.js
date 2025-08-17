const jwt = require("jsonwebtoken");

const signAcessToken = (payload) => {
  jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "15m",
  });
};

const signRefreshToken = (payload) => {
  jwt.sign(payload, process.env.JWT_REFRESH_SECRET || "7m", {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "7m",
  });
};

const verifyAccessToken = (token) => {
  jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

const verifyRefreshToken = (token) => {
  jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

module.exports = {
  signAcessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
