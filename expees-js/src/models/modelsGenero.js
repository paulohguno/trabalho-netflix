import { sequealize } from "../config/index.js";
import { DataTypes } from "sequelize";


const Genero = sequealize.define(
    'genero',
    {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    
)


export default Genero