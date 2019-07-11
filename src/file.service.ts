import {Block} from "./block";
import {readFileSync, writeFileSync} from "fs";
import * as path from "path";

export class FileService {
    chainsDir = path.join(__dirname, "../blockchains");
    fileSuffix = ".json";

    async writeChainToFile(fileName: string, chain: Block[]) {
        try {
            await writeFileSync(`${this.chainsDir}/${fileName}${this.fileSuffix}`, JSON.stringify(chain));
        } catch (err) {
            console.log(err);
        }
    }

    async getChain(fileName: string): Promise<Block[]> {
        const chainFileString = await readFileSync(`${this.chainsDir}/${fileName}${this.fileSuffix}`, "utf8");
        return JSON.parse(chainFileString);
    }
}
