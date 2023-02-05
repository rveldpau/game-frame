import { merge } from "lodash";
import { GamesDAO } from "../dataAccess/gamesDao";
import { SystemsDAO } from "../dataAccess/systemsDao";
import { GameDetailLookup, GameDetailLookupResult } from "../detailsLookup/GameDetailLookup";
import { GameWithArt } from "../game";
import { AnyImporter } from "./importer";
import { ImporterImpl } from "./importerImpl";
import {v4 as uuid} from "uuid";

export class ImportManager {
    private readonly supportedImporters: Record<AnyImporter["id"], ImporterImpl>;

    constructor(
        private gamesDAO: GamesDAO,
        private systemsDAO: SystemsDAO,
        private readonly detailLookups: GameDetailLookup[],
        private readonly importers: ImporterImpl[]
    ){
        this.supportedImporters = importers.reduce((map, importer) => ({
            ...map,
            [importer.id]: importer
        }), {})
    }

    async list() {
        return this.importers.map(imp => ({id:imp.id, name:imp.name}));
    }

    import({id, parameters}:AnyImporter){
        console.log("Selecting importer", id, Object.keys(this.supportedImporters));
        const importer = this.supportedImporters[id];
        return importer.import(parameters, (game) => this.processImportedGame(game));
    }

    async validate({id, parameters}:AnyImporter){
        const importer = this.supportedImporters[id];
        return await importer.validateParameters(parameters);
    }

    private async processImportedGame(game:Partial<GameWithArt>):Promise<void>{
        if((await this.gamesDAO.list({path: game.path})).length > 0){
            console.log("Game already imported", game.path);
            return;
        }
        console.log("Handling", game);
        const foundDetails = ((await Promise.allSettled(this.detailLookups.map(lookup => lookup.execute(game))))
            .filter(result => result.status === "fulfilled") as PromiseFulfilledResult<GameDetailLookupResult[]>[])
            .map(result => result.status === "fulfilled" && result.value)
            .flat();
        const finalDetails = foundDetails.reduce((finalDetails, details) => merge(finalDetails, details), game);
        finalDetails.id = uuid();
        console.log(`Will add: ${JSON.stringify(finalDetails,undefined, 4)}`)
        this.gamesDAO.create(finalDetails as GameWithArt);
    }
}