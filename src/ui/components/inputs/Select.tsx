import React from "react";
import { ChangeHandler } from "./ChangeHandler";
import ReactSelect, { StylesConfig } from "react-select";

import "./input.scss";
import "./Select.scss";

export type SelectOption<TYPE> = {
    label: string,
    value: TYPE
};
export type SelectProperties<TYPE> = {
    options: SelectOption<TYPE>[],
    value?: TYPE,
    onChange?: ChangeHandler<TYPE|undefined>
}

export function Select<TYPE>({value,options, onChange}:SelectProperties<TYPE>) {
    const handleSelection = React.useCallback<Parameters<ReactSelect>[0]["onChange"]>(onChange ? (newValue, actionMeta) => {
        onChange( {value: (newValue as any).value})
    }: () => {}, [options])

    const selectedOption = options.find(option => option.value === value);
    return <ReactSelect 
        className="select" 
        classNamePrefix="gf"
        options={options} 
        isClearable={true}
        value={selectedOption} 
        onChange={handleSelection} 
    />
}
