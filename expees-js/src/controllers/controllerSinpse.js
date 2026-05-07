import Sinopse from '../models/modelsSinpse.js';
import SinopseAutores from '../models/modelsSinAutores.js';
import SinopseGenero from '../models/modelsSinGenero.js';
import SinopseTemporada from '../models/modelsSinTemporada.js';
import chaveApi from '../service/servicoDeAPI.js';
import { downloadImagesFromTmdb } from '../utils/downloadImages.js';

const extrairNome = (tmdbItem) => tmdbItem.title || tmdbItem.original_title || tmdbItem.name || '';

const salvarSinopseTmdb = async (tmdbItem) => {
    const nome = extrairNome(tmdbItem).trim();
    const dataLancamento = tmdbItem.release_date || tmdbItem.first_air_date || null;
    const informacoes = tmdbItem.overview || '';

    if (!nome) {
        throw new Error('titulo da TMDB nao encontrado');
    }

    if (!dataLancamento) {
        throw new Error('data de lancamento nao encontrada na TMDB');
    }

    const payload = {
        nome,
        data_lancamento: dataLancamento,
        informacoes,
    };

    const existente = await Sinopse.findOne({
        where: { nome }
    });

    if (existente) {
        existente.data_lancamento = payload.data_lancamento;
        existente.informacoes = payload.informacoes;
        await existente.save();

        return existente;
    }

    return Sinopse.create(payload);
};

const BuscarNomeApi = async (req, res) => {
    try {
        const nome = (req.query.nome || req.body?.nome || req.params.nome || '').trim();

        if (!nome) {
            return res.status(400).send({
                type: 'error',
                message: 'nome e obrigatorio',
                data: []
            });
        }

        const tmdb = await chaveApi(`/search/movie?query=${encodeURIComponent(nome)}&language=pt-BR&page=1`);
        const filme = Array.isArray(tmdb.results) ? tmdb.results[0] : null;

        if (!filme) {
            return res.status(404).send({
                type: 'error',
                message: 'nenhum resultado encontrado na tmdb',
                data: []
            });
        }

        const sinopseSalva = await salvarSinopseTmdb(filme);

        return res.status(200).send({
            type: 'sucess',
            message: 'sinopse encontrada na tmdb e salva com sucesso',
            data: {
                tmdb: filme,
                sinopse: sinopseSalva
            }
        });
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'erro de servidor',
            data: error.message,
        });
    }
};

const BuscarPopulares = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const tmdb = await chaveApi(`/movie/popular?language=pt-BR&page=${page}`);

        const items = Array.isArray(tmdb.results) ? tmdb.results : [];
        const downloaded = await downloadImagesFromTmdb(items);

        // Build local URLs using API_HOST env var or fallback
        const host = (process.env.API_HOST || `http://localhost:${process.env.API_PORT || 3333}`).replace(/\/$/, '');

        const mapped = items.map((it) => {
            const dl = downloaded.find(d => d.id === it.id);
            const localPoster = dl && dl.localPoster ? `${host}/media/${dl.localPoster}` : null;
            return {
                ...it,
                local_poster: localPoster
            };
        });

        return res.status(200).send({
            type: 'sucess',
            message: 'filmes populares TMDB retornados',
            data: { ...tmdb, results: mapped }
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

const BuscarTopRated = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const tmdb = await chaveApi(`/movie/top_rated?language=pt-BR&page=${page}`);

        const items = Array.isArray(tmdb.results) ? tmdb.results : [];
        const downloaded = await downloadImagesFromTmdb(items);

        const host = (process.env.API_HOST || `http://localhost:${process.env.API_PORT || 3333}`).replace(/\/$/, '');

        const mapped = items.map((it) => {
            const dl = downloaded.find(d => d.id === it.id);
            const localPoster = dl && dl.localPoster ? `${host}/media/${dl.localPoster}` : null;
            return {
                ...it,
                local_poster: localPoster
            };
        });

        return res.status(200).send({
            type: 'success',
            message: 'filmes top rated TMDB retornados',
            data: { ...tmdb, results: mapped }
        });
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'erro de servidor',
            data: error.message,
        });
    }
};

const BuscarUpcoming = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const tmdb = await chaveApi(`/movie/upcoming?language=pt-BR&page=${page}`);

        const items = Array.isArray(tmdb.results) ? tmdb.results : [];
        const downloaded = await downloadImagesFromTmdb(items);

        const host = (process.env.API_HOST || `http://localhost:${process.env.API_PORT || 3333}`).replace(/\/$/, '');

        const mapped = items.map((it) => {
            const dl = downloaded.find(d => d.id === it.id);
            const localPoster = dl && dl.localPoster ? `${host}/media/${dl.localPoster}` : null;
            return {
                ...it,
                local_poster: localPoster
            };
        });

        return res.status(200).send({
            type: 'success',
            message: 'filmes upcoming TMDB retornados',
            data: { ...tmdb, results: mapped }
        });
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'erro de servidor',
            data: error.message,
        });
    }
};

const BuscarTrending = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const tmdb = await chaveApi(`/trending/movie/week?language=pt-BR&page=${page}`);

        const items = Array.isArray(tmdb.results) ? tmdb.results : [];
        const downloaded = await downloadImagesFromTmdb(items);

        const host = (process.env.API_HOST || `http://localhost:${process.env.API_PORT || 3333}`).replace(/\/$/, '');

        const mapped = items.map((it) => {
            const dl = downloaded.find(d => d.id === it.id);
            const localPoster = dl && dl.localPoster ? `${host}/media/${dl.localPoster}` : null;
            return {
                ...it,
                local_poster: localPoster
            };
        });

        return res.status(200).send({
            type: 'success',
            message: 'filmes trending TMDB retornados',
            data: { ...tmdb, results: mapped }
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
    BuscarNomeApi,
    BuscarPopulares,
    BuscarTopRated,
    BuscarUpcoming,
    BuscarTrending,
    get,
    create,
    getcomid,
    destroy,
    update
}