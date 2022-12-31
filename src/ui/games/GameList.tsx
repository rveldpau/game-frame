import React from "react";
import { Game } from "../../games/game";
import { GameTile } from "./GameTIle";

export type GameListProperties = {
    listGames:() => Promise<Game[]>
}
export function GameList({listGames}: GameListProperties){
    const [games, setGames] = React.useState<Game[]>([])
    React.useEffect(() => {
        listGames().then(setGames)
    }, [listGames])
    return <div className="game-list">
        { games.map(game => <GameTile key={game.id} game={game} />)}
    </div>
}