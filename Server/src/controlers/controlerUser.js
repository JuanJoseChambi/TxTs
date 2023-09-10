const {Router} = require("express")
const { User } = require("../db")
const router = Router();
const bcrypt = require("bcryptjs");
const { compararContraseña, generarToken } = require("../auth/auth");
const { SECRET_KEY } = process.env

router.post("/login", async (req, res) => {
    const {email, contraseña} = req.body;
    try {
        if(!email) return res.status(404).json({message:"Email Faltante"});
        if(!contraseña) return res.status(404).json({message:"Contraseña Faltante"});

        const emailMinus = email.toLowerCase()
        const user = await User.findOne({where:{email:emailMinus}})
        if (user) {
           if(compararContraseña(contraseña, user.contraseña)) {
             const token = generarToken(user)
             return res.status(200).json(token)
           }else{
            res.status(404).json({message:"Contraseña Incorrecta"})
           }
        }else{
           return res.status(404).json("Usuario No encontrado")
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }
;})

router.post("/createCount", async (req, res) => {
    try {
        const {nombre, apellido, nombreUsuario, email, contraseña} = req.body;
        if (nombre && apellido && nombreUsuario && email && contraseña) {
            const emailMinus = email.toLowerCase();
            const userExist = await User.findOne({where:{email: emailMinus}})
            const userName = await User.findOne({where:{nombreUsuario: nombreUsuario}})
            if (userExist) throw new Error("El email en uso");
            if (userName) throw new Error("El nombre de usuario ya existe");
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


/*Para crear middlewares que generen tokens JWT (JSON Web Tokens) para autenticar a los usuarios y luego devolver esos tokens como parte de la respuesta de inicio de sesión, debes seguir una serie de pasos. A continuación, te mostraré cómo hacerlo en una aplicación Node.js con Express y la biblioteca `jsonwebtoken`:

1. **Instala las dependencias necesarias**:

   Asegúrate de tener las siguientes dependencias instaladas en tu proyecto:

   - `express`: Para crear una aplicación web con Express.
   - `jsonwebtoken`: Para generar tokens JWT.
   - `body-parser`: Para analizar datos JSON en las solicitudes POST.
   - `bcryptjs` (opcional): Para realizar el hash de contraseñas antes de almacenarlas.

   Puedes instalar estas dependencias utilizando npm o yarn:

   ```bash
   npm install express jsonwebtoken body-parser bcryptjs
   ```

2. **Configura la autenticación y la generación de tokens**:

   Crea un módulo para manejar la autenticación y la generación de tokens JWT. Aquí tienes un ejemplo de cómo podría verse:

   ```javascript
   const jwt = require('jsonwebtoken');
   const bcrypt = require('bcryptjs');
   const { SECRET_KEY } = require('./config'); // Configura una clave secreta para JWT

   function generarToken(usuario) {
     return jwt.sign({ usuario }, SECRET_KEY, { expiresIn: '1h' });
   }

   function verificarToken(token) {
     try {
       const decoded = jwt.verify(token, SECRET_KEY);
       return decoded.usuario;
     } catch (error) {
       return null; // El token es inválido o ha expirado
     }
   }

   function compararContraseña(contraseñaEntrante, contraseñaAlmacenada) {
     return bcrypt.compareSync(contraseñaEntrante, contraseñaAlmacenada);
   }

   module.exports = {
     generarToken,
     verificarToken,
     compararContraseña,
   };
   ```

   En este ejemplo, estamos utilizando `bcryptjs` para comparar contraseñas y `jsonwebtoken` para generar y verificar tokens JWT.

3. **Crea un middleware para el inicio de sesión**:

   Ahora, crea un middleware que maneje el proceso de inicio de sesión y devuelva un token JWT si las credenciales son correctas:

   ```javascript
   const express = require('express');
   const bodyParser = require('body-parser');
   const { generarToken, compararContraseña } = require('./auth'); // Importa las funciones de autenticación

   const app = express();
   app.use(bodyParser.json());

   app.post('/login', (req, res) => {
     const { usuario, contraseña } = req.body; // Supon que el cliente envía el nombre de usuario y contraseña en el cuerpo de la solicitud

     // Aquí debes verificar las credenciales del usuario en tu base de datos o donde estén almacenadas
     if (compararContraseña(contraseña, usuario.contraseñaAlmacenada)) {
       const token = generarToken(usuario);
       res.json({ token }); // Devuelve el token en la respuesta
     } else {
       res.status(401).json({ mensaje: 'Credenciales incorrectas' });
     }
   });

   app.listen(3000, () => {
     console.log('Servidor escuchando en el puerto 3000');
   });
   ```

4. **Protege rutas con el token JWT**:

   Puedes proteger rutas que requieran autenticación mediante el uso de un middleware que verifique el token JWT en las solicitudes entrantes. Aquí hay un ejemplo básico:

   ```javascript
   const express = require('express');
   const { verificarToken } = require('./auth'); // Importa la función de verificación del token

   const app = express();

   // Middleware para verificar el token en rutas protegidas
   function protegerRuta(req, res, next) {
     const token = req.headers['authorization'];

     if (!token) {
       return res.status(401).json({ mensaje: 'Token no proporcionado' });
     }

     const usuario = verificarToken(token);

     if (!usuario) {
       return res.status(401).json({ mensaje: 'Token inválido o expirado' });
     }

     // Puedes guardar el usuario en el objeto de solicitud para que esté disponible en las rutas protegidas
     req.usuario = usuario;
     next();
   }

   // Ruta protegida que requiere un token válido
   app.get('/rutaProtegida', protegerRuta, (req, res) => {
     res.json({ mensaje: 'Ruta protegida exitosamente', usuario: req.usuario });
   });

   app.listen(3000, () => {
     console.log('Servidor escuchando en el puerto 3000');
   });
   ```

   El middleware `protegerRuta` verifica el token JWT en la cabecera de autorización de la solicitud y permite el acceso si el token es válido.

Este es un ejemplo básico de cómo crear middlewares para autenticación JWT en Node.js. Ten en cuenta que, en un entorno de producción, deberías almacenar de manera segura la clave secreta y las contraseñas, así como implementar un sistema de gestión de usuarios y sesiones más robusto.*/