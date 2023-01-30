import { faSpinner, faExclamationCircle, faForward } from "@fortawesome/free-solid-svg-icons";
import { ChangeHandler } from "../../../ui/components/inputs/ChangeHandler";
import { Field } from "../../../ui/components/inputs/Field";
import { Select } from "../../../ui/components/inputs/Select";
import { MenuItem } from "../../../ui/components/MenuItem";
import { Subscreen } from "../../../ui/components/Subscreen";
import { useFieldInputs } from "../../../ui/utilities/FieldInputs";
import { useInputStateManager } from "../../../ui/utilities/InputStateManager";
import { AnyImporter, Importer } from "../../importers/importer";
import { SupportedImporter, SupportedImporters } from "../../importers/importers";
import { SteamImporter } from "../../importers/steamImporter";
import { SteamImporterParams } from "./SteamImporterParams";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { useAPI } from "../../../ui/APIContext";
import React from "react";
import { IntermediateProgressiveUpdate, ProgressiveUpdate } from "../../../ipc/api";
import { ImportResult } from "../../importers/importerImpl";
import { ProgressBar } from "../../../ui/components/ProgressBar";

export type GamesImportParametersScreen<IMPORTER extends AnyImporter> = (props:{value?: Partial<IMPORTER["parameters"]>, onChange:ChangeHandler<IMPORTER["parameters"]>}) => JSX.Element

const ImporterMap:Record<SupportedImporter["id"], GamesImportParametersScreen<AnyImporter>> = {
    steam: SteamImporterParams
}

type GamesImportState = {id:SupportedImporter["id"], parameters:SupportedImporter["parameters"]};
const validateState = ({id, parameters}:GamesImportState) => {
    if(!id){
        return ["You must select an importer"];
    }
    return SupportedImporters[id].validateParameters(parameters);
};
export function GamesImport(){
    const importer = useInputStateManager<SupportedImporter>({ validate: validateState });
    const fieldChangeHandler = useFieldInputs<Partial<GamesImportState>>({value:importer.value, onChange: importer.handleChange});

    const ParamsRenderer = importer.value.id ? ImporterMap[importer.value.id] : undefined;
    const parametersChangeHandler = fieldChangeHandler.useInputHandlerFor("parameters");

    console.log("Importer ID", importer.value.id)

    const [results, setResults] = React.useState<ProgressiveUpdate<ImportResult>>();
    const api = useAPI();
    const startImport = React.useCallback(async () => {
        console.log("Starting import");
        let iter = await api.games.import(importer.value as SupportedImporter);
        console.log("Iter",iter);
        let result = await iter.next();
        console.log("Result got");
        while(!result.done){
            console.log("Result",result);
            setResults(result.value);
            result = await iter.next();
        }
        setResults(result.value);
        
    },[api])

    return <Subscreen title="Games: Import">
        <Field label="Importer">
            <Select onChange={fieldChangeHandler.useInputHandlerFor("id")} options={Object.entries(SupportedImporters).map(([,importer]) => ({
                label: importer.name,
                value: importer.id
            }))} />
        </Field>
        {ParamsRenderer && <ParamsRenderer value={importer.value.parameters} onChange={parametersChangeHandler} />}
        <div className={"actions"}>
                <MenuItem
                    text = "Start Import"
                    icon = {faForward}
                    color = "accent"
                    disabled={!importer.valid || !importer.dirty}
                    onClick={startImport}
                    alert={
                        !importer.valid ? { icon: faExclamationCircle, message: importer.messages.join("\n") } : undefined
                    }
                />
            </div>
        { results?.progress && <ProgressBar progress={results?.progress} /> }
    </Subscreen>
}