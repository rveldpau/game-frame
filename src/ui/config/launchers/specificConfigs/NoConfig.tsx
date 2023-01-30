import { LauncherConfigSubcomponent } from "../LauncherConfigSubcomponent";

export const NoConfigComponent:LauncherConfigSubcomponent<{}> = () => {
    return <div>
        This launcher requires no configuration.
    </div>
}