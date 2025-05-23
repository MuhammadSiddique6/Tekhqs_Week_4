const db = require("../models");
const User = db.User;
const nodemailer = require("nodemailer");
const otpfun = require("../utility/otp");
require("dotenv").config();

exports.verification = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).send("User not found");
    }
    if (Date.now() > user.otp_expiry) {
      return res.status(400).json({ message: "OTP has expired" });
    } else {
      if (user.otp === otp) {
        await User.update(
          {
            verify: true,
            otp: null,
            otp_expiry: null,
          },
          {
            where: { id: user.id },
          }
        );

        return res.status(200).send("OTP matched and user verified");
      } else {
        return res.status(400).send("Incorrect OTP");
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Verification Error:", error: error.message });
  }
};

exports.resend = async (req, res) => {
  try {
    const { email } = req.body;
    const { otp, expiry } = await otpfun(email);
    const user = await User.findOne({ where: { email } });
    await User.update(
      {
        otp: otp,
        otp_expiry: expiry,
      },
      {
        where: { id: user.id },
      }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ADMIN_GMAIL,
        pass: process.env.Email_Password,
      },
    });

    const mailOptions = {
      from: process.env.ADMIN_GMAIL,
      to: email,
      subject: "Your OTP for Signup",
      html: `<h3>Your OTP is: <strong>${otp}</strong></h3>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send("Resend Otp successfully");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Resend Otp Error:", error: error.message });
  }
};
