import Sinopse from '../models/modelsSinpse.js';
import SinopseAutores from '../models/modelsSinAutores.js';
import SinopseGenero from '../models/modelsSinGenero.js';
import SinopseTemporada from '../models/modelsSinTemporada.js';

const get = async (req, res ) => {
    try{
        const dados = await Sinopse.findAll();
        return res.status(200).send({
            type: 'sucess',
            message: 'sinopses listadas com sucesso',
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

    const {
        data_lancamento,
        informacoes,
        id_autor,
        id_autores,
        id_genero,
        id_temporada
    } = req.body;

    if (!data_lancamento) {
        return res.status(400).send({
            type: 'error',
            message: 'data_lancamento e obrigatorio',
            data: []
        })
    }

    const retorno = await Sinopse.create({
        data_lancamento,
        informacoes
    });

    const autorId = id_autor || id_autores;

    if (autorId) {
        await SinopseAutores.create({
            id_sinopse: retorno.id,
            id_autor: autorId
        });
    }

    if (id_genero) {
        await SinopseGenero.create({
            id_sinopse: retorno.id,
            id_genero
        });
    }

    if (id_temporada) {
        await SinopseTemporada.create({
            id_sinopse: retorno.id,
            id_temporada
        });
    }

    return res.status(201).send({
        type: 'sucess',
        message: 'sinopse criada com sucesso',
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

        const sinopse = await Sinopse.findByPk(idNumero);

        if (!sinopse) {
            return res.status(404).send({
                type: 'error',
                message: 'sinopse nao encontrada',
                data: []
            });
        }

        return res.status(200).send({
            type: 'sucess',
            message: 'sinopse encontrada',
            data: sinopse
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
        const dado = await Sinopse.findOne({
            where: { 
                id
            }
        });

        if (!dado) {
            return res.status(404).send({
                type: 'error',
                message: 'sinopse nao encontrada',
                data: []
            });
        }
        await dado.destroy();
        return res.status(200).send({
            type: 'sucess',
            message: 'sinopse deletada com sucesso',
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

        const dado = await Sinopse.findOne({
            where: { 
                id
            }
        });

        if (!dado) {
            return res.status(404).send({
                type: 'error',
                message: 'sinopse nao encontrada',
                data: []
            });
        }

        const {
            id_autor,
            id_autores,
            id_genero,
            id_temporada,
            ...camposSinopse
        } = requisicao;

        Object.keys(camposSinopse).forEach(campo => dado[campo] = camposSinopse[campo]);
        await dado.save();

        const autorId = id_autor || id_autores;

        if (autorId) {
            await SinopseAutores.destroy({ where: { id_sinopse: dado.id } });
            await SinopseAutores.create({ id_sinopse: dado.id, id_autor: autorId });
        }

        if (id_genero) {
            await SinopseGenero.destroy({ where: { id_sinopse: dado.id } });
            await SinopseGenero.create({ id_sinopse: dado.id, id_genero });
        }

        if (id_temporada) {
            await SinopseTemporada.destroy({ where: { id_sinopse: dado.id } });
            await SinopseTemporada.create({ id_sinopse: dado.id, id_temporada });
        }

        return res.status(200).send({
            type: 'sucess',
            message: 'sinopse atualizada com sucesso',
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