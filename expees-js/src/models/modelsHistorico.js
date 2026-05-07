import { sequealize } from "../config/index.js";
import { DataTypes } from "sequelize";
import PerfisUsuarios from "./modelsPerfisUsuarios.js";
import Sinopse from "./modelsSinpse.js";

const Historico = sequealize.define(
    'historico',
    {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    episodio_assistido: {
        type: DataTypes.INTEGER,
    },
    tempo_assistido: {
        type: DataTypes.TIME,
    },
    temporada: {
        type: DataTypes.INTEGER
    },
    id_perfil_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_perfil_usuario',
        references: {
            model: 'perfis_usuarios',
            key: 'id'
        }
    },
    id_sinopse:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_sinopse',
        references: {
            model:"sinopse",
            key: 'id'
        },
    }
},
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    
)

Historico.belongsTo(PerfisUsuarios, {
    as: 'perfil_usuario',
    foreignKey: {
        name: 'id_perfil_usuario',
        allowNull: false,
        field: 'id_perfil_usuario'
    },
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});


Historico.belongsTo(Sinopse, {
    as: 'Sinopse',
    foreignKey: {
        name: 'id_sinopse',
        allowNull: false,
        field: 'id_sinopse'
    },
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});


export default Historico