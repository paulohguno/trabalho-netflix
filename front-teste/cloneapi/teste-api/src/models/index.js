import Tarefa from "./TarefaModel.js";
import TarefaUsuario from "./TarefaUsuario.js";
import Usuario from "./UsuarioModel.js";

(async () => {
  await Usuario.sync({ alter: true });
  await Tarefa.sync({ alter: true });
  await TarefaUsuario.sync({ alter: true });
})();