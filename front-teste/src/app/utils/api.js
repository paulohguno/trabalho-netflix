import axios from 'axios';

// aqui o const define a variavel da url base da api
// essa parte tenta pegar a url que veio do ambiente
// se nao achar essa url ele monta a url do navegador
// se ainda assim nao der ele usa localhost como apoio
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.hostname}:3333` : 'http://localhost:3333');

// aqui o const cria o cliente axios que vai fazer as chamadas da api
// este cliente vai ser usado nas rotas que precisam de token
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// aqui o const cria outro cliente axios para as rotas publicas
// a ideia e separar o que usa token do que nao usa token
const publicApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


// aqui o interceptor pega a requisicao antes dela sair
// ele serve para olhar o token salvo no navegador e colocar no header
// isso evita repetir essa logica em toda chamada da api
api.interceptors.request.use((config) => {
    // aqui o const token pega o valor salvo no localStorage
    const token = localStorage.getItem('token');
    if (token) {
        // aqui o header Authorization recebe o token para a api reconhecer o usuario
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// aqui o interceptor da resposta trata o erro em um lugar so
// se a api devolver 401 quer dizer que o token nao serviu mais
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // aqui remove o token antigo para nao continuar usando ele
            localStorage.removeItem('token');
            // depois manda o usuario para a tela de login
            window.location.href = '/tela-login';
        }
        return Promise.reject(error);
    }
);

// aqui fica o objeto com as funcoes de autenticacao da api
// ele junta login, cadastro e logout em um so lugar
export const autenticacaoAPI = {
    // aqui o login manda email e senha para a rota de autenticacao
    login: (email, password) =>
        api.post('/autenticacao/login', { email, password }),
    // aqui o registrar manda os dados do formulario para criar usuario
    registrar: (dados) =>
        api.post('/autenticacao/register', dados),

    // aqui o logout apaga o token que ficou salvo no navegador
    logout: () => {
        localStorage.removeItem('token');
    },
};

// aqui ficam as funcoes da tabela usuarios
// cada uma faz uma acao diferente na api
export const usuariosAPI = {
    // listar busca todos os usuarios
    listar: () => api.get('/dadosUsuarios'),

    // obter busca um usuario especifico pelo id
    obter: (id) => api.get(`/dadosUsuarios/getcomid/${id}`),

    // criar envia os dados para cadastrar um novo usuario
    criar: (dados) => api.post('/dadosUsuarios/create', dados),

    // atualizar troca os dados de um usuario que ja existe
    atualizar: (id, dados) => api.patch(`/dadosUsuarios/update/${id}`, dados),

    // deletar remove o usuario pelo id
    deletar: (id) => api.delete(`/dadosUsuarios/destroy/${id}`),
};

// aqui ficam as funcoes da tabela series
export const seriesAPI = {
    listar: () => api.get('/series'),

    obter: (id) => api.get(`/series/${id}`),

    criar: (dados) => api.post('/series', dados),

    atualizar: (id, dados) => api.put(`/series/${id}`, dados),

    deletar: (id) => api.delete(`/series/${id}`),
};

// aqui ficam as rotas de sinopse
export const sinopseAPI = {
    // essas rotas nao usam token porque sao publicas
    popular: () => publicApi.get('/sinopse/popular'),
    topRated: () => publicApi.get('/sinopse/top-rated'),      
    upcoming: () => publicApi.get('/sinopse/upcoming'),        
    trending: () => publicApi.get('/sinopse/trending'),        
    // essa rota usa o cliente com token porque busca uma sinopse especifica
    obter: (id) => api.get(`/sinopse/getcomid/${id}`),
};

// aqui ficam as funcoes de episodios
export const episodiosAPI = {
    listar: () => api.get('/episodios'),

    obter: (id) => api.get(`/episodios/${id}`),

    criar: (dados) => api.post('/episodios', dados),

    atualizar: (id, dados) => api.put(`/episodios/${id}`, dados),

    deletar: (id) => api.delete(`/episodios/${id}`),
};

// aqui ficam as funcoes de generos
export const generosAPI = {
    listar: () => api.get('/generos'),

    obter: (id) => api.get(`/generos/${id}`),
};

// aqui ficam as funcoes de autores
export const autoresAPI = {
    listar: () => api.get('/autores'),

    obter: (id) => api.get(`/autores/${id}`),
};

// aqui ficam as funcoes dos perfis
export const perfisAPI = {
    listar: () => api.get('/perfisUsuarios'),
    obter: (id) => api.get(`/perfisUsuarios/getcomid/${id}`),
    listarPublico: () => api.get('/perfisUsuarios/public'),
};

// aqui fica a lista publica dos perfis
export const perfisPublicAPI = {
    listar: () => publicApi.get('/perfisUsuarios/public'),
};



// por fim exporta o cliente principal da api
export default api;
