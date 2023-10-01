const { verificarToken } = require("../auth/auth");

function routeProtector(req, res, next) {
  // Obtener el token del encabezado de la solicitud
    const token = req.headers['authorization'];

    // Verificar si el token no está presente
    if (!token) {
      return res.status(401).json({ mensaje: 'Usuario no autorizado' });
    }

    // Verificar la validez del token utilizando la funcion verificarToken
    const usuario = verificarToken(token);

    // Si el token es inválido o ha expirado, denegar el acceso
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }
    // Adjuntar la información del usuario verificado a la solicitud para su uso despues
    req.usuario = usuario;

    // Pasar la solicitud al siguiente middleware
    next();
  };

module.exports= {
    routeProtector
}