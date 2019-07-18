import {Block} from "./block";
import {HashCalculator} from "./hash.calculator";
import {UnhashedBlock} from "./unhashed.block";

export class BlockCreator {
    constructor(private hashCalculator: HashCalculator) {
    }

    public createGenesisBlock(): Block {
        const unhashed = this.toUnhashedBlock("Genesis block");
        const hash = this.hashCalculator.calculateHash(unhashed);
        return {...unhashed, hash};
    }

    public async createNextBlock(lastBlock: Block, data: string): Promise<Block> {
        const unhashed = this.toUnhashedBlock(data, lastBlock);
        const hash = this.hashCalculator.calculateHash(unhashed);
        return await this.mineBlock({...unhashed, hash}, 2);
    }

    private async mineBlock(block: Block, difficulty: number): Promise<Block> {
        while (block.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            block.nonce++;
            block.hash = this.hashCalculator.calculateHash(block);
            console.log(block.hash);
        }
        console.log("BLOCK MINED: " + block.hash);
        return block;
    }

    private toUnhashedBlock(data: string, lastBlock?: Block): UnhashedBlock {
        return {
            nonce: 0,
            index: lastBlock.index + 1 || 0,
            timeStamp: Date.now().toString(),
            data,
            prevHash: lastBlock.hash || ""
        };
    }
}
