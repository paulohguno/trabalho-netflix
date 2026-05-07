import planosController from "../controllers/controllerPlanos.js";
import verifyToken from "../middlewares/verifyToken.js";
import admVerify from "../middlewares/verifyAdm.js";

export default (app) => {
    app.get('/planos', verifyToken, planosController.get);
    app.post('/planos/create', verifyToken, planosController.create);
    app.get('/planos/getcomid/:id', verifyToken, planosController.getcomid);
    app.delete('/planos/destroy/:id', verifyToken, planosController.destroy);
    app.patch('/planos/update/:id', verifyToken, planosController.update);
};