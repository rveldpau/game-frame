import { useFieldInputs } from "../../../../ui/utilities/FieldInputs";
import { HiganConfig } from "../../../../games/launchers/higan";
import { LauncherConfigSubcomponent } from "../LauncherConfigSubcomponent";
import { Field } from "../../../../ui/components/inputs/Field";
import { Toggle } from "../../../../ui/components/inputs/Toggle";

export const HiganConfigComponent:LauncherConfigSubcomponent<HiganConfig> = ({value, onChange}) => {
    const fieldInputs = useFieldInputs({value, onChange});
    const handleIdChange = fieldInputs.useInputHandlerFor("fullscreen")
    return <div>
        <Field label="Fullscreen">
            <Toggle onChange={handleIdChange} value={value?.fullscreen} />
        </Field>
    </div>
}