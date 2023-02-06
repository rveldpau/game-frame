import { DAO } from "../dao";

export type InstallStep = {
    version: string,
    name: string,
}

export type InstallStepStatus = InstallStep & {
    success: boolean,
    message: string
}
export abstract class InstallDAO extends DAO {
    constructor(){
        super();
    }

    abstract checkInstalled(step: InstallStep):Promise<boolean>;
    abstract registerInstall(step: InstallStepStatus):Promise<void>;
}