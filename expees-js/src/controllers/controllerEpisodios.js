import Episodios from '../models/modelsEpisodios.js';
import chaveApi from '../service/servicoDeAPI.js';


const getapi = async (req, res) => {
    try {
        const dados = await chaveApi('/episodios');
        return res.status(200).send({
            message: 'dados da api externa listados com sucesso',
            type: 'sucess',
            data : dados
        });
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'erro de servidor',
            data: error.message,
        });
    }
};


const get = async (req, res ) => {
    try{
        const { id_temporada } = req.query;
        const where = {};

        if (id_temporada !== undefined) {
            const idTemporadaNumero = Number(id_temporada);

            if (!Number.isInteger(idTemporadaNumero) || idTemporadaNumero <= 0) {
                return res.status(400).send({
                    type: 'error',
                    message: 'id_temporada invalido',
                    data: []
                });
            }

            where.id_temporada = idTemporadaNumero;
        }

        const dados = await Episodios.findAll({ where });
        return res.status(200).send({
            message: 'episodios listados com sucesso',
            type: 'sucess',
            data : dados
        });
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'erro de servidor',
            data: error.message,
        });
    }
};
const create = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({
                type: 'error',
                message: 'dados sao obrigatorios',
                data: []
            });
        }

        const retorno = await Episodios.create(req.body);

        return res.status(201).send({
            type: 'sucess',
            message: 'episodio criado com sucesso',
            data: retorno
        });

    }catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'erro de servidor',
            data: error.message,
        });
    }
};

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

        const episodio = await Episodios.findByPk(idNumero);

        if (!episodio) {
            return res.status(404).send({
                type: 'error',
                message: 'episodio nao encontrado',
                data: []
            });
        }

        return res.status(200).send({
            type: 'sucess',
            message: 'episodio encontrado',
            data: episodio
        });
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'erro de servidor',
            data: error.message,
        });
    }
};

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

        const dado = await Episodios.findByPk(idNumero);

        if (!dado) {
            return res.status(404).send({
                type: 'error',
                message: 'episodio nao encontrado',
                data: []
            });
        }
        await dado.destroy();
        return res.status(200).send({
            type: 'sucess',
            message: 'episodio deletado com sucesso',
            data: []
        });


    }catch (error){
        return res.status(500).send({
            type: 'error',
            message: 'erro de servidor',
            data: error.message,
        });
    }
};


const update = async (req, res) => {
    try{
        const requisicao = req.body;

        const idNumero = Number(req.params.id);

        if (!Number.isInteger(idNumero) || idNumero <= 0) {
            return res.status(400).send({
                type: 'error',
                message: 'id invalido',
                data: []
            });
        }

        const dado = await Episodios.findByPk(idNumero);

        if (!dado) {
            return res.status(404).send({
                type: 'error',
                message: 'episodio nao encontrado',
                data: []
            });
        }

        Object.keys(requisicao).forEach(campo => dado[campo] = requisicao[campo]);
        await dado.save();

        return res.status(200).send({
            type: 'sucess',
            message: 'episodio atualizado com sucesso',
            data: dado
        });
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'erro de servidor',
            data: error.message,
        });
    }
};

export default {
    getapi,
    get,
    create,
    getcomid,
    destroy,
    update
}