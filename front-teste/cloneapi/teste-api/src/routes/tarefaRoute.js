import tarefaController from "../controllers/tarefaController.js";
import verifyToken from "../middlewares/verifyToken.js";

export default (app) => {
  app.get('/tarefa/get-id/:id',  tarefaController.get);
  app.delete('/tarefa/deletar/:id', tarefaController.destroy);
  app.get('/tarefa/get-all', tarefaController.get);
  app.post('/tarefa/create', tarefaController.create);
  app.patch('/tarefa/update/:id', tarefaController.update);
}
