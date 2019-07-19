import {readFileSync, writeFileSync} from "fs";
import {Blockchain} from "./blockchain";
import {Logger} from "./logger";

export class FileService {
    chainsDir = process.cwd();
    fileSuffix = ".json";

    constructor(private logger: Logger) {}

    async writeChainToFile(fileName: string, chain: Blockchain): Promise<void> {
        try {
            await writeFileSync(`${this.chainsDir}/${fileName}${this.fileSuffix}`, JSON.stringify(chain));
        } catch (err) {
            this.logger.logError(err);
        }
    }

    getChain(fileName: string): Blockchain {
        const chainFileString = readFileSync(`${this.chainsDir}/${fileName}${this.fileSuffix}`, "utf8");
        const chain = JSON.parse(chainFileString);
        chain.difficulty = parseInt(chain.difficulty, 10);
        return chain as Blockchain;
    }
}
