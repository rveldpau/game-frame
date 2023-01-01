import { GameList } from "../games/ui/GameList"
import { MainMenu } from "./components/MainMenu"

export function Layout(){
    return <div className="container main">
        <MainMenu></MainMenu>
        <div className="container content">
            <GameList listGames={window.api.games.list} />
        </div>
    </div>
}