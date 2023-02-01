import { SupportedLaunchers, SupportedLauncher } from "../games/launchers/launchers";
import { GameFilters, GamesDAO } from "../games/dataAccess/gamesDao";
import { SystemsDAO } from "../games/dataAccess/systemsDao";
import { GamesAPI, ImportAPI, IPCAPI, LaunchGameEvent } from "./api";
import {v4 as uuid} from "uuid";
import { GameDetailLookup } from "../games/detailsLookup/GameDetailLookup";
import { ImporterImpl } from "../games/importers/importerImpl";
import { AnyImporter, Importer } from "../games/importers/importer";
import { ImportManager } from "../games/importers/importManager";

export class BackendAPIImport implements ImportAPI{
    private readonly supportedImporters: Record<AnyImporter["id"], ImporterImpl>;
    constructor(
        private importManager: ImportManager
    ){
    }
    async list() {
        return this.importManager.list();
    }
    
    import(importer:Parameters<ImportAPI["import"]>[0]){
        return this.importManager.import(importer);
    }

    validate(importer:Parameters<ImportAPI["validate"]>[0]){
        return this.importManager.validate(importer);
    }

}