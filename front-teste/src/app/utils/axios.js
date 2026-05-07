import axios from "axios";

// aqui o const guarda a url base da api
const baseURL = process.env.NEXT_PUBLIC_URL_API || process.env.URL_API || "http://localhost:3333";

// aqui o const cria o cliente axios
const api = axios.create({
    baseURL,
});


// aqui o interceptor devolve so o response.data
api.interceptors.response.use(
    (response) => response.data,
);

// por fim exporta o client
export default api;