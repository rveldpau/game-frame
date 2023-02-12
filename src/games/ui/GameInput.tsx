import React from "react";
import { FileSelector } from "../../ui/components/inputs/FileSelector";
import { ChangeEvent, ChangeHandler } from "../../ui/components/inputs/ChangeHandler";
import { Field } from "../../ui/components/inputs/Field";
import { TextInput } from "../../ui/components/inputs/TextInput";
import { LauncherConfig } from "../../ui/config/launchers/LauncherConfig";
import { useFieldInputs } from "../../ui/utilities/FieldInputs";
import { Game, GameWithArt } from "../game";
import { APIContext } from "../../ui/APIContext";
import { GameDetailLookupResult } from "../detailsLookup/GameDetailLookup";
import { GameDetailsInput } from "./GameDetailsInput";
import { GameArtSelector } from "./GameArtSelector";
import { Select } from "../../ui/components/inputs/Select";
import { ContentLoader } from "../../ui/components/ContentLoader";
import { SystemSelect } from "./SystemSelect";
export type GameInputProperties = {
    game?: Partial<GameWithArt>,
    onChange?: ChangeHandler<Partial<GameWithArt>>

}
export function GameInput({game, onChange}: GameInputProperties){
    const api = React.useContext(APIContext);
    const fieldInputs = useFieldInputs({ value:game, onChange });
    const [ foundDetails, setFoundDetails ] = React.useState<GameDetailLookupResult[]>([])
    const onPathChange = React.useCallback((ev: ChangeEvent<string>) => {
        (async () => {
            const foundDetails = await api.games.lookupDetails({path: ev.value});
            console.log("Found Details", foundDetails);
            setFoundDetails(foundDetails);
            if(!game.name){
                handleNameChange({value: foundDetails.find(detail => detail.name)?.name})
            }
        })();
    }, [api])

    const handlePathChange = fieldInputs.useInputHandlerFor("path", { afterChange: onPathChange });
    const handleNameChange = fieldInputs.useInputHandlerFor("name");
    const handleSystemChange = fieldInputs.useInputHandlerFor("systemId");
    const handleDetailsChange = fieldInputs.useInputHandlerFor("details");
    const handleArtChange = fieldInputs.useInputHandlerFor("art");

    return <div className="system-editor">
        <Field label="System">
            <SystemSelect select="id" showInactive={true} onChange={handleSystemChange} value={game?.systemId} />
        </Field>
        <Field label="Game File">
            <FileSelector value={game?.path} onChange={handlePathChange} />
        </Field>
        <Field label="Name">
            <TextInput value={game?.name} onChange={handleNameChange} />
        </Field>
        <GameDetailsInput onChange={handleDetailsChange} foundDetails={foundDetails} details={game.details} />
        <GameArtSelector art={game.art} foundDetails={foundDetails} onChange={handleArtChange} />
    </div>
}