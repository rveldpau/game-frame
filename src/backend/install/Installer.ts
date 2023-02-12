import { IPCAPI } from "../../ipc/api"
import { IGDBApi } from "../igdb/IGDBApi"
import { InstallDAO, InstallStep } from "./installDao"
import semver from "semver";
import { GamesDAO } from "../../games/dataAccess/gamesDao";
import { GameGenreDAO } from "../../games/dataAccess/genresDao";
import { SystemsDAO } from "../../games/dataAccess/systemsDao";

export type InstallContext = {
    api:IPCAPI, 
    daos: { systemsDAO: SystemsDAO, gamesDAO: GamesDAO, genresDAO: GameGenreDAO, installDAO: InstallDAO}, 
    igdb: IGDBApi
};

export type InstallStepImpl = InstallStep & {
    execute: (context:InstallContext) => Promise<string>
}

export class Installer {
    constructor(private readonly steps: InstallStepImpl[]){}
    async install(context: InstallContext) {
        const sortedSteps = this.steps.sort((a,b) => semver.compare(a.version, b.version))
        for(let i=0; i< sortedSteps.length; i++){
            const currentStep = sortedSteps[i];
            if(await context.daos.installDAO.checkInstalled(currentStep)){
                continue;
            }

            console.log(`Installing ${currentStep.version}: ${currentStep.name}`);
            const message = await currentStep.execute(context);
            await context.daos.installDAO.registerInstall({...currentStep, message, success: true})
        }
    }
}