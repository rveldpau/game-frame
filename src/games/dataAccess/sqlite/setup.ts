import { Sequelize } from "sequelize";
import { GameDataObject, GameDataObjectSequelizeModelTypes, GameArtObject, GameArtObjectSequelizeModelTypes } from "./gamesDao.sqlite";
import { SystemDataObject, SystemSequelizeModelTypes } from "./systemsDao.sqlite";


export async function configureSequelize(sequelize:Sequelize):Promise<void>{
    SystemDataObject.init(SystemSequelizeModelTypes,
        {
            sequelize: sequelize,
            timestamps: true
        }
    );
    
    GameDataObject.init(GameDataObjectSequelizeModelTypes,
        {
            sequelize: sequelize,
            timestamps: true
        }
    );
    GameArtObject.init(GameArtObjectSequelizeModelTypes,
        {
            sequelize: sequelize,
            timestamps: true
        }
    );
    // Don't connect like this yet; not sure how helpful it will be
    // GameDataObject.belongsTo(SystemDataObject);
    // SystemDataObject.hasMany(GameDataObject);

    await sequelize.sync();
}
