import { Importer } from "./importer";
import { ImporterImpl, ImportResult } from "./importerImpl";
import {parse} from "@node-steam/vdf"
import { readFile } from "fs/promises";
import { ProgressiveUpdate } from "../../ipc/api";
import { GameDetailsInput } from "../ui/GameDetailsInput";
import { System } from "../system";

type SteamRegistry = {
    Registry?: {
        HKCU?: {
            Software?: {
                [publisher:string]: {
                    [containerName:string]: {
                        apps: {
                            [steamId:string]:SteamApp
                        }
                    }
                }   
            }
        }
    }
}

type SteamApp = {
    Installed: 0 | 1,
    Updating: 0 | 1,
    Running: 0 |  1,
    name: string
}

export type SteamImportParameters = {
    systemId: System["id"],
    vdfFile: string
}
export type SteamImporter = Importer<"steam", SteamImportParameters>;

export class SteamImporterImpl extends ImporterImpl<SteamImporter>{
    get id(): "steam" {
        return "steam";
    }
    get name(): string {
        return "Steam";
    }
    async *import(params:SteamImporter["parameters"], handleFoundGame:Parameters<ImporterImpl["import"]>[1]): AsyncGenerator<ProgressiveUpdate<ImportResult>> {
        console.log("Starting steam import");
        const result = parse((await readFile(params.vdfFile)).toString()) as SteamRegistry;
        
        const apps = Object.entries(result?.Registry?.HKCU?.Software?.Valve?.Steam?.apps).map(([key,details]) => ({...details, id:key}));
        console.log("Import result", JSON.stringify(apps,undefined,4));
        let gamesAdded = 0
        for(let i=0;i<apps.length;i++){
            const app = apps[i];
            if(app.name){
                await handleFoundGame({
                    path: app.id,
                    name: app.name,
                    systemId: params.systemId
                });
            }
            yield {
                progress:i/apps.length,
                final: false,
                data: { gameCount:++gamesAdded }
            }
        }
        return {
            progress:1,
            final: true,
            data: { gameCount:0 }
        }
    }

    async validateParameters(params?: SteamImportParameters): Promise<string[]> {
        return params?.vdfFile ? [] : ["A VDF file must be specified"];
    }

}