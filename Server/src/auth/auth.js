const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { SECRET_KEY } = process.env

  // Firmar un token JWT con la información del usuario y una clave secreta
   function generarToken(usuario) {
     return jwt.sign({ usuario }, SECRET_KEY, { expiresIn: '1d' });
   }

   function verificarToken(token) {
     try {
      // Verificar el token JWT utilizando la clave secreta y decodificarlo.
       const decoded = jwt.verify(token, SECRET_KEY);
      // Retornar la información del usuario contenida en el token.
       return decoded.usuario;
     } catch (error) {
      // Si hay un error al verificar el token, retornar null.
       return null;
     }
   }
   // Comparar la contraseña ingresada con la contraseña almacenada previamente hasheada.
   function compararContraseña(contraseñaEntrante, contraseñaAlmacenada) {
     return bcrypt.compareSync(contraseñaEntrante, contraseñaAlmacenada);
   }

   module.exports = {
     generarToken,
     verificarToken,
     compararContraseña,
   };