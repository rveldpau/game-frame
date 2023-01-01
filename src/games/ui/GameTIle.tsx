import React from "react";
import { Game } from "../../games/game";
import { IPCAPIHelpers, LaunchGameEvent } from "../../ipc/api";

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
    return <div className="game">
        {game.images?.box && <img src={`img://${game.id}/box`} />}
        <a onClick={launch}>{game.name}{launching && <> - Launching</>}</a>
    </div>

}