import historicoController from "../controllers/controllerHistorico.js";
import verifyToken from "../middlewares/verifyToken.js";
import admVerify from "../middlewares/verifyAdm.js";

export default (app) => {
    app.get('/historico/seriemaisassistida', verifyToken, historicoController.getfiltro);
    app.get('/historico', verifyToken, historicoController.get);
    app.post('/historico/create', verifyToken, historicoController.create);
    app.get('/historico/getcomid/:id_usuario', verifyToken, historicoController.getcomid);
    app.delete('/historico/destroy/:id', verifyToken, historicoController.destroy);
    app.patch('/historico/update/:id', verifyToken, historicoController.update);
};