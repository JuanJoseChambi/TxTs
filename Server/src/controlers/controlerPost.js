const { User, Publications } = require("../db");
const { handlerUpdatePost } = require("../handlers/handlerPost");

const createPost = async (req, res) => {
  const { id } = req.params;
  const { text, image } = req.body;
  try {
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      res.status(200).json({ message: "Error Usuario No encontrado" });
    }
    if (!text && !image) {
      res
        .status(200)
        .json({ message: "Error, texto o imagen tiene que ser existente" });
    }
    const post = {
      text: text,
      image: image,
    };
    let newPost = await Publications.create(post);
    await user.addPublications(newPost);
    res.status(200).json({ create: true, message: "Publicacion Creada" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const upDatePost = async (req, res) => {
  const { id } = req.params;
  const postUpDate = req.body;
  try {
    const upDatePost = handlerUpdatePost(id, postUpDate);
    if (upDatePost) {
      res.status(200).json({ message: "El Post Fue Actaulizado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const postdel = await Publications.findOne({ where: { id: id } });
    if (postdel) {
      postdel.destroy();
      res.status(200).json({ message: "Post Eliminado" });
    }
  } catch (error) {}
};

const getAllPost = async (req, res) => {
  const { searchPost } = req.query;
  try {
    if (searchPost) {
      const postWanted = await Publications.findAll({
        include: [
          {
            model: User,
            as: "User",
            attributes: ["nombre", "nombreUsuario", "image"],
          },
        ],
      });
      const post = postWanted.filter((post) =>
        post.text.toLowerCase().includes(searchPost.toString().toLowerCase())
      );
      if (post) {
        return res.status(200).json(post);
      } else {
        return res.status(200).json({ message: "No existe Esta Publicacion" });
      }
    } else {
      const allPost = await Publications.findAll({
        include: [
          {
            model: User,
            as: "User",
            attributes: ["nombre", "nombreUsuario", "image"],
          },
        ],
      });
      res.status(200).json(allPost);
    }
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

module.exports = {
  createPost,
  upDatePost,
  deletePost,
  getAllPost,
};
