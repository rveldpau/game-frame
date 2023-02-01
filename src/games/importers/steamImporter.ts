import { Importer } from "./importer";
import { ImporterImpl, ImportResult } from "./importerImpl";
import {parse} from "@node-steam/vdf"
import { existsSync } from "original-fs";
import { ProgressiveUpdate } from "../../ipc/api";

export type SteamImportParameters = {
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
    async *import(params:SteamImporter["parameters"]): AsyncGenerator<ProgressiveUpdate<ImportResult>> {
        console.log("Starting steam import");
        for(let i=0;i<100;i++){
            console.log("i", i);
            await new Promise(r => setTimeout(r, 100));
            console.log("yield");
            yield {
                progress:i/100,
                final: false,
                data: { gameCount:0 }
            }
        }
        console.log("done");
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