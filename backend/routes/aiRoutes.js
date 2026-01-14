const express=require("express");
const router=express.Router();

const {explainAlgorithm }=require("../controllers/aiController");
// router.get("/ping", (req, res) => {
//   res.json({ message: "AI routes working" });
// });

router.post("/explain",explainAlgorithm);
module.exports = router;

