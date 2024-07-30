const {Schema, model} =require("mongoose")
const bcrypt =require("bcrypt");


const userSchema =new Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
},
{timestamps:true}
);


//todo pre() ===> it is called as pre hook, whenever we save something in database this pre method will be called first and after that it will store the updated value in database
userSchema.pre("save",async function(){
    let salt = await bcrypt.genSalt(5);  //todo genSalt() will generate a random string 
    this.password =await bcrypt.hash(this.password,salt);  //todo hash() will take the value of password with salt and will hash it.

})



userSchema.methods.matchPassword = async function(enteredPassword){
return await bcrypt.compare(enteredPassword,this.password);

}

module.exports =model("User", userSchema);