const db = require("../models");
const Post_job = db.Post_job;
const offer = db.Offer;
const  Notifications = db.Notifications;
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
      if (offers) {
        await Notifications.create({
          message_id: null,
          offer_id: offers.id,
          job_id: pj.id, 
        });
      }
      res.status(200).json({ message: "offer successfuly sent", newoffer: offers });
    }
  } catch (err) {
    res.status(500).json({messsage: "Internal server Error:",error: err.message});
  }
};
exports.getalloffers = async (req, res) => {
  try {
    const alloffers = await offer.findAll({
      include: [
        {
          model: db.User,
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!alloffers || alloffers.length === 0) {
      return res.status(404).json({ message: "No offers found" });
    }

    res.status(200).json({message: "All Offers",offers: alloffers,});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching offers", error: error.message });
  }
};

