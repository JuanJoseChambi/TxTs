const { User, Publications } = require("../db")

const createPost = async (req, res) => {
    const {id} = req.params;
    const {text, image} = req.body;
    try {
    const user = await User.findOne({where:{id:id}})
        if (!user) {res.status(200).json({message:"Error Usuario No encontrado"})}
        if (!text && !image) {res.status(200).json({message:"Error, texto o imagen tiene que ser existente"})}
        const post = {
            text:text,
            image:image
        }
        let newPost = await Publications.create(post);
        await user.addPublications(newPost)
       res.status(200).json(newPost)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const getAllPost = async (req, res) => {

}

module.exports = {
    createPost, 
    getAllPost
}