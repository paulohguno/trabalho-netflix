import Temporada from '../models/modelsTemporada.js';

const get = async (req, res ) => {
    try{
        const dados = await Temporada.findAll();
        return res.status(200).send({
            type: 'sucess',
            message: 'temporadas listadas com sucesso',
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

        const retorno = await Temporada.create(req.body);

        return res.status(201).send({
            type: 'sucess',
            message: 'temporada criada com sucesso',
            data: retorno
        });

    }catch (error) {
        return res.status(500).send({
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

        const temporada = await Temporada.findByPk(idNumero);

        if (!temporada) {
            return res.status(404).send({
                type: 'error',
                message: 'temporada nao encontrada',
                data: []
            });
        }

        return res.status(200).send({
            type: 'sucess',
            message: 'temporada encontrada',
            data: temporada
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

        const dado = await Temporada.findByPk(idNumero);

        if (!dado) {
            return res.status(404).send({
                type: 'error',
                message: 'temporada nao encontrada',
                data: []
            });
        }
        await dado.destroy();
        return res.status(200).send({
            type: 'sucess',
            message: 'temporada deletada com sucesso',
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

        const dado = await Temporada.findByPk(idNumero);

        if (!dado) {
            return res.status(404).send({
                type: 'error',
                message: 'temporada nao encontrada',
                data: []
            });
        }

        Object.keys(requisicao).forEach(campo => dado[campo] = requisicao[campo]);
        await dado.save();

        return res.status(200).send({
            type: 'sucess',
            message: 'temporada atualizada com sucesso',
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