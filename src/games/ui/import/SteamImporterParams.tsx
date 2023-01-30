import { Field } from "../../../ui/components/inputs/Field"
import { FileSelector } from "../../../ui/components/inputs/FileSelector"
import { useFieldInputs } from "../../../ui/utilities/FieldInputs"
import { SteamImporter } from "../../importers/steamImporter"
import { SteamConfig } from "../../launchers/steam"
import { GamesImportParametersScreen } from "./GamesImport"

export const SteamImporterParams:GamesImportParametersScreen<SteamImporter> = ({value, onChange}) =>{
    const fieldInputs = useFieldInputs<Partial<SteamImporter["parameters"]>>({value, onChange});
    return <div>
        <Field label="VDF Path">
            <FileSelector 
                value={value?.vdfFile} 
                onChange={fieldInputs.useInputHandlerFor("vdfFile")} 
                filters={[{extensions:["vdf"], name:"Steam VDF File"}]} 
                defaultPath="~/.steam/registry.vdf"
                title="Select Steam VDF File"
                />
        </Field>
    </div>
}