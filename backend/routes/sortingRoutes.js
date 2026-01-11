const express=require('express');
const router=express.Router();
const {runSort}=require("../controllers/sortingController");

router.post("/run",runSort);
module.exports=router;