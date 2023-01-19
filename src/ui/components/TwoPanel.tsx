import "./TwoPanel.scss";

export type TwoPanelProperties = {
    left: JSX.Element,
    right: JSX.Element
}
export function TwoPanel({left, right}: TwoPanelProperties){
    return <div className="two-panel">
        <div className="left panel">
            {left}
        </div>
        <div className="right panel">
            {right}
        </div>
    </div>
}