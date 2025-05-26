const db = require("../models");
const Contract = db.Contract;
const Offer = db.Offer;
const Post_job = db.Post_job;
const Payment = db.Payment;
exports.contract = async (req, res) => {
  try {
    const { status } = req.body;
    const user_id = req.user.id;
    console.log(user_id);
    const offers = await Offer.findOne({ where: { user_id } });
    console.log(offers);
    if (!offers) {
      return res.status(404).json({ message: "No offer found for this user." });
    }

    const pj_id = offers.job_id;
    const pj = await Post_job.findOne({ where: { id: pj_id } });
    console.log(pj)
    if (!pj) {
      return res.status(404).json({ message: "No job found for this offer." });
    }

    const newContract = await Contract.create({
      status,
      title: pj.title,
      amount: offers.bids,
      offer_id: offers.id,
      job_id: pj.id,
      employer_id: pj.user_id,
      freelancer_id: offers.user_id,
    });

    res.status(201).json({message: "Contract created successfully",contract: newContract,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};
exports.getcontracts =async (req, res) => {
  try {
    const allcontract = await Contract.findAll();
    if (!allcontract){
      res.status(404).send("No contract found");
    }
    else{
      res.status(200).json({message: "All Contracts",contracts: allcontract,});
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};
exports.halfmilestone = async (req, res) => {
  try {
    const milestatus = await Contract.findOne({ where: {employer_id } });

    if (!milestatus) {
      return res.status(404).json({ message: "Contract not found" });
    }
    
    await Payment.create({
      employer_id: milestatus.employer_id,
      freelancer_id: milestatus.freelancer_id,
      status: "half",
    });
    milestatus.status = "half";
    await milestatus.save();
    res.status(200).json({ message: "Milestone status updated to half", contract: milestatus });

  } catch (err) {
    res.status(500).json({ message: "Error updating milestone", error: err.message });
  }
}
exports.fullmilestone = async (req, res) => {
  try {

    const milestatus = await Contract.findOne({ where: { employer_id } });

    if (!milestatus) {
      return res.status(404).json({ message: "Contract not found" });
    }
    await Payment.create({
      employer_id: milestatus.employer_id,
      freelancer_id: milestatus.freelancer_id,
      status: "full",
    });
    milestatus.status = "full";
    await milestatus.save();
    res.status(200).json({ message: "Milestone status updated to full", contract: milestatus });

  } catch (err) {
    res.status(500).json({ message: "Error updating milestone", error: err.message });
  }
}