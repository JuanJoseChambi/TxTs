const {User} = require("../db")
const bcrypt = require("bcryptjs");


const upDateInfoUser = async (id, infoUser) => {
    const user = await User.findByPk(id)

    if (!user) {
        res.status(200).json({message:"El Usuario No existe"})
    }
    infoUser.nombre ? user.nombre = infoUser.nombre : user.nombre;
    infoUser.apellido ? user.apellido = infoUser.apellido : user.nombre;
    infoUser.nombreUsuario ? user.nombreUsuario = infoUser.nombreUsuario : user.nombreUsuario;
    infoUser.email ? user.email = infoUser.email : user.email;
    infoUser.bio ? user.bio = infoUser.bio : user.bio;
    infoUser.image ? user.image = infoUser.image : user.image;
    if (infoUser.contraseña) {
     const newPassword = infoUser.contraseña;
     user.contraseña = await bcrypt.hash(newPassword, 10);
    }
    await user.save();
    return user
}

module.exports = {
    upDateInfoUser
}