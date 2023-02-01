import React from "react";
import { APIContext, useAPI } from "../../../ui/APIContext";
import { ContentLoader } from "../../../ui/components/ContentLoader";
import { ChangeHandler } from "../../../ui/components/inputs/ChangeHandler";
import { Select, SelectOption } from "../../../ui/components/inputs/Select";
import { AnyImporter } from "../../importers/importer";

type ImporterSelectProps = {
    onChange: ChangeHandler<AnyImporter["id"]>
    value?: AnyImporter["id"]
}

export function ImporterSelect({value, onChange}: ImporterSelectProps){
    const api = useAPI();
    return <ContentLoader load={() => api.import.list()} render={results => {
        const options:SelectOption<AnyImporter["id"]>[] =
            results.data.map(importer => ({
                label: importer.name,
                value: importer.id
            }))
        return <Select<string> value={value} options={options} onChange={onChange} />
    }
        
    } />
}