import { DataTypes, InferAttributes, InferCreationAttributes, Model, ModelAttributes, Optional, Sequelize } from "sequelize";
import { InstallDAO, InstallStep, InstallStepStatus } from "./installDao";

export class InstallDataObject extends Model<InferAttributes<InstallDataObject>, InferCreationAttributes<InstallDataObject>> {
    declare version: string;
    declare name: string;
    declare success: boolean;
    declare message: string;
}

type InferModelAttributes<TYPE extends Model> = ModelAttributes<TYPE, Optional<InferAttributes<TYPE, {
    omit: never;
}>, never>>

export const InstallDataObjectSequelizeModelTypes: InferModelAttributes<InstallDataObject> = {
    version: {
        type: DataTypes.STRING(32),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        primaryKey: true
    },
    success: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING(1024),
        allowNull: true
    }
}

export class InstallDAOSqlLite extends InstallDAO {

    constructor(private readonly sqlize: Sequelize) {
        super();
    }

    async checkInstalled({name, version}: InstallStep): Promise<boolean> {
        return !!(await InstallDataObject.findOne({where: {
            name,version
        }}));
    }
    async registerInstall(step: InstallStepStatus): Promise<void> {
        await InstallDataObject.create(step);
    }
}

