import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GameInput } from "../games/ui/GameInput";
import { Game } from "../games/game";
import { System } from "../games/system";
import { GameScroller } from "../games/ui/GameScroller";
import { APIContext } from "./APIContext";
import { NewGame } from "../games/ui/AddGame";
import { transform } from "lodash";
import { GameMedia } from "../games/ui/GameMedia";
import SimpleBar from "simplebar-react";

export function Home(){
    const api = useContext(APIContext);
    const [systems, setSystems] = React.useState<System[]>([]);
    const [gamesPerSystem, setGamesPerSystem] = React.useState<Record<System["id"],Game[]>>({});

    React.useEffect(() => {
        api.systems.list().then(setSystems);
    }, [api]);

    React.useEffect(() => {
        systems.reverse().forEach(system => {
            api.games.list({systemId:[system.id]}).then(games => {
                setGamesPerSystem(existing => ({
                    ...existing,
                    [system.id]: games
                }))
            })
        })
    }, [api, systems]);
    console.log("Systems", systems);

    return <div style={{perspective:"300px", height: "100%", overflow:"hidden"}}>
        <div style={{transform:"rotateY(-4deg)", "left": "-6%", "position": "relative", height: "100%"}}>
            <SimpleBar className="container content">
                {systems.map(system => <GameScroller key={system.id} title={system.name} games={gamesPerSystem[system.id] ?? []} />)}
            </SimpleBar>
        </div>

    </div>
}