import NodeCache from "node-cache";
import { readdir } from "fs/promises";
const fileCache = new NodeCache({
    stdTTL: 10
});

export class FileSystemUtil {
    async listFiles(dir:string, options?: { filter?: RegExp }): Promise<string[]> {
        const cacheKey = `listDir:${dir}`;
        let files = fileCache.get<string[]>(cacheKey);
        if(!files){
            files = await readdir(dir);
            fileCache.set(cacheKey, files);
        }

        if(options?.filter){
            files = files.filter(file => file.match(options.filter))
        }
        return files;
    }
}