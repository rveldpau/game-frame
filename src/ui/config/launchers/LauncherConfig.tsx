import { Select, SelectOption } from "../../../ui/components/inputs/Select";
import { Field } from "../../../ui/components/inputs/Field";
import { SupportedLauncher, SupportedLaunchers } from "../../../games/launchers/launchers";
import { AnyLauncher } from "../../../games/launchers/launcher";
import { ChangeHandler } from "../../../ui/components/inputs/ChangeHandler";
import { useInputStateManager } from "../../../ui/utilities/InputStateManager";
import { useFieldInputs } from "../../../ui/utilities/FieldInputs";
import { LauncherConfigSubcomponent } from "./LauncherConfigSubcomponent";
import { NoConfigComponent } from "./specificConfigs/NoConfig";
import { HiganConfigComponent } from "./specificConfigs/HiganConfig";

const LauncherOptions: SelectOption<AnyLauncher["id"]>[] = Object.values(SupportedLaunchers)
    .map(launcher => ({
        label: launcher.name,
        value: launcher.id
    }))

export type LauncherConfigProperties = {
    launcher?: AnyLauncher,
    onChange?: ChangeHandler<AnyLauncher>
}

const ConfigComponentMapping:Record<SupportedLauncher["id"], LauncherConfigSubcomponent<{}>> = {
    "dosbox": NoConfigComponent,
    "higan": HiganConfigComponent,
    "steam": NoConfigComponent
}

export function LauncherConfig({launcher, onChange}:LauncherConfigProperties){
    const fieldInputs = useFieldInputs({value: launcher, onChange});
    const handleIdChange = fieldInputs.useInputHandlerFor("id");
    const handleConfigChange = fieldInputs.useInputHandlerFor("config");
    const ConfigComponent = ConfigComponentMapping[launcher?.id as SupportedLauncher["id"]];
    return <div>
        <Field label="Select a launcher">
            <Select value={launcher?.id} options={LauncherOptions} onChange={handleIdChange} />
        </Field>
        {ConfigComponent && <ConfigComponent value={launcher?.config} onChange={handleConfigChange} /> }
    </div>
}