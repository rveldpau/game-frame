import React from "react";
import { APIContext } from "../../ui/APIContext";
import { ContentLoader } from "../../ui/components/ContentLoader";
import { ChangeHandler } from "../../ui/components/inputs/ChangeHandler";
import { Field } from "../../ui/components/inputs/Field";
import { Select, SelectOption } from "../../ui/components/inputs/Select";
import { System } from "../system";

type ResultTypeToType<RESULT_TYPE extends "id"|"system"> = RESULT_TYPE extends "id" ? System["id"] : System;
type SystemSelectProps<RESULT_TYPE extends "id"|"system"> = {
    select: RESULT_TYPE,
    onChange: ChangeHandler<ResultTypeToType<RESULT_TYPE> >
    value?: ResultTypeToType<RESULT_TYPE>
}


export function SystemSelect<RESULT_TYPE extends "id"|"system">({value, onChange, select}: SystemSelectProps<RESULT_TYPE>){
    const api = React.useContext(APIContext);
    return <ContentLoader load={() => api.systems.list()} render={results => {
        const options:SelectOption<ResultTypeToType<RESULT_TYPE>>[] =
            results.data.map(system => ({
                label: system.name,
                value: (select === "id" ? system.id : system) as ResultTypeToType<RESULT_TYPE>
            }))
        return <Select value={value} options={options} onChange={onChange} />
    }
        
    } />
}