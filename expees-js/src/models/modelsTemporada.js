import { sequealize } from "../config/index.js";
import { DataTypes } from "sequelize";

const Temporada = sequealize.define(
    'temporada',
    {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_series: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    numero_episodios : {
        type: DataTypes.INTEGER
    }
},
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    
)


export default Temporada