import episodiosController from "../controllers/controllerEpisodios.js";
import verifyToken from "../middlewares/verifyToken.js";
import admVerify from "../middlewares/verifyAdm.js";

export default (app) => {
    app.get('/episodios/getapi', episodiosController.getapi);
    app.get('/episodios/getapi/:id', episodiosController.getapi);
    app.get('/episodios', verifyToken, episodiosController.get);
    app.post('/episodios/create', verifyToken, episodiosController.create);
    app.get('/episodios/getcomid/:id', verifyToken, episodiosController.getcomid);
    app.delete('/episodios/destroy/:id', verifyToken, episodiosController.destroy);
    app.patch('/episodios/update/:id', verifyToken, episodiosController.update);
};