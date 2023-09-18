const { User } = require("../db")
const bcrypt = require("bcryptjs");
const { compararContraseña, generarToken } = require("../auth/auth");
const {routeProtector} = require("../middlewares/routeProtector");
const { upDateInfoUser } = require("../handlers/handlerUsers");

const accessUser = async (req, res) => {
    const {email, contraseña} = req.body;
    try {
      if(!contraseña && !email) return res.status(404).json({message:"Ingrese Email y Contraseña"});

      const emailMinus = email.toLowerCase()
      const user = await User.findOne({where:{email:emailMinus}})
      if (user) {
         if(compararContraseña(contraseña, user.contraseña)) {
           const token = generarToken(user)
          return res.status(200).json({token:token, infoUser:{nombre:user.nombre, apellido:user.apellido, email:user.email, nombreUsuario:user.nombreUsuario, bio:user.bio, image:user.image},access:true})
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

const createUser = async (req, res) => {
    try {
        const {nombre, apellido, nombreUsuario, email, contraseña} = req.body;
        if (nombre && apellido && nombreUsuario && email && contraseña) {
            const emailMinus = email.toLowerCase();
            const userExist = await User.findOne({where:{email: emailMinus}})
            const userName = await User.findOne({where:{nombreUsuario: nombreUsuario}})
            if (userExist) { return res.status(200).json({message:"Error: Email en uso"}) };
            if (userName) { return res.status(200).json({message:"Error: Nombre de Usuario en uso"}) };
            const contraseñaHashed = await bcrypt.hash(contraseña, 10);
            const userCreate = {
                nombre:nombre,
                apellido:apellido,
                nombreUsuario:nombreUsuario,
                email:emailMinus,
                contraseña: contraseñaHashed
            }
            await User.create(userCreate)
            return res.status(200).json({create:true, message: "Usuario Registrado"})
        }else{
            res.status(404).json({message:"Datos a Completar Faltantes"})
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const update = async (req, res)  => {
  const { id } = req.params;
  const infoUser = req.body;
  try {
    const UserUpDate = await upDateInfoUser(id, infoUser)
    res.status(200).json(UserUpDate)
  } catch (error) {
    res.status(500).json({message:"Error al Actualizar"})
  }
}

const allUser =  async (req, res) => {
    const allUsers = await User.findAll();
    res.status(200).json(allUsers)
}

module.exports = {
  accessUser,
  createUser,
  allUser:[routeProtector, allUser],
  update
}
