export type ProgressBarProps = {
    progress: number
}

import "./ProgressBar.scss";

export function ProgressBar({progress}:ProgressBarProps){
    return <div className="progress-bar">
        <div className="progress" style={{width:`${Math.min(progress,1) * 100}%`}}></div>
    </div>
}