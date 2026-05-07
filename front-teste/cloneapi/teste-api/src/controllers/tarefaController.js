import Tarefa from "../models/TarefaModel.js";
import fileUpload from "../utils/fileUpload.js";

const get = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.replace(/\D/g, ''): null;
    let dados = [];

    if (!id) {
      
      dados = await Tarefa.findAll();
      console.log(dados);
    } else {
      dados = await Tarefa.findOne({
        where: {
          id
        }
      });
      dados.arquivo = `${process.env.API_HOST}${dados.arquivo}`
    }
    
    return res.status(200).send({
      type: 'success',
      message: 'toma',
      data: dados
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      type: 'error',
      message: 'Ops! ocorreu um erro',
      data: error.message,
    });
  }
}


const create = async (req, res) => {
  try {
    const {
      descricao,
      finalizado,
    } = req.body;

    if (!descricao) {
      return res.status(400).send({
        type: 'error',      
        message: 'Não foi possivel identificar a descrição!',
        data: []
      });
    }

    const retorno = await Tarefa.create({
      descricao,
      finalizado
    });

    if (req.files && req.files.uploadFile) {
      let upload = await fileUpload(req.files.uploadFile, {
        id: retorno.id,
        tipo: req.query.tipo || 'imagem',
        tabela: 'tarefa'
      });

      retorno.arquivo = upload.path;
      await retorno.save();
    }

    

    return res.status(201).send({
      type: 'success',
      message: 'criado o meliante',
      data: retorno
    });

  } catch (error) {
    res.status(500).send({
      type: 'error',
      message: 'Ops! ocorreu um erro',
      data: error.message,
    });
  }
}

const destroy = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.replace(/\D/g, ''): null;
    const dado = await Tarefa.findOne({
        where: {
          id
        }
      });

    if (!dado) {
      return res.status(404).send({
        type: 'error',
        message: 'não foi encontrado um registro com codigo ' + id,
        data: [],
      });
    }

    await dado.destroy();

    return res.status(200).send({
      type: 'success',
      message: 'foi excluido com sucesso',
      data: []
    });

  } catch (error) {
    res.status(500).send({
      type: 'error',
      message: 'Ops! ocorreu um erro',
      data: error.message,
    });
  }
}

const update = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.replace(/\D/g, ''): null;
    const requisicao = req.body;

    const dado = await Tarefa.findOne({
        where: {
          id
        }
      });

    if (!dado) {
      return res.status(404).send({
        type: 'error',
        message: 'não foi encontrado um registro com codigo ' + id,
        data: [],
      });
    }

    Object.keys(requisicao).forEach(campo => dado[campo] = requisicao[campo]);
    await dado.save();

    return res.status(200).send({
      type: 'success',
      message: 'foi atualizado com sucesso',
      data: dado
    });


  } catch (error) {
    res.status(500).send({
      type: 'error',
      message: 'Ops! ocorreu um erro',
      data: error.message,
    });
  }
}


export default {
  update,
  get,
  destroy,
  create,
}