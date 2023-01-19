import { GameDetailLookup, GameDetailLookupResult } from "./GameDetailLookup"
import path from "path";
import { Game, GameWithArt } from "../game";
import { FileSystemUtil } from "../../backend/files/FileSystemUtil";

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
        const {dir, name:fileName} = path.parse(game.path)
        const name = fileName.replace(/\(.*?\)/g, "").trim();
    
        const typeMap: Partial<Record<keyof GameWithArt["art"], string | undefined>>[] = await Promise.all(Object.entries(localArtWorkMap).map(async ([type, folders]) => {
            const foundFiles: string[][] = await Promise.all(folders.map(async (folder) => {
                const regex = `${name.replace(/([(){}\[\].])/g, "\\$1")}\(\\s\\(*[^)]*?\\))*.[a-zA-Z0-9]+$`;
                console.log("Regex is", regex);
                const searchDir = `${dir}/${folder}`;
                if(!await this.fs.exists(searchDir)){
                    console.log("searchDir does not exist", searchDir);
                    return [];
                }
                console.log("searchDir exists", searchDir);
                return (await this.fs.listFiles(searchDir, {filter: new RegExp(regex)}))
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
}