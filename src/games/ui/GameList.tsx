import React from "react";
import { APIContext } from "../../ui/APIContext";
import { HorizontalScroller } from "../../ui/components/HorizontalScroller";
import { Game } from "../game";
import "./GameList.scss";
import { GameTile } from "./GameTIle";

export type GameListProperties = {
    title: string,
}
export function GameList({title}: GameListProperties){
    const [games, setGames] = React.useState<Game[]>([])
    const apiContext = React.useContext(APIContext);

    React.useEffect(() => {
        apiContext.games.list().then(setGames)
    }, [apiContext])
    return <div className="game-list">
        <h2>{title}</h2>
        <HorizontalScroller>
            <div className="game-list-games">
            { games.map((game, index) => <GameTile key={game.id} game={game} />)}
            </div>
        </HorizontalScroller>
    </div>
}