import {readFileSync, writeFileSync} from "fs";
import {Block} from "./block";

export class FileService {
    chainsDir = process.cwd();
    fileSuffix = ".json";

    async writeChainToFile(fileName: string, chain: Block[]) {
        try {
            await writeFileSync(`${this.chainsDir}/${fileName}${this.fileSuffix}`, JSON.stringify(chain));
        } catch (err) {
            console.log(err);
        }
    }

    getChain(fileName: string): Block[] {
        const chainFileString = readFileSync(`${this.chainsDir}/${fileName}${this.fileSuffix}`, "utf8");
        return JSON.parse(chainFileString) as Block[];
    }
}
