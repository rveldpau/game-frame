import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GameInput } from "../games/ui/GameInput";
import { Game } from "../games/game";
import { System } from "../games/system";
import { GameList } from "../games/ui/GameList";
import { APIContext } from "./APIContext";
import { NewGame } from "../games/ui/AddGame";

export function Home(){
    const api = useContext(APIContext);
    const [systems, setSystems] = React.useState<System[]>([]);
    const [gamesPerSystem, setGamesPerSystem] = React.useState<Record<System["id"],Game[]>>({});

    React.useEffect(() => {
        api.systems.list().then(setSystems);
    }, [api]);

    React.useEffect(() => {
        systems.forEach(system => {
            api.games.list({system:[system.id]}).then(games => {
                setGamesPerSystem(existing => ({
                    ...existing,
                    [system.id]: games
                }))
            })
        })
    }, [api, systems]);

    return <div>
        <NewGame />
        {/* {systems.map(system => gamesPerSystem[system.id]?.length > 0 && <GameList key={system.id} title={system.name} games={gamesPerSystem[system.id]} />)} */}
        
    </div>
}