import temporadaController from "../controllers/controllerTemporada.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdm from "../middlewares/verifyAdm.js";

export default (app) => {
    app.get('/temporada', verifyToken, temporadaController.get);
    app.post('/temporada/create', verifyToken, temporadaController.create);
    app.get('/temporada/getcomid/:id', verifyToken, temporadaController.getcomid);
    app.delete('/temporada/destroy/:id', verifyToken, temporadaController.destroy);
    app.patch('/temporada/update/:id', verifyToken, temporadaController.update);
};