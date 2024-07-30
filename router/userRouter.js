const {Router}=require("express");
const { registerUser, logIn } = require("../controller/userController");

const router = Router();

router.post("/register", registerUser)
router.post("/login",logIn)






module.exports =router;