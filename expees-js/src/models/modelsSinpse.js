import { sequealize } from "../config/index.js";
import { DataTypes } from "sequelize";
import Temporada from "./modelsTemporada.js";
import Genero from "./modelsGenero.js";
import Autores from "./modelsAutores.js";
import SinopseAutores from "./modelsSinAutores.js";
import SinopseGenero from "./modelsSinGenero.js";
import SinopseTemporada from "./modelsSinTemporada.js";


const Sinopse = sequealize.define(
    'sinopse',
    {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    data_lancamento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    informacoes: {
        type: DataTypes.TEXT,
    },
        nome: {
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

Sinopse.belongsToMany(Autores, {
    as: 'autores',
    through: SinopseAutores,
    foreignKey: 'id_sinopse',
    otherKey: 'id_autor'
});

Sinopse.belongsToMany(Genero, {
    as: 'generos',
    through: SinopseGenero,
    foreignKey: 'id_sinopse',
    otherKey: 'id_genero'
});

Sinopse.belongsToMany(Temporada, {
    as: 'temporadas',
    through: SinopseTemporada,
    foreignKey: 'id_sinopse',
    otherKey: 'id_temporada'
});


export default Sinopse