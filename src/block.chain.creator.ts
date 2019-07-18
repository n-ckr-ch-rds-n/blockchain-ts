import {BlockCreator} from "./block.creator";
import {Block} from "./block";
import {FileService} from "./file.service";
import {Transaction} from "./transaction";

export class BlockChainCreator {
    public pendingTransactions: Transaction[];

    constructor(private blockCreator: BlockCreator,
                private fileService: FileService) {
        this.pendingTransactions = [];
    }

    public async createBlockchain(fileName: string = "blockchain"): Promise<void> {
        const chainInit = [this.blockCreator.createGenesisBlock()];
        await this.fileService.writeChainToFile(fileName, chainInit);
    }

    public async addBlockToChain(fileName: string, data: string) {
        const chain = await this.fileService.getChain(fileName);
        const lastBlock = this.getLastBlock(chain);
        const newBlock = this.blockCreator.createNextBlock(lastBlock, data);
        chain.push(newBlock);
        await this.fileService.writeChainToFile(fileName, chain);
    }

    private getLastBlock(chain: Block[]): Block {
        return [...chain].pop() as Block;
    }

}
