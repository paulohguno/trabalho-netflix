import jwt from 'jsonwebtoken';
import Usuario from '../models/modelsUsuarios.js';
import Autentic from '../models/modelsAutentic.js';



const admVerify = async (req, res, next) => {
    try {
        const token = req.headers.authorization 
            ? req.headers.authorization.split(' ')[1] 
            : null;

        if (!token) {
            return res.status(403).send({
                type: 'error',
                message: 'sem autorizacao',
                data: []
            });
        }

        const adm = jwt.verify(token, process.env.SECRET_KEY);

        const usuario = await Autentic.findOne({
            where: {
                id: adm.idUsuario  
            }
        });

        if (!usuario) {
            return res.status(403).send({
                type: 'error',
                message: 'Usuario não autenticado!',
                data: []
            });
        }

        if (usuario.nivelAcesso !== 2) {
            return res.status(403).send({
                type: 'error',
                message: 'Usuario não autorizado!',
                data: []
            });
        }

        next();

    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! ocorreu um erro',
            data: error.message,
        });
    }
};

export default admVerify;