import { Link } from "react-router-dom";
import { GameList } from "../games/ui/GameList";

export function Home(){
    return <div>
        <GameList title="DOS Games" listGames={window.api.games.list} />
        <GameList title="Arcade Games" listGames={window.api.games.list} />
        <GameList title="N64 Games" listGames={window.api.games.list} />
        <GameList title="NES Games" listGames={window.api.games.list} />
    </div>
}