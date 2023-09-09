const {Router} = require("express")
const { User } = require("../db")
const router = Router();
const bcrypt = require("bcryptjs")
const { SECRET_KEY } = process.env

router.post("/signin", async (req, res) => {
    const {email, contraseña} = req.body;
    try {
        if(!email) return res.status(404).json({message:"Email Faltante"});
        if(!contraseña) return res.status(404).json({message:"Contraseña Faltante"});

        const emailMinus = email.toLowerCase()
        const user = await User.findOne({where:{email:emailMinus}})
        if (user) {
           const value = await bcrypt.compare(contraseña, user.contraseña)
           const result = value ? {message:"Aprobado"}: {message:"No Aprobado"}
        //    return res.status(200).json(user)
           return res.status(200).json(result)
        }else{
           return res.status(404).json("Usuario No encontrado")
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }
;})

router.post("/checkin", async (req, res) => {
    try {
        const {nombre, apellido, nombreUsuario, email, contraseña} = req.body;
        if (nombre && apellido && nombreUsuario && email && contraseña) {
            const emailMinus = email.toLowerCase();
            const userExist = await User.findOne({where:{email: emailMinus}})
            const userName = await User.findOne({where:{nombreUsuario: nombreUsuario}})
            if (userExist || userName) throw new Error("El Usuario Existe");
            const contraseñaHashed = await bcrypt.hash(contraseña, 10);
            const userCreate = {
                nombre:nombre,
                apellido:apellido,
                nombreUsuario:nombreUsuario,
                email:emailMinus,
                contraseña: contraseñaHashed
            }
            const userCreated = await User.create(userCreate)
            // res.status(200).json(userCreated)
            res.status(200).json({message: "Usuario creado"})
        }else{
            res.status(404).json({message:"Flata de Credenciales"})
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})
router.get("/", async (req, res) => {
    const allUsers = await User.findAll();
    res.status(200).json(allUsers)
})

module.exports = router