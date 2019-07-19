import {Block} from "./block";
import {BlockCreator} from "./block.creator";
import {FileService} from "./file.service";

export class BlockChainCreator {
    constructor(private blockCreator: BlockCreator,
                private fileService: FileService) {
    }

    public async createBlockchain(fileName: string, difficulty?: number): Promise<void> {
        const chainInit = { difficulty: difficulty.toString(), chain: [this.blockCreator.createGenesisBlock()] };
        await this.fileService.writeChainToFile(fileName, chainInit);
    }

    public async addBlockToChain(fileName: string, data: string) {
        const blockchain = await this.fileService.getChain(fileName);
        const lastBlock = this.getLastBlock(blockchain.chain);
        const newBlock =
            await this.blockCreator.createNewBlock({
                lastBlock,
                data,
                difficulty: parseInt(blockchain.difficulty, 10)
            });
        blockchain.chain.push(newBlock);
        await this.fileService.writeChainToFile(fileName, blockchain);
    }

    private getLastBlock(chain: Block[]): Block {
        return [...chain].pop();
    }
}
