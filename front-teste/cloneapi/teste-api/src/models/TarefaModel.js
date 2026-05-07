import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";

const Tarefa = sequelize.define(
  'tarefas',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descricao: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    finalizado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    arquivo: {
      type: DataTypes.STRING
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export default Tarefa