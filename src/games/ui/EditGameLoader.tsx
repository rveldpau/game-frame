import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { APIContext } from "../../ui/APIContext";
import { ContentLoader } from "../../ui/components/ContentLoader";
import { Subscreen } from "../../ui/components/Subscreen";
import { Game, GameWithArt } from "../game";
import { EditGame } from "./EditGame";

export function EditGameLoader(){
    const {gameId} = useParams<{gameId:string}>();
    const api = React.useContext(APIContext);
    const navigate = useNavigate();
    const loadGame = React.useCallback(() => {
        console.log("Loading game", gameId);
        return api.games.get(gameId)
    }, [gameId, api]);
    
    const deleteGame = React.useCallback(async () => {
        console.log("Deleting game", gameId);
        await api.games.delete(gameId);
        
        navigate("..");
    }, [gameId, api, navigate]);

    return <Subscreen title="Games: Edit" primaryAction={{
        icon: faTrashCan,
        text: "Delete",
        onClick: deleteGame
    }}>
        <ContentLoader<GameWithArt> render={({data}) => {
            console.log("Game loaded", data);
            return <EditGame game={data} />
         }} load={loadGame} />
    </Subscreen>
}