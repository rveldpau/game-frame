import { Game } from "../game";
import { LauncherImpl } from "./launcherImpl";
import child_process from "child_process";
import { Launcher } from "./launcher";

export type HiganConfig = { 
    fullscreen: boolean 
}

const defaultConfig:HiganConfig = {
    fullscreen: true
} 

export type HiganLauncher = Launcher<"higan", Partial<HiganConfig>>;

export class HiganLauncherImpl extends LauncherImpl<HiganLauncher> {
    get id(): "higan" {
        return "higan";
    }
    get name(): string {
        return "higan";
    }

    async launch(game: Game, config?: Partial<HiganConfig>): Promise<void> {
        const finalConfig = {
            ...defaultConfig,
            ...config ?? {}
        }
        const spawnedProcess = await child_process.spawn("higan", [game.path].concat(finalConfig ? ["--fullscreen"]: []))
        return new Promise((resolve, reject) => {
            spawnedProcess.on("exit", resolve);
            spawnedProcess.on("error", reject);
            spawnedProcess.on("message", (message) => console.log(message))
        })
    }

}