import Autores from '../models/modelsAutores.js';


const get = async (req, res ) => {
    try{
        
        const dados = await Autores.findAll();
        return res.status(200).send({
            type: 'sucess',
            message: 'autores listados com sucesso',
            data : dados

        })
    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'erro de servidor',
            data: error.message,
        })
    }
}
const create = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({
            type: 'error',
            message: 'dados sao obrigatorios',
            data: []
        });
        }

    const retorno = await Autores.create(req.body);

    return res.status(201).send({
        type: 'sucess',
        message: 'autor criado com sucesso',
        data: retorno
    });

    }catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'erro de servidor',
            data: error.message,
        })
    }
}

const getcomid = async (req, res) => {
    try {
        const { id } = req.params;
        const idNumero = Number(id);

        if (!Number.isInteger(idNumero) || idNumero <= 0) {
            return res.status(400).send({
                type: 'error',
                message: 'id invalido',
                data: []
            });
        }

        const autor = await Autores.findByPk(idNumero);

        if (!autor) {
            return res.status(404).send({
                type: 'error',
                message: 'autor nao encontrado',
                data: []
            });
        }

        return res.status(200).send({
            type: 'sucess',
            message: 'autor encontrado',
            data: autor
        });
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'erro de servidor',
            data: error.message,
        });
    }
}

const destroy = async (req, res) => {
    try{
        const idNumero = Number(req.params.id);

        if (!Number.isInteger(idNumero) || idNumero <= 0) {
            return res.status(400).send({
                type: 'error',
                message: 'id invalido',
                data: []
            });
        }

        const dado = await Autores.findByPk(idNumero);

        if (!dado) {
            return res.status(404).send({
                type: 'error',
                message: 'autor nao encontrado',
                data: []
            });
        }
        await dado.destroy();
        return res.status(200).send({
            type: 'sucess',
            message: 'autor deletado com sucesso',
            data: []
        });


    }catch (error){
        return res.status(500).send({
            type: 'error',
            message: 'erro de servidor',
            data: error.message,
        })
    }
}


const update = async (req, res) => {
    try{
        const idNumero = Number(req.params.id);
        const requisicao = req.body;

        if (!Number.isInteger(idNumero) || idNumero <= 0) {
            return res.status(400).send({
                type: 'error',
                message: 'id invalido',
                data: []
            });
        }

        const dado = await Autores.findByPk(idNumero);

        if (!dado) {
            return res.status(404).send({
                type: 'error',
                message: 'autor nao encontrado',
                data: []
            });
        }

        Object.keys(requisicao).forEach(campo => dado[campo] = requisicao[campo]);
        await dado.save();

        return res.status(200).send({
            type: 'sucess',
            message: 'autor atualizado com sucesso',
            data: dado
        });
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'erro de servidor',
            data: error.message,
        })
    }
}

export default {
    get,
    create,
    getcomid,
    destroy,
    update
}