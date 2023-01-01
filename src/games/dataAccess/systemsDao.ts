import { DAO } from "../../backend/dao";
import { System } from "../system";

export abstract class SystemsDAO extends DAO {
    constructor(){
        super();
    }

    abstract list():Promise<System[]>;
    abstract create(systemToCreate:System):Promise<void>;
}