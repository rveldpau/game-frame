import React from "react";
import { ChangeEvent, ChangeHandler } from "../components/inputs/ChangeHandler";

export type FieldInputProperties<TYPE extends {}> = {
    value:TYPE,
    onChange: ChangeHandler<TYPE>
}

export type InputHandlerOptions<TYPE, KEY extends keyof TYPE> = {
    afterChange?: (event: ChangeEvent<TYPE[KEY]>, details:{ field:keyof TYPE }) => void
}

export function useFieldInputs<TYPE extends {}>({value, onChange}:FieldInputProperties<TYPE>){
    const useInputHandlerFor = React.useCallback(function <KEY extends keyof TYPE>(field:KEY, options?:InputHandlerOptions<TYPE, KEY>) {
        return React.useCallback( (ev: ChangeEvent<TYPE[KEY]>) => {
            onChange({value: {
                ...value,
                [field]: ev.value
            }});
            options?.afterChange?.(ev, { field })
        }, [ field, options ])
    } , [value]);

    return {
        useInputHandlerFor
    }
}