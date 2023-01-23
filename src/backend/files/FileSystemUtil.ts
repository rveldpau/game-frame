import NodeCache from "node-cache";
import { readdir, stat } from "fs/promises";
import { existsSync } from "original-fs";
const fileCache = new NodeCache({
    stdTTL: 10
});

export class FileSystemUtil {
    async exists(path:string): Promise<boolean> {
        return existsSync(path);
    }
    async listFiles(dir:string, options?: { filter?: RegExp | RegExp[] }): Promise<string[]> {
        const cacheKey = `listDir:${dir}`;
        console.log("Looking up files in", dir);
        let files = fileCache.get<string[]>(cacheKey);
        if(!files){
            files = await readdir(dir);
            fileCache.set(cacheKey, files);
        }

        if(options?.filter){
            const filters = Array.isArray(options.filter) ? options.filter : [options.filter];
            files = files.filter(file => filters.some(filter => file.match(filter)))
        }
        return files;
    }
}