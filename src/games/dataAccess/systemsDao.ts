import { DAO } from "../../backend/dao";
import { System } from "../system";

export abstract class SystemsDAO extends DAO {
    constructor(){
        super();
    }

    abstract list(options?:{active?:boolean}):Promise<System[]>;
    abstract get(id:System["id"]):Promise<System>;
    abstract create(systemToCreate:System[]):Promise<void>;
}