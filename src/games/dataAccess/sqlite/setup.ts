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
            timestamps: true,
            
        }
    );
    GameArtObject.init(GameArtObjectSequelizeModelTypes,
        {
            sequelize: sequelize,
            timestamps: true
        }
    );

    // GameArtObject.belongsTo(GameDataObject, {
    //     foreignKey: {
    //         field: "gameId"
    //     },
    //     onDelete: "cascade"

    // });
    
    //GameDataObject.hasMany(GameArtObject);
    // GameDataObject.belongsTo(SystemDataObject, {
    //     foreignKey: {
    //         field: "systemId"
    //     },
    //     onDelete: "cascade"
    // });
    //SystemDataObject.hasMany(GameDataObject);

    await sequelize.sync();
}
