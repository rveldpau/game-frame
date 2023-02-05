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
import { SteamImporterImpl } from "../games/importers/steamImporter";
import { FileSystemImporterImpl } from "../games/importers/fsImporter";
import { GameDetailLookupIGDB } from "../games/detailsLookup/GameDetailLookupIGDB";
import { IGDBAPIImpl } from "./igdb/IGDBApi";
import { authorizeIGDB } from "./igdb/IGDBAuth";

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
      new GameDetailLookupNfo(fs),
      new GameDetailLookupLocalArtwork(fs),
      new GameDetailLookupIGDB(new IGDBAPIImpl(authorizeIGDB))
    ]

    const importers = [
      new SteamImporterImpl(),
      new FileSystemImporterImpl(fs)
    ]

    await Promise.all(Object.values(daos).map(dao => dao.initialize()));

    createBackendAPI({ipcMain, detailLookups, importers,  ...daos});
    return daos;
}