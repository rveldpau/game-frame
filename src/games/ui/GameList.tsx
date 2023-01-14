import React from "react";
import { APIContext } from "../../ui/APIContext";
import { HorizontalScroller } from "../../ui/components/HorizontalScroller";
import { GameFilters } from "../dataAccess/gamesDao";
import { Game } from "../game";
import "./GameList.scss";
import { GameTile } from "./GameTIle";

export type GameListProperties = {
    title: string,
    games: Game[]
}
export function GameList({title, games}: GameListProperties){
    return <div className="game-list">
        <h2>{title}</h2>
        <HorizontalScroller>
            <div className="game-list-games">
            { games.map(game => <GameTile key={game.id} game={game} />)}
            </div>
        </HorizontalScroller>
    </div>
}