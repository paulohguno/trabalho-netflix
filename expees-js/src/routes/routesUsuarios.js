import dadosUsuariosController from "../controllers/controllerUsuarios.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdm from "../middlewares/verifyAdm.js";

export default (app) => {
    app.get('/dadosUsuarios', verifyToken, dadosUsuariosController.get);
    app.get('/dadosUsuarios/lancamentos/:id', verifyToken, dadosUsuariosController.getlancamentos);
    app.post('/dadosUsuarios/create', dadosUsuariosController.create);
    app.get('/dadosUsuarios/getcomid/:id', verifyToken, dadosUsuariosController.getcomid);
    app.delete('/dadosUsuarios/destroy/:id', verifyToken, dadosUsuariosController.destroy);
    app.patch('/dadosUsuarios/update/:id', verifyToken, dadosUsuariosController.update);
};