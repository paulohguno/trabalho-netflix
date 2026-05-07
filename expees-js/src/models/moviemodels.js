import { sequealize } from "../config/index.js";
import { DataTypes } from "sequelize";


const Movie = sequealize.define(
    'Movie', 
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        poster: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        video_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    
);

export default Movie;