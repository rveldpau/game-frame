import { faFolderPlus, faPlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { ContentLoader, ContentLoaderProperties, ContentLoaderRendererProps } from "../../ui/components/ContentLoader";
import { APIContext } from "../../ui/APIContext";
import { Action } from "../../ui/components/MenuItem";
import { Subscreen } from "../../ui/components/Subscreen";
import { Game } from "../game";
import { GameTile } from "./GameTIle";
import { GameCard } from "./GameCard";
import { useNavigate } from "react-router-dom";

import "./GamesCatalog.scss";
import { System } from "../system";
import { TextInput } from "../../ui/components/inputs/TextInput";
import { useInputStateManager } from "../../ui/utilities/InputStateManager";
import { useFieldInputs } from "../../ui/utilities/FieldInputs";
import { GameFilters } from "../dataAccess/gamesDao";

function GameList({data}: ContentLoaderRendererProps<{games:Game[], systems:System[]}>){
    const {games, systems} = data;
    const navigate = useNavigate();
    const handleClick = React.useCallback(({game}:{game:Game}) => {
        navigate(game.id);
    },[useNavigate])
    return <div className="game-list">
        {games.map(game => <GameCard key={game.id} game={game} system={systems.find(system => system.id === game.systemId)} onClick={handleClick} />)}
    </div>
}

export function GamesCatalog(){
    const createAction:Action = {
        text: "Add Game",
        icon: faPlus,
        to: "new"
    }

    const importAction:Action = {
        text: "Import",
        icon: faFolderPlus,
        to: "import"
    }

    const api = React.useContext(APIContext);

    const filters = useInputStateManager<GameFilters>({});
    const filterInputHandler = useFieldInputs<Partial<GameFilters>>({ onChange:filters.handleChange, value: filters.value })

    const dataLoader = React.useCallback(async () => {
        console.log("Loading data");
        return { games: await api.games.list(filters.value), systems: await api.systems.list() }
    }, [filters.value]);

    return <Subscreen title="Games" backLinkTo="/" primaryAction={createAction} secondaryAction={importAction}>
        <div className="game-search">
            <div className="query">
                <TextInput onChange={filterInputHandler.useInputHandlerFor("query")} value={filters.value.query} />
            </div>
        
        </div>
        
        <ContentLoader<{games:Game[], systems:System[]}> load={dataLoader} render={GameList} />
    </Subscreen>
}