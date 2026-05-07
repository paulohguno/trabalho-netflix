import autoresController from "../controllers/controllerAutores.js";
import verifyToken from "../middlewares/verifyToken.js";
import admVerify from "../middlewares/verifyAdm.js";

export default (app) => {
    app.get('/autores', verifyToken, autoresController.get);
    app.post('/autores/create', verifyToken, autoresController.create);
    app.get('/autores/getcomid/:id', verifyToken, autoresController.getcomid);
    app.delete('/autores/destroy/:id', verifyToken, autoresController.destroy);
    app.patch('/autores/update/:id', verifyToken, autoresController.update);
};