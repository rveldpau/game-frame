import { Game } from "../game";
import { LauncherImpl } from "./launcherImpl";
import child_process from "child_process";
import { Launcher } from "./launcher";

export type SteamConfig = { 
}

const defaultConfig:Partial<SteamConfig> = {
} 

export type SteamLauncher = Launcher<"steam", Partial<SteamConfig>>;

export class SteamLauncherImpl extends LauncherImpl<SteamLauncher> {
    get id(): "steam" {
        return "steam";
    }
    get name(): string {
        return "steam";
    }

    async launch(game: Game, config?: Partial<SteamConfig>): Promise<void> {
        const finalConfig = {
            ...defaultConfig,
            ...config ?? {}
        }
        const spawnedProcess = await child_process.spawn("steam", [`steam://rungameid/${game.path}`])
        return new Promise((resolve, reject) => {
            spawnedProcess.on("exit", resolve);
            spawnedProcess.on("error", reject);
            spawnedProcess.on("message", (message) => console.log(message))
        })
    }

}