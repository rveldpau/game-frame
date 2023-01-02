import React from "react";
import { Game } from "../game";
import "./GameList.scss";
import { GameTile } from "./GameTIle";

export type GameListProperties = {
    title: string,
    listGames:() => Promise<Game[]>
}
export function GameList({title, listGames}: GameListProperties){
    const [games, setGames] = React.useState<Game[]>([])
    const scrollerId = React.useRef<number>()
    const [scrollPosition, setScrollPosition] = React.useState<number>(0)
    const scroller = React.useRef<HTMLDivElement>();

    const scrollCancel = React.useCallback(() => {
        if(scrollerId.current){
            window.clearInterval(scrollerId.current);
        }
    }, [scrollerId]);

    const scrollLeft = React.useCallback(() => {
        if(!scroller.current) return;
        scrollerId.current = window.setInterval(() => {
            setScrollPosition(oldPosition => oldPosition > 20 ? oldPosition - 20 : 0)
        }, 100);
    }, [scroller]);
    const scrollRight = React.useCallback(() => {
        console.log("Scrolling right", scroller.current);
        if(!scroller.current) return;
        
        scrollerId.current = window.setInterval(() => {
            const maxScroll = scroller.current.scrollWidth - scroller.current.offsetWidth;
            setScrollPosition(oldPosition => oldPosition < maxScroll - 20 ? oldPosition + 20 : maxScroll)
        }, 100);
    }, [scroller]);
    React.useEffect(() => {
        listGames().then(setGames)
    }, [listGames])
    return <div className="game-list">
        <h2>{title}</h2>
        <div>
        <div className="game-list-scroller">
        <div className="controls">
            <button className="left" onMouseOver={scrollLeft} onMouseOut={scrollCancel}>◀</button>
            <button className="right" onMouseOver={scrollRight} onMouseOut={scrollCancel}>▶</button>
        </div>
        

        <div className="game-list-scroller-scrollable">
            <div className="game-list-games" style={{marginLeft: -scrollPosition}} ref={scroller}>
                { games.map(game => <GameTile key={game.id} game={game} />)}
            </div>

        </div>
    </div>
    </div>
    </div>
    
}