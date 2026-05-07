
import Autenticacao from "../controllers/controllerAutentic.js";
import verifyToken from "../middlewares/verifyToken.js";
import admVerify from "../middlewares/verifyAdm.js";

export default (app) => {
    app.post('/autenticacao/register',  Autenticacao.register);
    app.post('/autenticacao/login',  Autenticacao.login);
    app.get('/autenticacao/user', Autenticacao.getUserByToken);

};