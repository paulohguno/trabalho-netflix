import Usuario from "../models/UsuarioModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const register = async (req, res) => {
  try {
    const {
      email,
      nome,
      password
    } = req.body;

    if (!email || !nome || !password) {
      throw new Error('dados faltando');
    }

    const usuarioExistente = await Usuario.findOne({
      where: {
        email
      }
    });

    if (usuarioExistente) {
      return res.status(400).send({
        type: 'error',
        message: 'ja existe!'
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      email,
      nome,
      passwordHash
    });

    return res.status(200).send({
      type: 'success',
      message: 'deu boa',
      data: usuario,
    });

  } catch (error) {
    res.status(500).send({
      type: 'error',
      message: 'Ops! ocorreu um erro',
      data: error.message,
    });
  }
}

const login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body

    if (!email || !password) {
      throw new Error('dados faltando');
    }

    const usuarioExistente = await Usuario.findOne({
      where: {
        email
      }
    });

    if (!usuarioExistente || !(await bcrypt.compare(password, usuarioExistente.passwordHash))) {
      return res.status(400).send({
        type: 'error',
        message: 'email ou senha incorretos'
      });
    }

    const token = jwt.sign(
      {
        idUsuario: usuarioExistente.id,
        nomeUsuario: usuarioExistente.nome,
        emailUsuario: usuarioExistente.email
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '8h'
      }
    )

    return res.status(200).send({
      type: 'success',
      message: 'deu boa',
      data: token
    });

    
  } catch (error) {
    res.status(500).send({
      type: 'error',
      message: 'Ops! ocorreu um erro',
      data: error.message,
    });
  }
}

const getUserByToken = (req, res) => {
  try {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

    if (!token) {
      return res.status(400).send({
        message: 'cade o token'
      });
    }

    const resposta = jwt.verify(token, process.env.SECRET_KEY)

    return res.json({
      data: resposta
    })

  } catch (error) {
    res.status(500).send({
      type: 'error',
      message: 'Ops! ocorreu um erro',
      data: error.message,
    });
  }
}


export default {
  register,
  login,
  getUserByToken
}