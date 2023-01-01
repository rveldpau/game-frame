import { Game } from "../../game";
import { GamesDAO } from "../gamesDao";
import {v4 as uuid} from "uuid";
import { DataTypes, InferAttributes, InferCreationAttributes, Model, ModelAttributes, Optional, Sequelize } from "sequelize";
import { SystemDataObject } from "./systemsDao.sqlite";
import { SystemsDAO } from "../systemsDao";

export class GameDataObject extends Model<InferAttributes<GameDataObject>, InferCreationAttributes<GameDataObject>> {
    declare id: string;
    declare name: string;
    declare path: string;
    declare systemId: string;
    declare image_box: string
}

type InferModelAttributes<TYPE extends Model> = ModelAttributes<TYPE, Optional<InferAttributes<TYPE, {
    omit: never;
}>, never>>

export const GameDataObjectSequelizeModelTypes:InferModelAttributes<GameDataObject> = {
    id: {
        type: DataTypes.STRING(32),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    path: {
        type: DataTypes.STRING(1024),
        allowNull: false
    },
    image_box: {
        type: DataTypes.STRING(1024),
        allowNull: true
    },
    systemId: {
        type: DataTypes.STRING(32),
        references: {
            model: SystemDataObject,
            key: "id"
        }
    }
}

export class GamesDAOSqlLite extends GamesDAO {

    constructor(private readonly sqlize:Sequelize){
        super();
    }

    async initialize(): Promise<void> {

    }

    async list(): Promise<Game[]> {
        const games = await GameDataObject.findAll();
        return games.map(game => ({
            ...game.dataValues,
            images: {
                box: game.image_box
            }
        }));
    }

    async create(gameToCreate: Game): Promise<void> {
        await GameDataObject.create({
            ...gameToCreate,
            image_box: gameToCreate.images?.box
        });
    }

    async get(gameId: string): Promise<Game|undefined> {
        const foundGame = await GameDataObject.findOne({where: {id: gameId}})
        if(!foundGame){ return; }
        return {
            ...foundGame.dataValues,
            images: {
                box: foundGame.image_box
            }
        }
    }
    

}