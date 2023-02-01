import { Field } from "../../../ui/components/inputs/Field"
import { FileSelector } from "../../../ui/components/inputs/FileSelector"
import { Select } from "../../../ui/components/inputs/Select"
import { TextInput } from "../../../ui/components/inputs/TextInput"
import { useFieldInputs } from "../../../ui/utilities/FieldInputs"
import { FileSystemImporter, FileSystemImportParameters } from "../../importers/fsImporter"
import { SteamImporter } from "../../importers/steamImporter"
import { SteamConfig } from "../../launchers/steam"
import { SystemSelect } from "../SystemSelect"
import { GamesImportParametersScreen } from "./GamesImport"

export const FileSystemImporterParams:GamesImportParametersScreen<FileSystemImporter> = ({value, onChange}) =>{
    const fieldInputs = useFieldInputs<Partial<FileSystemImporter["parameters"]>>({value, onChange});
    return <>
        <Field label="System">
            <SystemSelect select="id" onChange={fieldInputs.useInputHandlerFor("systemId")} value={value?.systemId} />
        </Field>
        <Field label="Game Directory">
            <FileSelector 
                value={value?.directory} 
                onChange={fieldInputs.useInputHandlerFor("directory")} 
                defaultPath="~"
                title="Select Games Dircetory"
                openDirectory
                />
        </Field>
        <Field label="Extension">
            <TextInput 
                value={value?.extension} 
                onChange={fieldInputs.useInputHandlerFor("extension")} 
                />
        </Field>
    </>
}