const { Publications } = require("../db");

const handlerUpdatePost = async (id, upDatePost) => {
    const post  = await Publications.findByPk(id);
    if (!post) return res.status(200).json({message:"El Post No Existe"});

    upDatePost.text ? post.text = upDatePost.text : post.text;
    upDatePost.image ? post.image = upDatePost.image : post.image;
    upDatePost.image === null ? post.image = upDatePost.image : post.image;

    await post.save();
    return post;
}

module.exports = {handlerUpdatePost};