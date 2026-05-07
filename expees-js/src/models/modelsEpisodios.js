import { sequealize } from "../config/index.js";
import { DataTypes } from "sequelize";
import Temporada from "./modelsTemporada.js"

const Episodios = sequealize.define(
    'episodios',
    {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    titulo : {
        type: DataTypes.STRING,
        allowNull: true
    },
    id_temporada: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_temporada',
        references: {
            model: 'temporada',
            key: 'id'
        }
    }
    
},
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    
)

    Episodios.belongsTo(Temporada, {
        as: 'temporada',
    foreignKey: {
        name: 'id_temporada',
        allowNull: false,
            field: 'id_temporada'
    },
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});


export default Episodios