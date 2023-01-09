import { Launcher } from "../../../games/launchers/launcher";
import { ChangeHandler } from "../../../ui/components/inputs/ChangeHandler";

export type LauncherConfigSubcomponent<CONFIG extends Launcher<string>["config"]> = (props:{value?:CONFIG, onChange:ChangeHandler<CONFIG>}) => JSX.Element;