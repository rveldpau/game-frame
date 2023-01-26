import React from "react";
import { Game, GameWithArt } from "../../games/game";
import { GameMedia } from "./GameMedia";
import "./GameTile.scss";

export type GameTileProperties = {
    game: Game
}

export function GameTile({game}: GameTileProperties){
    const [launching, setLaunching] = React.useState<boolean>(false);
    const launch = React.useCallback(() => {
        (async () => {
            setLaunching(true);
            await window.api.games.launch( { game } );
            setLaunching(false);
        })();
    }, [game])
    return <a className="game-tile" tabIndex={1} onClick={launch}>
        <div className="game-tile-boxart">
            <GameMedia className="background" gameId={game.id} artTypes={["box", "snapshot"]} />
            <GameMedia className="box" gameId={game.id} artTypes={["cart","logo","snapshot"]} />
        </div>
        <div className="game-tile-title">
            {game.name}{launching && <> - Launching</>}
        </div>
    </a>

}