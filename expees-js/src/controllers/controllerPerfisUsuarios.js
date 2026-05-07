import PerfisUsuarios from '../models/modelsPerfisUsuarios.js';

const get = async (req, res ) => {
    try{
        const dados = await PerfisUsuarios.findAll();
        return res.status(200).send({
            type: 'sucess',
            message: 'perfis usuarios listados com sucesso',
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

    const retorno = await PerfisUsuarios.create(req.body);

    return res.status(201).send({
        type: 'sucess',
        message: 'perfil criado com sucesso',
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

        const perfil = await PerfisUsuarios.findByPk(idNumero);

        if (!perfil) {
            return res.status(404).send({
                type: 'error',
                message: 'perfil nao encontrado',
                data: []
            });
        }

        return res.status(200).send({
            type: 'sucess',
            message: 'perfil encontrado',
            data: perfil
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
        const dado = await PerfisUsuarios.findOne({
            where: { 
                id
            }
        });

        if (!dado) {
            return res.status(404).send({
                type: 'error',
                message: 'perfil nao encontrado',
                data: []
            });
        }
        await dado.destroy();
        return res.status(200).send({
            type: 'sucess',
            message: 'perfil deletado com sucesso',
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

        const dado = await PerfisUsuarios.findOne({
            where: { 
                id
            }
        });

        if (!dado) {
            return res.status(404).send({
                type: 'error',
                message: 'perfil nao encontrado',
                data: []
            });
        }

        Object.keys(requisicao).forEach(campo => dado[campo] = requisicao[campo]);
        await dado.save();

        return res.status(200).send({
            type: 'sucess',
            message: 'perfil atualizado com sucesso',
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