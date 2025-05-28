const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.User;
const jwt = require("jsonwebtoken");
const otpfun = require("../utility/otp");
const Joi = require("joi");

const SECRET_KEY = process.env.SECRET_KEY;

const signupSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("employer", "freelancer").required(),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

exports.signup = async (req, res) => {
  const { error } = signupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, email, password, role } = req.body;

  try {
    const existemail = await User.findOne({ where: { email } });
    if (existemail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const { otp, expiry } = await otpfun(email);

    await User.create({
      role,
      name,
      email,
      password: hashedPassword,
      otp,
      verify: false,
      otp_expiry: expiry,
      permission: true,
      password_verify: true,
    });

    res.status(200).json({ message: "User added and OTP sent!" });
  } catch (error) {
    res.status(500).json({ message: "Error during signup", error: error.message });
  }
};

exports.signin = async (req, res) => {
  const { error } = signinSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    if (user.verify && user.permission) {
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        SECRET_KEY,
        { expiresIn: "2d" }
      );

      user.token = token;
      await user.save();

      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } else {
      return res.status(400).json({ message: "Not verified or Blocked By Admin" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error logging in user", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    await User.destroy({ where: { email } });

    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

exports.logout = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not logged in" });
    }

    if (user.verify && user.permission) {
      user.token = null;
      await user.save();

      return res.status(200).json({
        message: "Logout successful",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
