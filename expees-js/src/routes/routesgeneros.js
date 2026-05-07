import generosController from "../controllers/controllerGenero.js";
import verifyToken from "../middlewares/verifyToken.js";
import admVerify from "../middlewares/verifyAdm.js";

export default (app) => {
    app.get('/generos', verifyToken, generosController.get);
    app.post('/generos/create', verifyToken, generosController.create);
    app.get('/generos/getcomid/:id', verifyToken, generosController.getcomid);
    app.delete('/generos/destroy/:id', verifyToken, generosController.destroy);
    app.patch('/generos/update/:id', verifyToken, generosController.update);
};