import { Game } from "../../game";
import { GamesDAO } from "../gamesDao";
import {v4 as uuid} from "uuid";
import { DataTypes, InferAttributes, InferCreationAttributes, Model, ModelAttributes, Optional, Sequelize } from "sequelize";
import { System } from "../../system";
import { SystemsDAO } from "../systemsDao";
import { GameDataObject } from "./gamesDao.sqlite";
import { Launcher } from "../../../games/launchers/launcher";
import { SupportedLauncher } from "../../../games/launchers/launchers";

export class SystemDataObject extends Model<InferAttributes<SystemDataObject>, InferCreationAttributes<SystemDataObject>> {
    declare id: string;
    declare name: string;
    declare defaultLauncherId: SupportedLauncher["id"];
    declare defaultLauncherConfig?: SupportedLauncher["config"];
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
    },
    defaultLauncherId: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    defaultLauncherConfig: {
        type: DataTypes.JSON
    }
}

export class SystemsDAOSqlLite extends SystemsDAO {
    constructor(private readonly sqlize:Sequelize){
        super();
    }

    async initialize(): Promise<void> {
    }

    async list(): Promise<System[]> {
        const systems = await SystemDataObject.findAll();
        return systems.map(game => game.dataValues).map(game => ({
            ...game,
            defaultLauncher: {
                id: game.defaultLauncherId as SupportedLauncher["id"],
                config: game.defaultLauncherConfig
            }
        }));
    }

    async get(id:System["id"]): Promise<System> {
        const system = await SystemDataObject.findOne({ where: { id }})
        return {
            ...system,
            defaultLauncher: {
                id: system.defaultLauncherId,
                config: system.defaultLauncherConfig
            }
        }
    }

    async create(systemToCreate: System): Promise<void> {
        await SystemDataObject.create({
            ...systemToCreate,
            defaultLauncherId: systemToCreate.defaultLauncher.id,
            defaultLauncherConfig: systemToCreate.defaultLauncher.config ? JSON.stringify(systemToCreate.defaultLauncher.config) : undefined
        });
    }
    

}