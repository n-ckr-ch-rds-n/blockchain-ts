import {readFileSync, writeFileSync} from "fs";
import {Blockchain} from "./blockchain";
import {Logger} from "./logger";

export class FileService {
    chainsDir = process.cwd();
    fileSuffix = ".json";

    constructor(private logger: Logger) {}

    async writeChainToFile(fileName: string, chain: Blockchain) {
        try {
            await writeFileSync(`${this.chainsDir}/${fileName}${this.fileSuffix}`, JSON.stringify(chain));
        } catch (err) {
            this.logger.logError(err);
        }
    }

    getChain(fileName: string): Blockchain {
        const chainFileString = readFileSync(`${this.chainsDir}/${fileName}${this.fileSuffix}`, "utf8");
        return JSON.parse(chainFileString) as Blockchain;
    }
}
