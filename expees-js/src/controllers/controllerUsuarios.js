import { sequealize as sequelize } from "../config/index.js";
import DadosUsuarios from "../models/modelsUsuarios.js";
import PerfisUsuarios from "../models/modelsPerfisUsuarios.js";
import Historico from "../models/modelsHistorico.js";
import Sinopse from "../models/modelsSinpse.js";
import fileUpload from "express-fileupload";
import deletarfiles from "../utils/files/deletarfiles.js";




const get = async (req, res ) => {
    try{
        const dados = await DadosUsuarios.findAll();
        return res.status(200).send({
            type: 'sucess',
            message: 'usuarios listados com sucesso',
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

//declaraao de uma funcao chamada getlancamentos
// async e uma funcao asincrona ela roda fora de tempo
//uma funcao assincrona faz o sistema entender que pode demorar a retornar o valor e nao trava o sistema
const getlancamentos = async (req, res) => {
    //req e res sao os retornos req e e o valor requisitado
    //res e ovalor de rotorno da api express
    
    //try e um sistema de erro caso o sistema de algum erro ele tem onde cair
    try {
        //aqui o const {id} pega o valor do index da rota ex getlancemetos/1
        //ele vai salvar os dados da requisicao em id
        //como os dados do index vem com string todas as vezes
        const { id } = req.params;
        //nessa parte vamos salvar idususarionumero e integrar a ele o valor de number(id)
        //neste caso o valor de string de id vai ser conventido em numeros e salvo idusuarionumero
        const idUsuarioNumero = Number(id);
        //aqui temos um if de validacao para ver se o numero do index passado par idusuarionumero
        //e um numero inteiro e se e mais que zero 
        //a logica vai ficar se numero na negacao chamada de isINTEGER que verifica se for interiro ou nao 
        //e retonar um true ou false ou seja se numero negado for inteiro ele vai negar se nao for intero ele vai ganhar true
        //se ele ganhar true ele vai chamar o erro 400
        if (!Number.isInteger(idUsuarioNumero) || idUsuarioNumero <= 0) {

            //se o numero nao for inteiro ele vai receber verdadeiro e cair aqui entao vai retornar o erro
            //no casso res e a resposta da api e status 
            //nesta linha o status e uma forma de devolver um estado ou comunicacao ja cadastrada para os usuarios
            //no casso o status vai ser o 400 e o send envia uma resposta do servido para quem fez a requisicao
            return res.status(400).send({
                type: 'error',
                message: 'id invalido',
                data: []
            });
        }
        // aqui temos uma definicao de uma variacel que e a usuarios com await no caso 
        //quando usamos await o js vai esperar a resquisicao do servido para passar para o proximo passo
        //seria como dizer ao js espere ate eu devolver algo 
        //aqui ele esta esperando algo da tabela dadosususario 
        //a logica vai fincar constante :  usuarios espere a busca na tabela dados usuarios
        // a busca sera feita pela primarykey e estÁ buscando a igual idusuarioNumero 
        const usuario = await DadosUsuarios.findByPk(idUsuarioNumero);
        //aqui caso nao tenha dados retornados a usuario ele recebera null
        //entao se o valor e null ele e falso
        //aqui o if vai verificar se usuarios for null ele retorna este erro
        if (!usuario) {
            //aqui o memso sentido o res ou seja retorno da api ele vai reornar o erro 404
            return res.status(404).send({
                type: 'error',
                message: 'usuario nao encontrado',
                data: []
            });
        }
        //aqui ele vai esperar uma busca total no historico e esperar o findall
        //serve para realizar uma busca completa

        const dados = await Historico.findAll({
            //aqui fizemos uma bus mais especifica dentro do finall dizemos quais tabelas e campos queremos trazer
            //no casso passado este atributos eu etou dizendo que quero traer o id_sinopse
            attributes: [
                'id_sinopse',
                //o sequelize.fn e uma funcao usada para poder fazer requisicoes sql dentro do 
                //proprio sequelize no nosso caso o count que vai fazer uma conta
                //emos o sequelize col que serve para fazer uma busca em colunas e nao tabelas
                //ou seja passamos que temos a nossa pk id_sinopse e vamos fazer uma contagem 
                //essa contagem vai comecar na tabela historico 
                //nesse caso ele vai contar nesta tabela seguindo esta logica
                //agrupando o id sinopse passa o campo a arupar o cont vai contar porem 
                //o sequelize col passa a coluna a ser contada e total assistido vai ser a saido
                //no caso vai guardar o resultado
                
                [sequelize.fn('COUNT', sequelize.col('historico.id_sinopse')), 'total_assistido']
            ],


            //aqui este include 
            //ele vai ajudar a puxar nao so a tabela historico mais dados relacionados a ela
            //com ligacao
            //igual a um join
            include: [
                {
                    //aqui o model diz em qual tabela vamos conectar 
                    model: PerfisUsuarios,
                    //aqui sao os parametros dos dados no caso vamos puxar em perfisUsuarios
                    //vamos fazer uma comparacao onde o id de perfis usuarios for igual ao index
                    as: 'perfil_usuario',
                    attributes: [],
                    where: { id_dados_usuario: idUsuarioNumero }
                },
                //aqui o sentido e o mesmo porem vamos puxar os atributos passado sem passar comparacao 
                {
                    model: Sinopse,
                    as: 'Sinopse',
                    attributes: ['id', 'data_lancamento', 'informacoes']
                }


            ],
            //aqui o comando group serve para agrupar os dados puxados de ...
            group: ['historico.id_sinopse', 'Sinopse.id'],
            //ja o order serve para ordenar seguindo tal parametros
            //no nosso caso vamos ultilizar o sequelize literal que serve para 
            //podermos escrever comandos sql dentro do codigo 
            //aqui vamos  chamar total assitido que e como se fosse uma variavel temporaria
            //ja o desc e um sentido de ordenacao do caso ele representa o decresente
            order: [
                [sequelize.literal('total_assistido'), 'DESC'],
                //no casso aqui temo uma estrututacao de capo e diecao 
                // [campo [direcao]] 
                //este model serve para idicar de qual tabela vem o campo para ordenar
                //o as serve para indicar o nome da acossicao o data lancamento e o campo e o desc serve para 
                //ordenacao no caso o desc serve para para dizer o metodo de ordenacao c
                [{ model: Sinopse, as: 'Sinopse' }, 'data_lancamento', 'DESC']
            ],

            //esse limit serve para que o retono mostre apenas um conjunto de dados 
            
            limit: 1
        });
        //aqui temos um alert de sucesso na busca
        return res.status(200).send({
            type: 'sucess',
            message: 'lancamento mais assistido encontrado com sucesso',
            data: dados
        });

        //caso o try la em cima de errado ele vai cair aqui 
        //no casso se der erro ele cai neste erro 
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'erro na busca de lancamentos',
            data: error.message,
        });
    }
}


const create = async (req, res) => {
    try {

        console.log(req.body);
        
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({
            type: 'error',
            message: 'falta de informacoes',
            data: []
        })
    }

    const retorno = await DadosUsuarios.create(req.body);

    return res.status(201).send({
        type: 'sucess',
        message: 'usuario criado ',
        data: retorno
    });

    }catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'erro de servidor',
            data: error.message,
        })
    }
    if(req.file && req.file.upoloadsFiles){
        let upload = await fileUpload(req.file.upoloadsFiles, {
            id : retorno.id,
            tipo: req.query.tipo || 'imagem',
            tabela: 'usuarios',
        });
        retorno.arquivo = upload.path;
        await retorno.save();
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

        const usuario = await DadosUsuarios.findByPk(idNumero);

        if (!usuario) {
            return res.status(404).send({
                type: 'error',
                message: 'usuario nao encontrado',
                data: []
            });
        }

        return res.status(200).send({
            type: 'sucess',
            message: 'usuario encontrado',
            data: usuario
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
        const dado = await DadosUsuarios.findOne({
            where: { 
                id
            }
        });
        //funcao remover imagem 
        try{
            //este ponto .arquivo vem do model
            //este dado salva o resultado da busca do id 
            if (dado.arquivo) {
                await deletarfiles(dado.arquivo, {
                    id: dado,
                });
            }   
        } catch (error) {
            console.error('Erro ao deletar arquivo:', error);
        }

        if (!dado) {
            return res.status(404).send({
                type: 'error',
                message: 'usuario nao encontrado',
                data: []
            });
        }
        await dado.destroy();
        return res.status(200).send({
            type: 'sucess',
            message: 'usuario deletado com sucesso',
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

        const dado = await DadosUsuarios.findOne({
            where: { 
                id
            }
        });
        //funcao trocar a imagem
        try{
            //este ponto .arquivo vem do model
            //este dado salva o resultado da busca do id 
            if (dado.arquivo) {
                await deletarfiles(dado.arquivo, {
                    id: dado,
                });
            }   
        } catch (error) {
            console.error('ERRO ao alterar imagem:', error);
        }
        try{
            //este .request.file e para pegar o arquivo enviado na requisicao
            //o if serve para verficar se tem  um arquivo enviado

            if (req.file && req.file.upoloadsFiles) {

                let upload = await fileUpload(req.file.upoloadsFiles, {
                    id : dado.id,
                    tipo: req.query.tipo || 'imagem',
                    tabela: 'usuarios',
                });
                //o dado.arquivo e para atualizar o caminho do arquivo no banco de dados
                //o upload.path e para salvar o caminho atualizado no banco de dados
                dado.arquivo = upload.path;
                //o await serve para esperar o servidor salvar o novo endereco 
                await dado.save();
                    }
        } catch (error) {
            console.error('ERRO ao fazer upload da nova imagem:', error);
        }

        if (!dado) {
            return res.status(404).send({
                type: 'error',
                message: 'usuario nao encontrado',
                data: []
            });
        }

        Object.keys(requisicao).forEach(campo => dado[campo] = requisicao[campo]);
        await dado.save();

        return res.status(200).send({
            type: 'sucess',
            message: 'usuario atualizado com sucesso',
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
    getlancamentos,
    create,
    getcomid,
    destroy,
    update
}