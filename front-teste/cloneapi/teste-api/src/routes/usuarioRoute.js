import usuarioController from "../controllers/usuarioController.js";

export default (app) => {
  app.post('/usuario/register', usuarioController.register);
  app.post('/usuario/login', usuarioController.login);
  app.get('/usuario/token', usuarioController.getUserByToken)
}
