import { GameDetailLookup, GameDetailLookupResult } from "./GameDetailLookup"
import path from "path";
import { Game, GameArtInfo, GameWithArt } from "../game";
import { FileSystemUtil } from "../../backend/files/FileSystemUtil";

const localArtWorkMap: Record<keyof GameWithArt["art"], string[]> = {
    box: ["boxart", "boxfront"],
    cart: ["cartart", "cartridge"],
    logo: ["wheel", "wheelcarbon"],
    snapshot: ["snap", "screenshot"]
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
        const {dir, name} = path.parse(game.path)
    
        const typeMap: Partial<Record<keyof GameWithArt["art"], GameArtInfo | undefined>>[] = await Promise.all(Object.entries(localArtWorkMap).map(async ([type, folders]) => {
            const foundFiles: string[][] = await Promise.all(folders.map(async (folder) => {
                const regex = `${name.replace(/([(){}\[\].])/g, "\\$1")}\.[a-zA-Z0-9]+$`;
                const searchDir = `${dir}/${folder}`;
                return (await this.fs.listFiles(searchDir, {filter: new RegExp(regex)})).map(file => path.join(searchDir, file))
            }));
            const file = foundFiles.flat().shift();
            if(!file){
                return { [type]: undefined };
            }
            const mappedFile:GameArtInfo = {
                path: file,
                video: videoExtensions.some(ext => file.endsWith(ext))
            }
            return { [type]: mappedFile };
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