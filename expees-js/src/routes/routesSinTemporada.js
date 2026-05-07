import sinTemporadaController from "../controllers/controllerSinTemporada.js";

export default (app) => {
    app.get('/sinTemporada', sinTemporadaController.get);
    app.post('/sinTemporada/create', sinTemporadaController.create);
    app.get('/sinTemporada/getcomid/:id', sinTemporadaController.getcomid);
    app.delete('/sinTemporada/destroy/:id', sinTemporadaController.destroy);
    app.patch('/sinTemporada/update/:id', sinTemporadaController.update);
};