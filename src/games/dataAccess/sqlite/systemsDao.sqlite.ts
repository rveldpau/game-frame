import { Game } from "../../game";
import { GamesDAO } from "../gamesDao";
import {v4 as uuid} from "uuid";
import { DataTypes, InferAttributes, InferCreationAttributes, Model, ModelAttributes, Optional, Sequelize } from "sequelize";
import { System } from "../../system";
import { SystemsDAO } from "../systemsDao";
import { GameDataObject } from "./gamesDao.sqlite";

export class SystemDataObject extends Model<InferAttributes<SystemDataObject>, InferCreationAttributes<SystemDataObject>> {
    declare id: string;
    declare name: string;
}

type InferModelAttributes<TYPE extends Model> = ModelAttributes<TYPE, Optional<InferAttributes<TYPE, {
    omit: never;
}>, never>>

export const SystemSequelizeModelTypes:InferModelAttributes<SystemDataObject> = {
    id: {
        type: DataTypes.STRING(32),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}

export class SystemsDAOSqlLite extends SystemsDAO {
    constructor(private readonly sqlize:Sequelize){
        super();
    }

    async initialize(): Promise<void> {
    }

    async list(): Promise<System[]> {
        const games = await SystemDataObject.findAll();
        return games.map(game => game.dataValues);
    }

    async create(systemToCreate: System): Promise<void> {
        await SystemDataObject.create(systemToCreate);
    }
    

}