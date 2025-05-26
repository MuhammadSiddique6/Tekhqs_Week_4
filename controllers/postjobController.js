const db = require("../models");
const post_job = db.Post_job;
const Notifications = db.Notifications;
exports.post = async (req, res) => {
  try {
    const { title, bids, description,duration } = req.body;
    const user_id = req.user.id;

    const post = await post_job.create({
      title,
      bids,
      description,
      duration,
      user_id,
    });
    if(post){
        const job_id = post.id;
        await Notifications.create({
          message_id: null,
          offer_id: null, 
          job_id: job_id, 
        });
    }
    res.status(200).json({ message: "Post successfully :", post });
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error :", err: err.message });
  }
};
