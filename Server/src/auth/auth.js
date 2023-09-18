const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { SECRET_KEY } = process.env

   function generarToken(usuario) {
     return jwt.sign({ usuario }, SECRET_KEY, { expiresIn: '1d' });
   }

   function verificarToken(token) {
     try {
       const decoded = jwt.verify(token, SECRET_KEY);
       return decoded.usuario;
     } catch (error) {
       return null;
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