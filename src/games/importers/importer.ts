export type Importer<ImporterId extends string, ImportParameters extends {} = {}> = {
    id: ImporterId;
    parameters: ImportParameters;
}

export type AnyImporter = Importer<string>;