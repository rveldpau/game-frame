import { createBackendAPI } from "../ipc/backend";
import { GamesDAO } from "../games/dataAccess/gamesDao";
import { BrowserWindow, ipcMain } from "electron";
import { Sequelize } from "sequelize";
import { GamesDAOSqlLite } from "../games/dataAccess/sqlite/gamesDao.sqlite";
import { SystemsDAOSqlLite } from "../games/dataAccess/sqlite/systemsDao.sqlite";
import { configureSequelize } from "../games/dataAccess/sqlite/setup";
import { SystemsDAO } from "../games/dataAccess/systemsDao";
import { GameDetailLookupNfo } from "../games/detailsLookup/GameDetailLookupNfo";
import { GameDetailLookupLocalArtwork } from "../games/detailsLookup/GameDetailLookupLocalArt";
import { FileSystemUtil } from "./files/FileSystemUtil";

export async function configure():Promise<{systemsDAO:SystemsDAO, gamesDAO:GamesDAO}>{
    const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: "./game-frame.db"
    })

    const fs = new FileSystemUtil();

    await configureSequelize(sequelize);

    const daos = {
      systemsDAO: new SystemsDAOSqlLite(sequelize),
      gamesDAO: new GamesDAOSqlLite(sequelize)
    }

    const detailLookups = [
      new GameDetailLookupNfo(),
      new GameDetailLookupLocalArtwork(fs)
    ]

    await Promise.all(Object.values(daos).map(dao => dao.initialize()));

    createBackendAPI({ipcMain, detailLookups,  ...daos});
    return daos;
}