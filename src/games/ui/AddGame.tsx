import React from "react";
import { useInputStateManager } from "../../ui/utilities/InputStateManager";
import { System, validateSystem } from "../../games/system";
import { ChangeEvent } from "../../ui/components/inputs/ChangeHandler";
import { Subscreen } from "../../ui/components/Subscreen";
import { GameInput } from "./GameInput";
import { Action, MenuItem } from "../../ui/components/MenuItem";
import { faExclamationCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { APIContext } from "../../ui/APIContext";
import { useNavigate } from "react-router-dom";
import { Game, validateGame } from "../game";

export function NewGame() {
    const api = React.useContext(APIContext);
    const navigate = useNavigate();
    const state = useInputStateManager<Game>({validate: validateGame});

    const action:Action = {
        text: "Create",
        icon: faPlus,
        color: "accent"
    }

    const [saving, setSaving] = React.useState(false);
    const createGame = React.useCallback(async () => {
        if(state.valid){
            setSaving(true);
            await api.games.create({
                game: state.value as Game
            })
            setSaving(false);
            navigate("..");
        }
    }, [state.value, state.valid])
    return <Subscreen title="Games: Add">
        <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
            <GameInput game={state.value} onChange={state.handleChange} />
            <div className={"actions"}>
                <MenuItem
                    {...action}
                    disabled={!state.valid || !state.dirty}
                    onClick={createGame}
                    alert={!state.valid ? { icon: faExclamationCircle, message: state.messages.join("\n") } : undefined}
                />
            </div>
        </div>
    </Subscreen>
}