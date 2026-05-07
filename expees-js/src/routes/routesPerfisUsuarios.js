import perfisUsuariosController from "../controllers/controllerPerfisUsuarios.js";
import verifyToken from "../middlewares/verifyToken.js";
import admVerify from "../middlewares/verifyAdm.js";

export default (app) => {
    app.get('/perfisUsuarios/public', perfisUsuariosController.get);
    app.get('/perfisUsuarios', verifyToken, perfisUsuariosController.get);
    app.post('/perfisUsuarios/create', verifyToken, perfisUsuariosController.create);
    app.get('/perfisUsuarios/getcomid/:id', verifyToken, perfisUsuariosController.getcomid);
    app.delete('/perfisUsuarios/destroy/:id', verifyToken, perfisUsuariosController.destroy);
    app.patch('/perfisUsuarios/update/:id', verifyToken, perfisUsuariosController.update);
};