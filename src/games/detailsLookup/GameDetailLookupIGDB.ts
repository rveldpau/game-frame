import { GameDetailLookup, GameDetailLookupResult } from "./GameDetailLookup"
import path from "path";
import { Game, GameWithArt } from "../game";
import { FileSystemUtil } from "../../backend/files/FileSystemUtil";
import { faFolderClosed } from "@fortawesome/free-solid-svg-icons";
import { existsSync } from "original-fs";
import { OAuth2Client, OAuthAccessToken } from "../../backend/oauth/oauth";
import { OAuthWindow } from "../../backend/oauth/oauthWindow";
import { IGDBApi } from "../../backend/igdb/IGDBApi";

export class GameDetailLookupIGDB extends GameDetailLookup {
    constructor(private readonly igdbAPI: IGDBApi){
        super();
    }
    async execute(game: Partial<Game>):Promise<GameDetailLookupResult[]> {
        console.log("GAME", game);
        const {dir, name:fileName} = path.parse(game.path);
        const gameName = /^([^\[(]+).*?(\.[a-zA-Z0-9]+)?$/.exec(fileName)?.[1]?.replace(/[_]/g," ").trim();
        const possibleNames = [gameName, game.name, fileName]
            .filter(Boolean)
            .map(name => name.trim());

        if(!possibleNames[0]){
            return [];
        }
        const result = await this.igdbAPI.findGame({search: possibleNames[0], fields: [ "name", "storyline", "summary", "first_release_date", "artworks" ]})
        return result.map(foundGame => ({
                lookupSource: "igdb",
                name: foundGame.name,
                details: {
                    plot: foundGame.storyline ?? foundGame.summary,
                    year: foundGame.first_release_date && new Date(foundGame.first_release_date * 1000).getFullYear()
                }
        }))
    }
}