import tarefaRoute from "./tarefaRoute.js";
import usuarioRoute from "./usuarioRoute.js";
import vetorRoute from "./vetorRoute.js";

function Routes(app) {
  tarefaRoute(app)
  usuarioRoute(app);
  vetorRoute(app)
}

export default Routes;