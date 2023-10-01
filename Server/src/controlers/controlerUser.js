const { User, Publications } = require("../db")
const bcrypt = require("bcryptjs");
const { compararContraseña, generarToken } = require("../auth/auth");
const {routeProtector} = require("../middlewares/routeProtector");
const { upDateInfoUser, validateUser } = require("../handlers/handlerUsers");

// Controlador para acceder a la cuenta de un usuario
const accessUser = async (req, res) => {
    const {email, contraseña} = req.body;
    try {
      if(!contraseña && !email) return res.status(404).json({message:"Ingrese Email y Contraseña"});

      const emailMinus = email.toLowerCase()
      const user = await User.findOne({where:{email:emailMinus}})
      if (user) {
         if(compararContraseña(contraseña, user.contraseña)) {
           const token = generarToken(user)
          return res.status(200).json({token:token, infoUser:{id:user.id ,image:user.image},access:true})
         }else{
          return res.status(201).json({message:"Contraseña Incorrecta"})
         }
      }else{
         return res.status(201).json({message:"Email Incorrecto"})
      }
    } catch (error) {
      console.error("Error en el controlador accessUser:", error);
      res.status(500).json({ error: error.message });
    }
;}

// Controlador para crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        const {nombre, apellido, nombreUsuario, email, contraseña} = req.body;
        if (nombre && apellido && nombreUsuario && email && contraseña) {
            const emailMinus = email.toLowerCase();
            const validate = await validateUser(emailMinus, nombreUsuario)
            if (validate === true) {
              const contraseñaHashed = await bcrypt.hash(contraseña, 10);
              const userCreate = {
                nombre:nombre,
                apellido:apellido,
                nombreUsuario:nombreUsuario,
                email:emailMinus,
                contraseña: contraseñaHashed
            }
            await User.create(userCreate)
            res.status(200).json({create:true, message: "Usuario Registrado"})
            }else{
              res.status(404).json({message:validate})
            }
        }else{
            res.status(404).json({message:"Datos a Completar Faltantes"})
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

// Controlador para actualizar información de usuario
const update = async (req, res)  => {
  const { id } = req.params;
  const infoUser = req.body;
  try {
    const validate = await validateUser(infoUser.email, infoUser.nombreUsuario)
    if (validate === true) {
      const UserUpDate = await upDateInfoUser(id, infoUser)
      res.status(200).json({update:true, userUpDate: UserUpDate})
    }else{
      res.status(200).json({message:validate})
    }
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}

// Controlador para obtener información de un usuario o todos los usuarios
const allUser =  async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const user = await User.findOne({where:{id:id},   
        include : [
        {
          model:Publications,
          as:"Publications",
          attributes:["id", "text", "image", "createdAt", "updatedAt"]
        }
      ]})
      
      const userWithoutPassword = { ...user.get() };
      delete userWithoutPassword.contraseña;

      return res.status(200).json(userWithoutPassword);
    }else{
      const allUsers = await User.findAll({
        include : [
          {
            model:Publications,
            as:"Publications",
            attributes:["id", "text", "image", "createdAt", "updatedAt"]
          }
        ]
      });
      res.status(200).json(allUsers)
    }
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}



module.exports = {
  allUser:[routeProtector, allUser], // Protege la ruta con un middleware
  accessUser,
  createUser,
  update,
}
