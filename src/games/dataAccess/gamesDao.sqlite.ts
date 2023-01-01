import { Game } from "../game";
import { GamesDAO } from "./gamesDao";
import { Database } from "sqlite3";
import { DataTypes, InferAttributes, InferCreationAttributes, Model, ModelAttributes, Optional, Sequelize } from "sequelize";

class GameDataObject extends Model<InferAttributes<GameDataObject>, InferCreationAttributes<GameDataObject>> {
    declare id: string;
    declare name: string;
    declare path: string;
}

type InferModelAttributes<TYPE extends Model> = ModelAttributes<TYPE, Optional<InferAttributes<TYPE, {
    omit: never;
}>, never>>

const SequelizeModelTypes:InferModelAttributes<GameDataObject> = {
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
    }
}

export class GamesDAOSqlLite extends GamesDAO {
    constructor(private readonly sqlize:Sequelize){
        super();
    }

    async initialize(): Promise<void> {
        GameDataObject.init(SequelizeModelTypes,
            {
                sequelize: this.sqlize,
                tableName: "Games"
            }
        )
    }

    async list(): Promise<Game[]> {
        return [];
    }
    create(gameToCreate: Game): Promise<void> {
        throw new Error("Method not implemented.");
    }
    

}