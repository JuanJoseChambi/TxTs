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
       res.status(200).json({create:true, message:"Publicacion Creada"})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const upDatePost = async (req,res) => {
    const {id} = req.params;
    const post = req.body;


}

const deletePost = async (req, res) => {
    const {id} = req.params;
    try {
        const postdel = await Publications.findOne({where:{id:id}})
        if (postdel) {
            postdel.destroy();
            res.status(200).json({message:"Post Eliminado"})
        }
    } catch (error) {
        
    }
}

const getAllPost = async (req, res) => {

}

module.exports = {
    createPost, 
    upDatePost,
    deletePost,
    getAllPost
}