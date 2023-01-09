import { Link } from "react-router-dom";
import { GameList } from "../games/ui/GameList";

export function Home(){
    return <div>
        <GameList title="DOS Games" />
        <GameList title="Arcade Games"/>
        <GameList title="N64 Games"/>
        <GameList title="NES Games"/>
    </div>
}