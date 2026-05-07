import { sequealize } from "../config/index.js";
import { DataTypes, INTEGER } from "sequelize";



const Autentic = sequealize.define(
    'autenticacao',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        passwordHash: {
            field: 'password_hash',
            type: DataTypes.STRING(1000),
            allowNull: false,

        },nivelAcesso: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            defaultValue: 1,
            //nivel 1 usuario, 2 adm.
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)



export default Autentic;    