import React from "react";
import { Game } from "../../games/game";
import { IPCAPIHelpers, LaunchGameEvent } from "../../ipc/api";
import "./GameTile.scss";

export type GameTileProperties = {
    game: Game
}

export function GameTile({game}: GameTileProperties){
    const [launching, setLaunching] = React.useState<boolean>(false);
    const launch = React.useCallback(() => {
        (async () => {
            setLaunching(true);
            await window.api.games.launch(
                IPCAPIHelpers.wrapEventDetails<LaunchGameEvent>("launchGame",
                    { game }
                )
            );
            setLaunching(false);
        })();
    }, [game])
    return <div className="game-tile">
        <div className="game-tile-boxart">
            {game.images?.box && <img className="background" src={`img://${game.id}/box`} />}
            {game.images?.box && <img src={`img://${game.id}/box`} />}
        </div>
        <div className="game-tile-title">
            <a onClick={launch}>{game.name}{launching && <> - Launching</>}</a>
        </div>
    </div>

}