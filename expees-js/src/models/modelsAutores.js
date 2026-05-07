import { sequealize } from "../config/index.js";
import { DataTypes } from "sequelize";


const Autores = sequealize.define(
    'autores',
    {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome : {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    
)



export default Autores