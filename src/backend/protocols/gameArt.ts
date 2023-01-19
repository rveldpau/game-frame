import { GamesDAO } from "../../games/dataAccess/gamesDao";
import { GameWithArt } from "../../games/game";
import { FileProtocol } from "./types";
import url from "url";

export const generateArtworkProtocol: (gamesDAO: GamesDAO) => FileProtocol = (gamesDAO) => async (request, callback) => {
    const [gameId, artTypes]:[GameWithArt["id"], string] = 
        request.url.split("://", 2).pop().split("/") as [GameWithArt["id"], string];

    const splitArtTypes = artTypes.split(";") as (keyof GameWithArt["art"])[];
    console.log("Finding art for", gameId, splitArtTypes);
    for(let i=0;i<splitArtTypes.length;i++){
      const artPath = await gamesDAO.getArt(gameId, splitArtTypes[i]);
      if(artPath){
        console.log("Art Path is", artPath.path);
        const filePath = url.fileURLToPath('file://' + artPath.path)
        callback(filePath)
        return;
      }
    }
    
    callback({
      statusCode: 404
    });
  };