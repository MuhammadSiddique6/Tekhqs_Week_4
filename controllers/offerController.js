const db = require("../models");
const Post_job = db.Post_job;
const offer = db.Offer;
exports.offers = async (req, res) => {
  try {
    const { cover_letter, bids, duration_time, milestone } = req.body;
    const user_id = req.user.id;
    const pj = await Post_job.findOne({ where: { user_id } });
    if (!pj) {
      res.status(401).send("Job not found"); 
    } else {
      const offers = await offer.create({
        cover_letter,
        bids,
        duration_time,
        milestone,
        job_id: pj.id,
        user_id,
      });
      res
        .status(200)
        .json({ message: "offer successfuly sent", newoffer: offers });
    }
  } catch (err) {
    res.status(500).json({
      messsage: "Internal server Error:",
      error: err.message,
    });
  }
};
