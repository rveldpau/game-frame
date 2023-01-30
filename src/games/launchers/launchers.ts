import { DosboxLauncher, DosboxLauncherImpl } from "./dosbox";
import { AnyLauncher } from "./launcher";
import { LauncherImpl } from "./launcherImpl";
import { HiganLauncher, HiganLauncherImpl } from "./higan";
import { SteamLauncher, SteamLauncherImpl } from "./steam";

export type SupportedLauncher = DosboxLauncher | HiganLauncher | SteamLauncher;

export const SupportedLaunchers:Record<SupportedLauncher["id"], LauncherImpl<SupportedLauncher>> = [
    new DosboxLauncherImpl(),
    new HiganLauncherImpl(),
    new SteamLauncherImpl()
].reduce((map, value) => ({
    ...map,
    [value.id]: value
}), {} as Record<SupportedLauncher["id"], LauncherImpl<SupportedLauncher>>)