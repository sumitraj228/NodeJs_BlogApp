const jwt =require("jsonwebtoken");
const USER_SCHEMA =require("../models/userModel")
const { JWT_SECRET } = require("../config");
const asyncHandler =require("express-async-handler")

exports.authenticate=asyncHandler(async(req,res,next)=>{
    if(req?.headers?.authorization?.startsWith("Bearer")){
        let token =req.headers.authorization.split(" ")[1];
        let decodeToken = jwt.verify(token, JWT_SECRET);
        let user =await USER_SCHEMA.findOne({_id:decodeToken.id});
        if(!user){
            throw new Error ("something went wrong please try again")
        }
        console.log(user);
        req.myUser=user;
        next();
    }
    else{
        res.status(400).json({message:"no token found"});
    }

});


exports.authorize =asyncHandler(async(req,res,next)=>{
    console.log(req.myUser);
    if(req.myUser.role==="admin"){
        next();
    }
    else{
        res.status(400).json({message:"not authorized to access"})
    }
});