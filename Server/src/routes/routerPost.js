const {Router} = require("express")
const {createPost, getAllPost } = require("../controlers/controlerPost")

const routerPost = Router();

routerPost.post("/:id", createPost);
routerPost.get("/all", getAllPost);

module.exports = routerPost;