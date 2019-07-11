import {BlockCreator} from "./block.creator";
import {Block} from "./block";
import {writeFileSync, readFileSync} from "fs";
import * as path from "path";

export class BlockChainCreator {
    chainsDir = path.join(__dirname, "../blockchains");
    fileSuffix = ".json";

    constructor(private blockCreator: BlockCreator) {}

    async createBlockchain(fileName: string): Promise<void> {
        const chainInit = [this.blockCreator.createGenesisBlock()];
        await this.writeChainToFile(fileName, chainInit);
    }

    async addBlockToChain(fileName: string, data: string) {
        const chain = await this.getChain(fileName);
        const lastBlock = this.getLastBlock(chain);
        const newBlock = this.blockCreator.createNextBlock(lastBlock, data);
        chain.push(newBlock);
        await this.writeChainToFile(fileName, chain);
    }

    private async writeChainToFile(fileName: string, chain: Block[]) {
        try {
            await writeFileSync(`${this.chainsDir}/${fileName}${this.fileSuffix}`, JSON.stringify(chain));
        } catch (err) {
            console.log(err);
        }
    }

    private getLastBlock(chain: Block[]): Block {
        return [...chain].pop() as Block;
    }

    private async getChain(fileName: string): Promise<Block[]> {
        const chainFileString = await readFileSync(`${this.chainsDir}/${fileName}${this.fileSuffix}`, "utf8");
        return JSON.parse(chainFileString);
    }
}
