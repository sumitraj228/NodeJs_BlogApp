const BLOG_SCHEMA =require("../models/blogModel")
const asyncHandler =require("express-async-handler")

exports.addBlog=asyncHandler(async(req,res)=>{
    let payload =req.body;
    let newBlog =await BLOG_SCHEMA.create(payload);
    res.status(201).json({success:true, message: "blog created", newBlog});
});


exports.fetchAll= asyncHandler(async(req, res)=>{
    let blogs =await BLOG_SCHEMA.find().populate("user");
    if(blogs.length==0){
        throw new Error("no blog found");

    }
    res.status(201).json({success:true, message: "all blog fetched", blogs}); 
});



exports.fetchOne =asyncHandler(async(req,res)=>{
    // let {id} =req.params
    let findBlog =await BLOG_SCHEMA.findById(req.params.id)
    if(!findBlog){
        throw new Error("no blog found.....")
    }
    res.status(201).json({success:true, message: "blog fetched", findBlog}); 
});




exports.updateBlog =asyncHandler(async(req,res)=>{

    let findBlog =await BLOG_SCHEMA.findById(req.params.id)
    if(!findBlog){
        throw new Error("no blog found.....")
    }

    let updatedBlog =await BLOG_SCHEMA.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
    });
    
    res.status(201).json({success:true, message: "blog updated", updatedBlog}); 
});






exports.deleteBlog =asyncHandler(async(req,res)=>{

    let findBlog =await BLOG_SCHEMA.findById(req.params.id)
    if(!findBlog){
        throw new Error("no blog found.....")
    }

    let deletedBlog =await BLOG_SCHEMA.findByIdAndDelete(req.params.id);
    
    res.status(200).json({success:true, message: "blog deleted"}); 

});
