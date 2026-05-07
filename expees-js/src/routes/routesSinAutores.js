import sinAutoresController from "../controllers/controllerSinAutores";


export default (app) => {
    app.get('/sinAutores', sinAutoresController.get);
    app.post('/sinAutores/create', sinAutoresController.create);
    app.get('/sinAutores/getcomid/:id', sinAutoresController.getcomid);
    app.delete('/sinAutores/destroy/:id', sinAutoresController.destroy);
    app.patch('/sinAutores/update/:id', sinAutoresController.update);
};