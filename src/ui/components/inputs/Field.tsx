import "./input.scss";

export type FieldProperties = React.PropsWithChildren<{
    label:string,
    fieldName?: string
}>;
export function Field({label, fieldName, children}:FieldProperties){
    return <div className="field">
        <label htmlFor={fieldName}>{label}</label>
        <div className="content">
            {children}
        </div>
    </div>
}