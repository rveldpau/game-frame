import React from "react";
import { FileSelector } from "../../ui/components/inputs/FileSelector";
import { ChangeEvent, ChangeHandler } from "../../ui/components/inputs/ChangeHandler";
import { Field } from "../../ui/components/inputs/Field";
import { TextInput } from "../../ui/components/inputs/TextInput";
import { LauncherConfig } from "../../ui/config/launchers/LauncherConfig";
import { useFieldInputs } from "../../ui/utilities/FieldInputs";
import { Game } from "../game";
import { APIContext } from "../../ui/APIContext";
import { GameDetailLookupResult } from "../detailsLookup/GameDetailLookup";
export type GameInputProperties = {
    game?: Partial<Game>,
    onChange?: ChangeHandler<Partial<Game>>

}
export function GameInput({game, onChange}: GameInputProperties){
    const api = React.useContext(APIContext);
    const fieldInputs = useFieldInputs({ value:game, onChange });
    const [ foundDetails, setFoundDetails ] = React.useState<GameDetailLookupResult[]>([])
    const onPathChange = React.useCallback((ev: ChangeEvent<string>) => {
        (async () => {
            setFoundDetails(await api.games.lookupDetails({path: ev.value}));
        })();
    }, [api])

    const handlePathChange = fieldInputs.useInputHandlerFor("path", { afterChange: onPathChange });
    const handleNameChange = fieldInputs.useInputHandlerFor("name");

    return <div className="system-editor">
        <Field label="Game File">
            <FileSelector value={game?.path} onChange={handlePathChange} />
            {JSON.stringify(foundDetails)}
        </Field>
        <Field label="Name">
            <TextInput value={game?.name} onChange={handleNameChange} />
        </Field>
    </div>
}