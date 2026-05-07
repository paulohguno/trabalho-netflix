import jwt from 'jsonwebtoken';
import Usuario from '../models/UsuarioModel.js';

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

    if (!token) {
      return res.status(403).send({
        type: 'error',
        message: 'Usuario não autenticado!',
        data: []
      });
    }

    const usuario = jwt.verify(token, process.env.SECRET_KEY);

    const usuarioExiste = await Usuario.findOne({
      where: {
        id: usuario.idUsuario
      }
    });

    if (!usuarioExiste) {
      return res.status(403).send({
        type: 'error',
        message: 'Usuario não autenticado!',
        data: []
      });
    }
    next();
  } catch (error) {
    res.status(403).send({
      type: 'error',
      message: 'Usuario não autenticado!',
      data: error.message,
    });
  }
}

export default verifyToken