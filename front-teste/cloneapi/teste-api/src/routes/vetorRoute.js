import vetorController from "../controllers/vetorController.js";

export default (app) => {
  app.delete('/crs/:variavel/entrar/:email', vetorController.loginEmail);
}
