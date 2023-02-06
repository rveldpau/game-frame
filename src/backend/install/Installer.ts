import { IPCAPI } from "../../ipc/api"
import { IGDBApi } from "../igdb/IGDBApi"
import { InstallDAO, InstallStep } from "./installDao"
import semver from "semver";

export type InstallContext = {api:IPCAPI, igdb: IGDBApi, installDAO: InstallDAO};

export type InstallStepImpl = InstallStep & {
    execute: (context:InstallContext) => Promise<string>
}

export class Installer {
    constructor(private readonly steps: InstallStepImpl[]){}
    async install(context: InstallContext) {
        const sortedSteps = this.steps.sort((a,b) => semver.compare(a.version, b.version))
        for(let i=0; i< sortedSteps.length; i++){
            const currentStep = sortedSteps[i];
            if(await context.installDAO.checkInstalled(currentStep)){
                continue;
            }

            console.log(`Installing ${currentStep.version}: ${currentStep.name}`);
            const message = await currentStep.execute(context);
            await context.installDAO.registerInstall({...currentStep, message, success: true})
        }
    }
}