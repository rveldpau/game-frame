import { ProgressiveUpdate } from "../../ipc/api";
import { Game, GameWithArt } from "../game";
import { AnyImporter } from "./importer";

export type ImportResult = {gameCount: number}

export abstract class ImporterImpl<ImporterType extends AnyImporter = AnyImporter> {
    abstract get id(): ImporterType["id"];
    abstract get name(): string;
    abstract validateParameters(importParameters?:ImporterType["parameters"]): Promise<string[]>;
    abstract import(importParameters:ImporterType["parameters"], handleFoundGame: (game:Partial<GameWithArt>) => Promise<void>): AsyncGenerator<ProgressiveUpdate<ImportResult>>;
}