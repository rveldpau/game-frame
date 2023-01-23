import { GameDetailLookup, GameDetailLookupResult } from "./GameDetailLookup"
import path from "path";
import { Game, GameWithArt } from "../game";
import { FileSystemUtil } from "../../backend/files/FileSystemUtil";
import { faFolderClosed } from "@fortawesome/free-solid-svg-icons";
import { existsSync } from "original-fs";

const localArtWorkMap: Record<keyof GameWithArt["art"], string[]> = {
    box: ["boxart", "boxfront"],
    cart: ["cartart", "cartridge"],
    logo: ["wheel", "wheelcarbon"],
    snapshot: ["snap", "screenshot"],
    gameplayVideo: ["snap", "screenshot"]
}

const videoExtensions = ["mp4","avi"];

export class GameDetailLookupLocalArtwork extends GameDetailLookup {
    constructor(private readonly fs: FileSystemUtil){
        super();
    }
    async execute(game: Partial<Game>):Promise<GameDetailLookupResult> {
        if(!game.path){
            return { lookupSource: "local-artwork" };
        }
        const {dir, name:fileName} = path.parse(game.path);
        const mainSearchDir = this.locateSearchDir(dir);
        
        if(!mainSearchDir){
            console.log("No search dir found for", dir);
            return { lookupSource: "local-artwork" };
        }

        const name = fileName.replace(/\(.*?\)/g, "").trim();

        const knownNames = [name];

        if(dir !== mainSearchDir){
            knownNames.push(dir.split(path.sep).pop());
        }

        if(game.name){
            knownNames.push(game.name);
        }

        console.log("Looking for known names:", knownNames);
    
        const typeMap: Partial<Record<keyof GameWithArt["art"], string | undefined>>[] = await Promise.all(Object.entries(localArtWorkMap).map(async ([type, folders]) => {
            const foundFiles: string[][] = await Promise.all(folders.map(async (folder) => {
                const regexs = knownNames.map(name => `${name.replace(/([(){}\[\].])/g, "\\$1")}\(\\s\\(*[^)]*?\\))*.[a-zA-Z0-9]+$`) ;
                const searchDir = `${mainSearchDir}/${folder}`;
                if(!await this.fs.exists(searchDir)){
                    console.log("searchDir does not exist", searchDir);
                    return [];
                }
                console.log("searchDir exists", searchDir);
                return (await this.fs.listFiles(searchDir, {filter: regexs.map(regex => new RegExp(regex))}))
                    .map(file => path.join(searchDir, file))
                    .filter( type === "gameplayVideo" ? (file) => videoExtensions.some(ext => file.endsWith(ext)) : (file) => !videoExtensions.some(ext => file.endsWith(ext)))
            }));
            const file = foundFiles.flat().shift();
            if(!file){
                return { [type]: undefined };
            }
            return { [type]: file };
        }));

        return {
            lookupSource: "local-artwork",
            "art": typeMap.reduce((map, entry) => ({
                ...map,
                ...entry
            }), {} as GameWithArt["art"])
        }
    }

    private locateSearchDir(dir:string):string|undefined{
        const allFolders = Object.values(localArtWorkMap).flat();
        const pathParts = dir.split(path.sep);
        const prependSeparator = dir.startsWith(path.sep);
        const pathStart = prependSeparator ? "/":"";
        while(pathParts.length > 0){
            console.log(`Does ${pathParts.join(path.sep)} contain image folders (${allFolders.join(", ")})?`);
            if(allFolders.some(artFolder => {
                const checkPath = pathStart + path.join(...pathParts, artFolder);
                console.log("\tChecking for", checkPath)
                return existsSync(checkPath); 
            })){
                console.log(`\tYes`);
                return pathParts.join(path.sep);
            }
            console.log(`\tNo`);
            pathParts.pop();
        }
        return undefined;
    }
}