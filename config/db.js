const mongoose =require("mongoose")
const asyncHandler =require("express-async-handler");
const { MONGO } = require(".");


const connectDB =asyncHandler(async(req,res)=>{
    await mongoose.connect(MONGO);
    console.log("Database Connected....")

})
module.exports={connectDB}