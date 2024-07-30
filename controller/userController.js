const USER_SCHEMA= require("../models/userModel")
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils/generateToken");


exports.registerUser= asyncHandler(async(req,res)=>{
    let{email}=req.body;
    let findUser= await USER_SCHEMA.findOne({email});
    if(findUser){
        throw new Error("User already exists......")       
    }
    let newUser =await USER_SCHEMA.create(req.body);
    res.status(201).json({success:true, message: "User account created....", newUser});
});






exports.logIn =asyncHandler(async(req,res)=>{
    let {email, password} = req.body;
    let findUser =await USER_SCHEMA.findOne({email})
    if(!findUser){
        throw new Error("No such user present........")
    }
    isMatch =await findUser.matchPassword(password);
    if(!isMatch){
        throw new Error("Wrong Password")
    }
    let token=generateToken(findUser._id)
    res.status(200).json({success:true, message: "Logged-In Successfully",token})
})

