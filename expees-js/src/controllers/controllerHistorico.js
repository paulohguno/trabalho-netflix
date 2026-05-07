import Historico from "../models/modelsHistorico.js";
import { sequealize as sequelize } from "../config/index.js";
import PerfisUsuarios from "../models/modelsPerfisUsuarios.js";
import Sinopse from "../models/modelsSinpse.js";





const getfiltro = async (req, res) => {
    try{
        const { id_usuario } = req.query;

        const includePerfis = {
            model: PerfisUsuarios,
            as: 'perfil_usuario',
            attributes: []
        };

        if (id_usuario) {
            const idUsuarioNumero = Number(id_usuario);

            if (!Number.isInteger(idUsuarioNumero) || idUsuarioNumero <= 0) {
                return res.status(400).send({
                    type: 'error',
                    message: 'id_usuario invalido',
                    data: []
                });
            }

            includePerfis.where = { id_dados_usuario: idUsuarioNumero };
        }

        const dados = await Historico.findAll({
            attributes: [
                'id_sinopse',
                [sequelize.fn('COUNT', sequelize.col('historico.id_sinopse')), 'total_assistido']
            ],
            include: [
                includePerfis,
                {
                    model: Sinopse,
                    as: 'Sinopse',
                    attributes: ['id', 'data_lancamento', 'informacoes']
                }
            ],
            group: ['historico.id_sinopse', 'Sinopse.id'],
            order: [
                [sequelize.literal('total_assistido'), 'DESC'],
                [{ model: Sinopse, as: 'Sinopse' }, 'data_lancamento', 'DESC']
            ],
            limit: 1
        });

        return res.status(200).send({
            type: 'sucess',
            message: 'serie mais assistida listada com sucesso',
            data: dados
        })
    }
    catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'erro de servidor',
            data: error.message,
        })
    }
}


const get = async (req, res ) => {
    try{
        const dados = await Historico.findAll();
        return res.status(200).send({
            type: 'historico listado com sucesso',
            message: 'top ',
            data : dados

        })
    } catch (error) {
        return res.status(500).send({
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

    const retorno = await Historico.create(req.body);

    return res.status(201).send({
        type: 'sucess',
        message: 'historico criado com sucesso',
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
        const { id_usuario } = req.params;
        const idUsuarioNumero = Number(id_usuario);

        if (!Number.isInteger(idUsuarioNumero) || idUsuarioNumero <= 0) {
            return res.status(400).send({
                type: 'error',
                message: 'id_usuario invalido',
                data: []
            });
        }

        const historico = await Historico.findAll({
            where: { id_perfil_usuario: idUsuarioNumero },
            order: [['data_assistida', 'DESC']],
            limit: 10
        });

        return res.status(200).send({
            type: 'sucess',
            message: 'historico listado com sucesso',
            data: historico
        });
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'erro de servidor',
            data: error.message,
        })
    }
}

const destroy = async (req, res) => {
    try{
        const id = req.params.id ? req.params.id.replace(/\D/g, '') : null;
        const dado = await Historico.findOne({
            where: { 
                id
            }
        });

        if (!dado) {
            return res.status(404).send({
                type: 'error',
                message: 'historico nao encontrado',
                data: []
            });
        }
        await dado.destroy();
        return res.status(200).send({
            type: 'sucess',
            message: 'historico deletado com sucesso',
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

        const dado = await Historico.findOne({
            where: { 
                id
            }
        });

        if (!dado) {
            return res.status(404).send({
                type: 'error',
                message: 'historico nao encontrado',
                data: []
            });
        }

        Object.keys(requisicao).forEach(campo => dado[campo] = requisicao[campo]);
        await dado.save();

        return res.status(200).send({
            type: 'sucess',
            message: 'historico atualizado com sucesso',
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
    getfiltro,
    get,
    create,
    getcomid,
    destroy,
    update
}