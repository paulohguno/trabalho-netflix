import Genero from '../models/modelsGenero.js';

const get = async (req, res ) => {
    try{
        const dados = await Genero.findAll();
        return res.status(200).send({
            type: 'sucess',
            message: 'generos listados com sucesso',
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
        })
    }

    const retorno = await Genero.create(req.body);

    return res.status(201).send({
        type: 'sucess',
        message: 'registro criado com sucesso',
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

        const genero = await Genero.findByPk(idNumero);

        if (!genero) {
            return res.status(404).send({
                type: 'error',
                message: 'genero nao encontrado',
                data: []
            });
        }

        return res.status(200).send({
            type: 'sucess',
            message: 'genero encontrado',
            data: genero
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
        const id = req.params.id ? req.params.id.replace(/\D/g, '') : null;
        const dado = await Genero.findOne({
            where: { 
                id
            }
        });

        if (!dado) {
            return res.status(404).send({
                type: 'error',
                message: 'genero nao encontrado',
                data: []
            });
        }
        await dado.destroy();
        return res.status(200).send({
            type: 'sucess',
            message: 'genero deletado com sucesso',
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
        const id = req.params.id ? req.params.id.replace(/\D/g, '') : null;
        const requisicao = req.body;

        const dado = await Genero.findOne({
            where: { 
                id
            }
        });

        if (!dado) {
            return res.status(404).send({
                type: 'error',
                message: 'genero nao encontrado',
                data: []
            });
        }

        Object.keys(requisicao).forEach(campo => dado[campo] = requisicao[campo]);
        await dado.save();

        return res.status(200).send({
            type: 'sucess',
            message: 'genero atualizado com sucesso',
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