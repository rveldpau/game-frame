import React from "react";
import { useInputStateManager } from "../../ui/utilities/InputStateManager";
import { System, validateSystem } from "../system";
import { ChangeEvent } from "../../ui/components/inputs/ChangeHandler";
import { Subscreen } from "../../ui/components/Subscreen";
import { GameInput } from "./GameInput";
import { Action, MenuItem } from "../../ui/components/MenuItem";
import { faEdit, faExclamationCircle, faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { APIContext } from "../../ui/APIContext";
import { useNavigate } from "react-router-dom";
import { Game, GameWithArt, validateGame } from "../game";

export function EditGame({game}:{game:GameWithArt}) {
    const api = React.useContext(APIContext);
    const navigate = useNavigate();
    console.log("Game is", game);   
    const state = useInputStateManager<GameWithArt>({validate: validateGame, value:game});

    const action:Action = {
        text: "Update",
        icon: faEdit,
        color: "accent"
    }

    const [saving, setSaving] = React.useState(false);
    const updateGame = React.useCallback(async () => {
        if(state.valid){
            setSaving(true);
            await api.games.update({
                game: state.value as Game
            })
            setSaving(false);
            navigate("..");
        }
    }, [state.value, state.valid])
    return <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
            <GameInput game={state.value} onChange={state.handleChange} />
            <div className={"actions"}>
            <MenuItem
                    {...action}
                    disabled={!state.valid || !state.dirty}
                    onClick={updateGame}
                    alert={
                        saving ? { icon: faSpinner, iconAttributes:{spin:true}, message: state.messages.join("\n") } : 
                        (!state.valid ? { icon: faExclamationCircle, message: state.messages.join("\n") } : undefined)
                    }
                />
            </div>
        </div>
}