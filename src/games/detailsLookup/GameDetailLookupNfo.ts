import { GameDetailLookup } from "./GameDetailLookup"
import path from "path";
import { readFile } from "fs/promises";
import {XMLParser} from "fast-xml-parser";
import { Game } from "../game";

export class GameDetailLookupNfo extends GameDetailLookup {
    async execute(game:Partial<Game>) {
        if(!game.path){
            return { lookupSource: "nfo" };
        }
        const {dir, name} = path.parse(game.path)
        const nfoFile = `${name}.nfo`;
        const fullPath = path.join(dir,nfoFile);
        console.log("Finding NFO file", fullPath);
    
        try {
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
            }
    
        }catch(e){
            console.log("Could not get NFO file", e);
        }
    }
    
}