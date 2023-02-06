import { Game, GameWithArt } from "../../game";
import { GameArtwork, GameFilters, GamesDAO, GetGameOptions } from "../gamesDao";
import { v4 as uuid } from "uuid";
import { DataTypes, FindOptions, InferAttributes, InferCreationAttributes, Model, ModelAttributes, Op, Optional, Sequelize } from "sequelize";
import { SystemDataObject } from "./systemsDao.sqlite";
import { SystemsDAO } from "../systemsDao";
import { GameGenre, GameGenreDAO } from "../genresDao";

export class GenreDataObject extends Model<InferAttributes<GenreDataObject>, InferCreationAttributes<GenreDataObject>> {
    declare id: string;
    declare name: string;
    declare igdbId?: number;
}

type InferModelAttributes<TYPE extends Model> = ModelAttributes<TYPE, Optional<InferAttributes<TYPE, {
    omit: never;
}>, never>>

export const GameGenreDataObjectSequelizeModelTypes: InferModelAttributes<GenreDataObject> = {
    id: {
        type: DataTypes.STRING(32),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    igdbId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}

export class GameGenreDAOSqlLite extends GameGenreDAO {
    constructor(private readonly sqlize: Sequelize) {
        super();
    }

    async initialize(): Promise<void> {

    }

    async list(): Promise<GameGenre[]> {
        const findOptions:FindOptions<GenreDataObject> = {};
        findOptions.limit = 500;
        
        console.log("Find options are", findOptions);
        const genres = await GenreDataObject.findAll(findOptions);
        return genres.map(genre => ({
            ...genre.dataValues,
        }));
    }

    async create(genre: GameGenre): Promise<void> {
         await GenreDataObject.create({
            ...genre,
        });
    }
}

