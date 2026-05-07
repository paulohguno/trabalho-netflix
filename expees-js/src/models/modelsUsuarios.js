import { sequealize } from "../config/index.js";
import { DataTypes } from "sequelize";
import Planos from "./modelsPlanos.js";
import Autentic from "./modelsAutentic.js";

const Dados_Usuarios = sequealize.define(
    'dados_usuarios',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        cpf:{
            type: DataTypes.STRING(20),
            allowNull: false
        },
        status_da_conta: {
            type: DataTypes.BOOLEAN,
            autoIncrement: false
        },
        data_pagamento:{
            type: DataTypes.DATE,
            allowNull : false
        },
        localizacao : {
            type: DataTypes.STRING
        },
        arquivo:{
            type: DataTypes.STRING
        },
        id_plano_usuario:{
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_plano_usuario',
            references: {
                model : 'planos',
                key: 'id'
            }
        }
    },
    {
        freezeTableName : true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt : 'updated_at'
    }
)

Dados_Usuarios.belongsTo(Autentic, {
    as: 'autenticacao_usuario',
    foreignKey: {
        name: 'id_autenticacao_usuario',
        allowNull: false,
        field: 'id_autenticacao_usuario'
    },
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
}
)

Dados_Usuarios.belongsTo(Planos, {
    as: 'plano_usuario',
    foreignKey: {
        name: 'id_plano_usuario',
        allowNull: false,
        field: 'id_plano_usuario'
    },
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});



export default Dados_Usuarios