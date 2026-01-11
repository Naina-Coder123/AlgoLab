const express=require('express');
const cors=require('cors');
const sortingRoutes=require("./routes/sortingRoutes");

const app=express();

app.use(cors());//cross origin Resource sharing is a security feature implemented in web browsers that allows ot restricts resources requested from a different domain 
//it prevents malicious website read the sensitive data from the website where the user is authenticated


app.use(express.json());
app.use("/api/sort",sortingRoutes);
module.exports=app;