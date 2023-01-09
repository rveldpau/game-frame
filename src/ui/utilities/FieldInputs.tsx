import React from "react";
import { ChangeEvent, ChangeHandler } from "../components/inputs/ChangeHandler";

export type FieldInputProperties<TYPE extends {}> = {
    value:TYPE,
    onChange: ChangeHandler<TYPE>
}

export function useFieldInputs<TYPE extends {}>({value, onChange}:FieldInputProperties<TYPE>){
    const useInputHandlerFor = React.useCallback(function <KEY extends keyof TYPE>(field:KEY) {
        return (ev: ChangeEvent<TYPE[KEY]>) => {
            onChange({value: {
                ...value,
                [field]: ev.value
            }})
        }
    } , [value]);

    return {
        useInputHandlerFor
    }
}