//aqui está o serviço de API para acessar a chave de API externa
//aqui ele cria um end point, um endpoint e como se fosse uma pagina expecifica de um site

//o objetivo principal deste codigo e criar url da api externa e acessar a chave da api
import 'dotenv/config';

export const chaveApi = async (endpoint) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3${endpoint}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.EXTERNAL_API_TOKEN}`,
                'api-key': process.env.EXTERNAL_API_KEY,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error(`Erro: ${response.status}`);

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export default chaveApi;