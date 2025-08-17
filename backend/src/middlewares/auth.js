const jwt = require("jsonwebtoken");
const User = require("../models/User");

const parseAuthHeader = (req) => {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Bearer ")) {
    return null;
  }
  return header.split(" ")[1];
};

const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || parseAuthHeader(req);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(decoded.sub).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const authorize = (...roles) =>
(req,res,next)=>{
    if(!req.user || !roles.includes(req.user.role)){
        return res.status(401).json({
            message : "Forbidden"
        })
    }
    next()
}

module.exports = {protect,authorize}

