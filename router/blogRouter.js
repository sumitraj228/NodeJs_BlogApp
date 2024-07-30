const {Router}=require("express");
const { addBlog, fetchAll, fetchOne, updateBlog, deleteBlog } = require("../controller/blogController");
const { authorize } = require("../middlerware/auth");



const router = Router();

router.post("/add", authorize, addBlog); //todo injecting the middleweware
router.get("/all", fetchAll);
router.get("/one/:id", fetchOne)
router.patch("/update/:id",authorize, updateBlog)
router.delete("delete/:id",authorize, deleteBlog)


module.exports =router;
