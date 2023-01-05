import { DosboxLauncher, DosboxLauncherImpl } from "./dosbox";
import { AnyLauncher } from "./launcher";
import { LauncherImpl } from "./launcherImpl";
import { HiganLauncher, HiganLauncherImpl } from "./higan";

export type SupportedLauncher = DosboxLauncher | HiganLauncher;

export const SupportedLaunchers:Record<SupportedLauncher["id"], LauncherImpl<SupportedLauncher>> = [
    new DosboxLauncherImpl(),
    new HiganLauncherImpl()
].reduce((map, value) => ({
    ...map,
    [value.id]: value
}), {} as Record<SupportedLauncher["id"], LauncherImpl<SupportedLauncher>>)