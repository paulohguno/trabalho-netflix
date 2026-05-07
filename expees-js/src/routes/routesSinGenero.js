import sinGenerosController from "../controllers/controllerSinGenero";

export default (app) => {
    app.get('/sinGenero', sinGenerosController.get);
    app.post('/sinGenero/create', sinGenerosController.create);
    app.get('/sinGenero/getcomid/:id', sinGenerosController.getcomid);
    app.delete('/sinGenero/destroy/:id', sinGenerosController.destroy);
    app.patch('/sinGenero/update/:id', sinGenerosController.update);
};