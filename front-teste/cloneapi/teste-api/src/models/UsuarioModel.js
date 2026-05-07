import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";

const Usuario = sequelize.define(
  'usuario',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(),
      allowNull: false,
      unique: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passwordHash: {
      field: 'password_hash',
      type: DataTypes.STRING(1000)
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Usuario