import React from "react";
import { useInputStateManager } from "../../../ui/utilities/InputStateManager";
import { System, validateSystem } from "../../../games/system";
import { ChangeEvent } from "../../../ui/components/inputs/ChangeHandler";
import { Subscreen } from "../../../ui/components/Subscreen";
import { SystemInput } from "./SystemInput";
import { Action, MenuItem } from "../../../ui/components/MenuItem";
import { faExclamationCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { APIContext } from "../../../ui/APIContext";
import { useNavigate } from "react-router-dom";

export function NewSystem() {
    const api = React.useContext(APIContext);
    const navigate = useNavigate();
    const state = useInputStateManager<System>({ validate: validateSystem });

    const action:Action = {
        text: "Create",
        icon: faPlus,
        color: "accent"
    }

    const [saving, setSaving] = React.useState(false);
    const createSystem = React.useCallback(async () => {
        if(state.valid){
            setSaving(true);
            await api.systems.create({
                system: state.value as System
            })
            setSaving(false);
            navigate("..");
        }
    }, [state.value, state.valid])
    return <Subscreen title="Systems: Create">
        <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
            <SystemInput system={state.value} onChange={state.handleChange} />
            <div className={"actions"}>
                <MenuItem
                    {...action}
                    disabled={!state.valid || !state.dirty}
                    onClick={createSystem}
                    alert={!state.valid ? { icon: faExclamationCircle, message: state.messages.join("\n") } : undefined}
                />
            </div>
        </div>
    </Subscreen>
}