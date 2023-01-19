import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { ContentLoader, ContentLoaderProperties, ContentLoaderRendererProps } from "../../ui/components/ContentLoader";
import { APIContext } from "../../ui/APIContext";
import { Action } from "../../ui/components/MenuItem";
import { Subscreen } from "../../ui/components/Subscreen";
import { Game } from "../game";
import { GameTile } from "./GameTIle";
import { GameCard } from "./GameCard";

import "./GamesCatalog.scss";
import { System } from "../system";

function GameList({data}: ContentLoaderRendererProps<{games:Game[], systems:System[]},{createAction:Action}>){
    const {games, systems} = data;
    return <div className="game-list">
        {games.map(game => <GameCard key={game.id} game={game} system={systems.find(system => system.id === game.systemId)} />)}
    </div>
}

export function GamesCatalog(){
    const createAction:Action = {
        text: "Add Game",
        icon: faPlus,
        to: "new"
    }

    const api = React.useContext(APIContext);

    return <Subscreen title="Games" backLinkTo="/" primaryAction={createAction}>
        <ContentLoader load={async () => {
            return { games: await api.games.list(), systems: await api.systems.list() }
        }} render={GameList} createAction={createAction} />
    </Subscreen>
}