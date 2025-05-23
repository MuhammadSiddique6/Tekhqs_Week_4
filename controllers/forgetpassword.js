const db = require("../models");
const User = db.User;
const bcrypt = require("bcrypt");
const otpfun = require("../utility/otp");

exports.forgetotp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    const { otp, expiry } = await otpfun(email);
    await User.update(
      {
        otp: otp,
        otp_expiry: expiry,
      },
      {
        where: { id: user.id },
      }
    );
    res.status(200).send("Otp sent to user");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Otp not send error:", error: error.message });
  }
};

exports.forgetpass = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).send("User not found");
    }

    if (user.otp === otp) {
      await User.updateOne(
        { password_verify: false, otp: null, otpexpiry: null },
        {
          where: { id: user.id },
        }
      );
      return res.status(200).send("OTP matched!");
    } else {
      return res.status(400).send("Incorrect OTP");
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Forget password error:", error: error.message });
  }
};

exports.newpassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).send("User not found");
    }

    if (user.password_verify === false) {
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.updateOne(
        { password: hashedPassword, password_verify: true },
        {
          where: { id: user.id },
        }
      );

      return res.status(200).send("Password reset successfully");
    } else {
      return res.status(400).send("OTP not verified or already used");
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Password Reset Error:", error: error.message });
  }
};
