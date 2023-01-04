import React from "react";
import { HorizontalScroller } from "../../ui/components/HorizontalScroller";
import { Game } from "../game";
import "./GameList.scss";
import { GameTile } from "./GameTIle";

export type GameListProperties = {
    title: string,
    listGames:() => Promise<Game[]>
}
export function GameList({title, listGames}: GameListProperties){
    const [games, setGames] = React.useState<Game[]>([])

    React.useEffect(() => {
        listGames().then(setGames)
    }, [listGames])
    return <div className="game-list">
        <h2>{title}</h2>
        <HorizontalScroller>
            <div className="game-list-games">
            { games.map((game, index) => <GameTile key={game.id} game={game} />)}
            </div>
        </HorizontalScroller>
    </div>
}