import sinopseController from "../controllers/controllerSinpse.js"
import verifyToken from "../middlewares/verifyToken.js";
import admVerify from "../middlewares/verifyAdm.js";

export default (app) => {
    app.get('/sinopse/getapi', sinopseController.BuscarNomeApi);
    app.get('/sinopse/getapi/:nome', sinopseController.BuscarNomeApi);
    app.post('/sinopse/getapi', sinopseController.BuscarNomeApi);
    app.get('/sinopse/buscar', sinopseController.BuscarPorNome);
    app.get('/sinopse/popular', sinopseController.BuscarPopulares);
    app.get('/sinopse/genero/:id', sinopseController.BuscarPorGenero);
    app.get('/sinopse/top-rated', sinopseController.BuscarTopRated);
    app.get('/sinopse/upcoming', sinopseController.BuscarUpcoming);
    app.get('/sinopse/trending', sinopseController.BuscarTrending);
    app.get('/sinopse', verifyToken, sinopseController.get);
    app.post('/sinopse/create', verifyToken, sinopseController.create);
    app.get('/sinopse/getcomid/:id', verifyToken, sinopseController.getcomid);
    app.delete('/sinopse/destroy/:id', verifyToken, sinopseController.destroy);
    app.patch('/sinopse/update/:id', verifyToken, sinopseController.update);
};