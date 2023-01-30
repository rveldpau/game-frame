import { ImporterImpl } from "./importerImpl";
import { SteamImporter, SteamImporterImpl } from "./steamImporter";

export type SupportedImporter = SteamImporter;

export const SupportedImporters:Record<SupportedImporter["id"], ImporterImpl<SupportedImporter>> = [
    new SteamImporterImpl()
].reduce((map, value) => ({
    ...map,
    [value.id]: value
}), {} as Record<SupportedImporter["id"], ImporterImpl<SupportedImporter>>)