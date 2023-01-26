import { Game } from "../game"
import { System } from "../system";

import "./GameCard.scss";
import { GameMedia } from "./GameMedia";

export type GameCardProperties = {
    game: Game,
    system?: System,
    onClick?: (event: {game:Game}) => void
}
export function GameCard({game, system, onClick}: GameCardProperties){
    return <div className={`game-card ${onClick ? "has-click" : "no-click"}`} onClick={()=>onClick({game})}>
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
            <GameMedia gameId={game.id} artTypes={["cart", "box" ,"logo", "snapshot"]} />
        </div>        
        
    </div>
}