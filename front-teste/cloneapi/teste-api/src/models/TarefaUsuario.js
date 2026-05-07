import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";
import Tarefa from "./TarefaModel.js";


const TarefaUsuario = sequelize.define(
  'tarefas_usuarios',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

TarefaUsuario.belongsTo(Tarefa, {
  as: 'tarefas',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'idTarefa',
    allowNull: false,
    field: 'id_tarefa'
  }
});

export default TarefaUsuario;