import { ProgressiveUpdate } from "../../ipc/api";
import { Game } from "../game";
import { AnyImporter } from "./importer";

export type ImportResult = {gameCount: number}

export abstract class ImporterImpl<ImporterType extends AnyImporter> {
    abstract get id(): ImporterType["id"];
    abstract get name(): string;
    abstract validateParameters(importParameters?:ImporterType["parameters"]): string[];
    abstract import(importParameters:ImporterType["parameters"]): AsyncGenerator<ProgressiveUpdate<ImportResult>>;
}