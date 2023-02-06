import { Sequelize } from "sequelize";
import { InstallDataObject, InstallDataObjectSequelizeModelTypes } from "../../../backend/install/installDao.sqlite";
import { GameDataObject, GameDataObjectSequelizeModelTypes, GameArtObject, GameArtObjectSequelizeModelTypes } from "./gamesDao.sqlite";
import { GameGenreDataObjectSequelizeModelTypes, GenreDataObject } from "./genreDao.sqlite";
import { SystemDataObject, SystemSequelizeModelTypes } from "./systemsDao.sqlite";


export async function configureSequelize(sequelize: Sequelize): Promise<void> {
    InstallDataObject.init(InstallDataObjectSequelizeModelTypes,
        {
            sequelize: sequelize,
            timestamps: true
        }
    )

    SystemDataObject.init(SystemSequelizeModelTypes,
        {
            sequelize: sequelize,
            timestamps: true
        }
    );

    GenreDataObject.init(GameGenreDataObjectSequelizeModelTypes,
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
    await sequelize.sync();
}
