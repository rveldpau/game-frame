import { GameDetailLookup, GameDetailLookupResult } from "./GameDetailLookup"
import path from "path";
import { readFile } from "fs/promises";
import {XMLParser} from "fast-xml-parser";
import { Game } from "../game";
import { FileSystemUtil } from "../../backend/files/FileSystemUtil";

export class GameDetailLookupNfo extends GameDetailLookup {
    constructor(private readonly fsUtils: FileSystemUtil){
        super();
    }
    async execute(game:Partial<Game>) {
        if(!game.path){
            return [];
        }
        const {dir, name:fileName} = path.parse(game.path);
        const knownNames = [game.name, fileName]
            .filter(Boolean)
            .map(name => name.replace(/([\[]()-.!&])/g, "\\$1").trim() + ".*?\\.nfo");
        console.log("Looking for known name regexes; nfo", knownNames)
        const files = await this.fsUtils.listFiles(dir, {filter: 
            knownNames.map(name => new RegExp(name))
        });

        if(files.length === 0){
            return [];
        }

        const promiseResults = (await Promise.allSettled(files.map(async file => {
            const fullPath = path.join(dir,file);

            console.log("Using NFO file", fullPath);
            const fileContents = await readFile(fullPath);
            const details = await new XMLParser().parse(fileContents);
            return {
                lookupSource: "nfo",
                name: details.game.title,
                details: {
                    plot: details.game.plot,
                    publisher: details.game.publisher,
                    developer: details.game.developer,
                    genre: details.game.genre,
                    year: details.game.year,
                    maxPlayer: details.game.maxPlayer,
                }
            };
        })));
        const result = promiseResults.filter(result => result.status === "fulfilled").map(result => (result as PromiseFulfilledResult<GameDetailLookupResult>).value );
        return result;
        
    }
    
}