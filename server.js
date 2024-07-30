const express = require("express")
const {PORT} =require("./config");
const {connectDB} =require("./config/db");
const { error } = require("./middlerware/error");
const userRoute =require("./router/userRouter")
const blogRoute =require("./router/blogRouter");
const { authenticate } = require("./middlerware/auth");

const app =express();
connectDB();


app.use(express.json());
app.use("/users", userRoute)
app.use("/blogs",authenticate,blogRoute)




app.use(error)
app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Express server listening on port ${PORT}`);
})