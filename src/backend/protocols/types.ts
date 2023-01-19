import { Protocol } from "electron";

export type FileProtocol = Parameters<Protocol["registerFileProtocol"]>[1];

export type FileProtocolGenerator = () => FileProtocol;