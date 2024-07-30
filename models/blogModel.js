const {Schema, model}= require("mongoose");

const blogSchema =new Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
},{timestamps:true}
);



module.exports =model("Blog", blogSchema);