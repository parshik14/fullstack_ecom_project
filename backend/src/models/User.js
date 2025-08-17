const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { string, trim, maxLength, email, lowercase, minLength } = require("zod");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 120,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: ["customer", "seller", "admin"],
    default: "customer",
    index: true,
  },
  isEmailVerifield: {
    type: Boolean,
    default: false,
  },
  loginAttempts: {
    type: Number,
    default: 0,
  },
  lockUntill: {
    type: Date,
    default: null,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidate) {
    return bcrypt.compare(candidate,this.password)
}

userSchema.virtual("isLocked").get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

module.exports = mongoose.model("User",userSchema)