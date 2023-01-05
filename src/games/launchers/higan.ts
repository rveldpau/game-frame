import { Game } from "../game";
import { LauncherImpl } from "./launcherImpl";
import child_process from "child_process";
import { Launcher } from "./launcher";

export type HiganLauncher = Launcher<"higan", {}>;

export class HiganLauncherImpl extends LauncherImpl<HiganLauncher> {
    get id(): "higan" {
        return "higan";
    }
    async launch(game: Game): Promise<void> {
        const spawnedProcess = await child_process.spawn("higan", [game.path])
        return new Promise((resolve, reject) => {
            spawnedProcess.on("exit", resolve);
            spawnedProcess.on("error", reject);
            spawnedProcess.on("message", (message) => console.log(message))
        })
    }

}