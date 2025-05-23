const db = require("../models");
const Profile = db.Profile_setup;

exports.profile = async (req, res) => {
  try {
    const profile_img = `uploads/${req.file.filename}`;
    const role = req.user.role; 
    const user_id = req.user.id; 
    console.log(role);
    console.log(profile_img);
    if (role === "Employer" || role === "employer") {
      const { bio, company_name, skill, experience } = req.body;

      await Profile.create({
        profile_img,
        bio,
        company_name,
        user_id,
        experience,
        skill,
      });

      return res
        .status(200)
        .json({ message: "Employer profile created successfully" });
    } else if (role === "Freelancer" || role === "freelancer") {
      const { bio, skill, experience } = req.body;

      await Profile.create({
        profile_img,
        bio,
        skill,
        experience,
        user_id,
      });

      return res
        .status(200)
        .json({ message: "Freelancer profile created successfully" });
    } else {
      return res
        .status(400)
        .json({ error: "Invalid role. Must be employer or freelancer." });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error creating profile", message: err.message });
  }
};
