import {readFileSync, writeFileSync} from "fs";
import {Block} from "./block";
import {Logger} from "./logger";

export class FileService {
    chainsDir = process.cwd();
    fileSuffix = ".json";

    constructor(private logger: Logger) {}

    async writeChainToFile(fileName: string, chain: Block[]) {
        try {
            await writeFileSync(`${this.chainsDir}/${fileName}${this.fileSuffix}`, JSON.stringify(chain));
        } catch (err) {
            this.logger.logError(err);
        }
    }

    getChain(fileName: string): Block[] {
        const chainFileString = readFileSync(`${this.chainsDir}/${fileName}${this.fileSuffix}`, "utf8");
        return JSON.parse(chainFileString) as Block[];
    }
}
