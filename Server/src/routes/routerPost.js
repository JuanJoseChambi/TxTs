const {Router} = require("express")
const {createPost, getAllPost, upDatePost, deletePost } = require("../controlers/controlerPost")

const routerPost = Router();

routerPost.post("/create/:id", createPost);
routerPost.put("/update", upDatePost);
routerPost.delete("/delete/:id", deletePost)
routerPost.get("/all", getAllPost);

module.exports = routerPost;