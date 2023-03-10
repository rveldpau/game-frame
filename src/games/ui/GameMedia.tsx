import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { NoArt } from "../../ui/components/NoArt"
import { Game, GameWithArt } from "../game"

export type GameMediaProps = {
    artTypes: (keyof GameWithArt["art"])[]
    gameId: Game["id"]
    className?: string
}
export function GameMedia({artTypes, gameId, className}:GameMediaProps){
    const [error, setError] = React.useState<unknown>(false);
    if(artTypes.length > 1 && artTypes.includes("gameplayVideo")){
        throw new Error("You can't mix 'gameplayVideo' with other types");
    }

    if(error){
        return <NoArt className={className} />
    }
    else if(artTypes[0] === "gameplayVideo"){
        return <video className={className} src={`artwork://${gameId}/${artTypes.join(";")}`} onError={setError} />
    } else {
        return <img className={className} src={`artwork://${gameId}/${artTypes.join(";")}`} onError={setError} />
    }
}