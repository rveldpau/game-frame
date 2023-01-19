import { GamesDAO } from "../../games/dataAccess/gamesDao";
import { GameWithArt } from "../../games/game";
import { FileProtocol } from "./types";
import url from "url";

const mediaFileTypes = [".jpg",".gif",".png",".mp4"];

export const generateMediaProtocol: () => FileProtocol = () => async (request, callback) => {
    const requestUrl = request.url.split("://", 2).pop();
    if(!mediaFileTypes.some(type => requestUrl.toLowerCase().endsWith(type))){
      callback({
        statusCode: 404
      });
    }
    console.log("Getting file", requestUrl);

    const filePath = url.fileURLToPath('file://' + requestUrl)
    callback(filePath)
  };