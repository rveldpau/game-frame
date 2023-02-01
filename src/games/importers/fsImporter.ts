import { Importer } from "./importer";
import { ImporterImpl, ImportResult } from "./importerImpl";
import { parse, join } from "path";
import { ProgressiveUpdate } from "../../ipc/api";
import { GameDetailLookup} from "../../games/detailsLookup/GameDetailLookup";
import { FileSystemUtil } from "../../backend/files/FileSystemUtil";
import { GamesDAO } from "../dataAccess/gamesDao";
import { System } from "../system";

export type FileSystemImportParameters = {
    directory: string,
    extension: string,
    systemId: System["id"]
}
export type FileSystemImporter = Importer<"fs", FileSystemImportParameters>;

export class FileSystemImporterImpl extends ImporterImpl<FileSystemImporter>{
    constructor(
        private readonly fsUtils: FileSystemUtil, 
    ){
        super();
    }
    get id(): "fs" {
        return "fs";
    }
    get name(): string {
        return "Generic File System Importer";
    }
    async *import({directory, extension, systemId}:FileSystemImporter["parameters"], handleFoundGame:Parameters<ImporterImpl["import"]>[1]): AsyncGenerator<ProgressiveUpdate<ImportResult>> {
        console.log("Starting filesystem import");
        const files = await this.fsUtils.listFiles(directory, { filter: new RegExp(`\\.${extension}`)});
        let gamesAdded = 0;
        for(let i=0;i<files.length;i++){
            const currentFile = files[i];
            console.log("Processing " + currentFile);
            // const {name:fileName} = parse(currentFile);
            // console.log("File Name", fileName);
            // console.log("File Matches results", /^([^\[(]+).*?\.[a-zA-Z0-9]+$/.exec(fileName));
            const gameName = /^([^\[(]+).*?\.[a-zA-Z0-9]+$/.exec(currentFile)?.[1]?.replace(/[_]/g," ").trim();
            await handleFoundGame({
                path: join(directory,currentFile),
                name: gameName,
                systemId: systemId
            })
            yield {
                progress:i/files.length,
                final: false,
                data: { gameCount:++gamesAdded }
            }
        }
        console.log("done");
        return {
            progress:1,
            final: true,
            data: { gameCount:0 }
        }
    }

    async validateParameters(params?: FileSystemImportParameters): Promise<string[]> {
        return [ 
            params?.directory ? [] : ["A directory must be specified for the import"],
            params?.extension ? [] : ["An extension must be specified for the import"],
            params?.systemId ? [] : ["A system ID must be specified for this type of import"],
        ].flat();
    }

}