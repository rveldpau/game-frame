import { Game, GameWithArt } from "../../game";
import { GameArtwork, GameFilters, GamesDAO, GetGameOptions } from "../gamesDao";
import { v4 as uuid } from "uuid";
import { DataTypes, InferAttributes, InferCreationAttributes, Model, ModelAttributes, Optional, Sequelize } from "sequelize";
import { SystemDataObject } from "./systemsDao.sqlite";
import { SystemsDAO } from "../systemsDao";

export class GameDataObject extends Model<InferAttributes<GameDataObject>, InferCreationAttributes<GameDataObject>> {
    declare id: string;
    declare name: string;
    declare path: string;
    declare systemId: string;
    declare plot: string;
    declare publisher: string;
    declare developer: string;
    declare genre: string;
}

export class GameArtObject extends Model<InferAttributes<GameArtObject>, InferCreationAttributes<GameArtObject>> {
    declare gameId: string;
    declare type: keyof GameWithArt["art"];
    declare isVideo: boolean;
    declare path: string;
}

type InferModelAttributes<TYPE extends Model> = ModelAttributes<TYPE, Optional<InferAttributes<TYPE, {
    omit: never;
}>, never>>

export const GameDataObjectSequelizeModelTypes: InferModelAttributes<GameDataObject> = {
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
    plot: {
        type: DataTypes.STRING(1024),
        allowNull: true
    },
    developer: {
        type: DataTypes.STRING(1024),
        allowNull: true
    },
    genre: {
        type: DataTypes.STRING(1024),
        allowNull: true
    },
    publisher: {
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

export const GameArtObjectSequelizeModelTypes: InferModelAttributes<GameArtObject> = {
    gameId: {
        type: DataTypes.STRING(32),
        primaryKey: true,
        references: {
            model: GameDataObject,
            key: "id"
        }
    },
    type: {
        type: DataTypes.STRING(255),
        primaryKey: true
    },
    path: {
        type: DataTypes.STRING(1024),
        allowNull: false
    },
    isVideo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}

export class GamesDAOSqlLite extends GamesDAO {
    constructor(private readonly sqlize: Sequelize) {
        super();
    }

    async initialize(): Promise<void> {

    }

    async list(filters?: GameFilters): Promise<Game[]> {
        const games = await GameDataObject.findAll({
            where: {
                systemId: filters?.system
            },
            limit: 20
        });
        return games.map(game => ({
            ...game.dataValues,
            details: this.mapDetails(game)
        }));
    }

    async create(gameToCreate: Game | GameWithArt): Promise<void> {
        await GameDataObject.create({
            ...gameToCreate,
        });

        const gameArt = (gameToCreate as GameWithArt).art;
        if(gameArt){
            await Promise.all(Object.entries(gameArt).map(([type, dets]) => 
                this.setArt({
                    gameId: gameToCreate.id,
                    type: type as GameArtwork["type"],
                    isVideo: dets.video,
                    path: dets.path
                })
            ))
        }
    }

    async get(gameId: string, options: GetGameOptions): Promise<Game | undefined> {
        const foundGame = await GameDataObject.findOne({ where: { id: gameId } })
        if (!foundGame) { return; }
        const game = {
            ...foundGame.dataValues,
            details: this.mapDetails(foundGame)
        }

        if(!options?.withArt){
            return game;
        }

        const artWorks = await GameArtObject.findAll({
            where: {
                gameId
            }
        });

        artWorks.reduce((game, artWork) => ({
            ...game,
            art: {
                ...game.art,
                [artWork.type]: artWork.path
            }
        }), { ...game, art: {}} as GameWithArt)
        
    }

    async getArt(gameId: Game["id"], type: keyof GameWithArt["art"]): Promise<GameArtwork|undefined> {
        return (await GameArtObject.findOne({
            where: {
                gameId, type
            }
        })).dataValues;
    }

    async setArt(artwork: GameArtwork): Promise<void> {
        await GameArtObject.upsert(artwork);
    }

    private mapDetails(lookup:GameDataObject):Game["details"] {
        return {
            developer: lookup.developer,
            genre: lookup.genre,
            plot: lookup.plot,
            publisher: lookup.publisher
        }
    }
}

