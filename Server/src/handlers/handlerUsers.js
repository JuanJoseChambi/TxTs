const {User} = require("../db")
const bcrypt = require("bcryptjs");


const upDateInfoUser = async (id, infoUser) => {
    // Buscar un usuario por su identificador (ID)
    const user = await User.findByPk(id)
    try {
        // Verificar si el usuario no existe y responder con un mensaje de error si es así
        if (!user) {
            res.status(200).json({message:"El Usuario No existe"})
        }

        // Actualizar la información del usuario con los valores proporcionados en infoUser (si existen)
        infoUser.nombre ? user.nombre = infoUser.nombre : user.nombre;
        infoUser.apellido ? user.apellido = infoUser.apellido : user.apellido;
        infoUser.nombreUsuario ? user.nombreUsuario = infoUser.nombreUsuario : user.nombreUsuario;
        infoUser.email ? user.email = infoUser.email.toLowerCase() : user.email;
        infoUser.bio ? user.bio = infoUser.bio : user.bio;
        infoUser.image ? user.image = infoUser.image : user.image;

        // Verificar si se paso una nueva contraseña
        if (infoUser.contraseña) {
         const newPassword = infoUser.contraseña;
         // Hashear y actualizar la contraseña
         user.contraseña = await bcrypt.hash(newPassword, 10);
        }

        // Guardar los cambios en la base de datos
        await user.save();

        // Devolver el usuario actualizado
        return user
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
}
const validateUser = async (email, nombreUsuario) => {
    try {
         // Buscar un usuario con el correo electrónico y nombre de usaurio proporcionado
        const emailExist = await User.findOne({where:{email:email}});
        const nombreUsuarioExist = await User.findOne({where:{nombreUsuario:nombreUsuario}});

        // Verificar si el correo electrónico y el nombre de usuario ya existen
        if (emailExist && nombreUsuarioExist) {
            return "Email Y Nombre de Usuario en uso"
        }else if (emailExist) {
            return "Email en Uso"
        }else if(nombreUsuarioExist){
            return "Nombre de Usuario en uso"
        }else{
            // Si no hay coincidencias, los datos son válidos
            return true
        }
    } catch (error) {
        // Manejar errores y responder con un mensaje de error
        res.status(400).json({error:error.message})
    }
} 

module.exports = {
    upDateInfoUser,
    validateUser
}