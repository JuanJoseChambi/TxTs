const { verificarToken } = require("../auth/auth");

function routeProtector(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({ mensaje: 'Usuario no autorizado' });
    }

    const usuario = verificarToken(token);

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }

    // Puedes guardar el usuario en el objeto de solicitud para que esté disponible en las rutas protegidas
    req.usuario = usuario;
    next();
  };

module.exports= {
    routeProtector
}