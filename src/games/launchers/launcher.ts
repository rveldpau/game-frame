export type Launcher<LauncherId extends string, LauncherConfig extends {} = {}> = {
    id: LauncherId;
    config: LauncherConfig;
}

export type AnyLauncher = Launcher<string>;