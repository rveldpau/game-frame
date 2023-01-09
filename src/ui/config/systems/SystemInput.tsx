import { Field } from "../../components/inputs/Field";
import { TextInput } from "../../components/inputs/TextInput";
import { System } from "../../../games/system";
import React from "react";
import { ChangeEvent, ChangeHandler } from "../../../ui/components/inputs/ChangeHandler";
import { useFieldInputs } from "../../utilities/FieldInputs";
import { LauncherConfig } from "../launchers/LauncherConfig";

export type SystemInputProperties = {
    system?: Partial<System>,
    onChange?: ChangeHandler<Partial<System>>
}
export function SystemInput({system, onChange}: SystemInputProperties){
    const fieldInputs = useFieldInputs({ value:system, onChange });
    const handleNameChange = fieldInputs.useInputHandlerFor("name");
    const handleLauncherChange = fieldInputs.useInputHandlerFor("defaultLauncher");
    return <div className="system-editor">
        <Field label="Name">
            <TextInput value={system.name} onChange={handleNameChange} />
        </Field>
        <LauncherConfig launcher={system.defaultLauncher} onChange={handleLauncherChange} />
    </div>
}