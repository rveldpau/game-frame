import { Game } from "../game"
import { System } from "../system";

import "./GameCard.scss";
import { GameMedia } from "./GameMedia";

export type GameCardProperties = {
    game: Game,
    system?: System
}
export function GameCard({game, system}: GameCardProperties){
    return <div className="game-card">
        <div className="content">
            <div className="name">
                {game.name}
            </div>
            <div className="year">
                {game.details?.year}
            </div>
            <div className="system">
                {system?.name}
            </div>
        </div>
        <div className="image">
            <GameMedia gameId={game.id} artTypes={["box","cart","logo","snapshot"]} />
        </div>        
        
    </div>
}