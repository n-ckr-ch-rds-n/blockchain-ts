import {Block} from "./block";

export class BlockCreator {
    public createGenesisBlock(): Block {
        return new Block(0, Date.now(), "Genesis Block", "0");
    }

    public async createNextBlock(lastBlock: Block, data: string): Promise<Block> {
        const blockInit = new Block(lastBlock.index + 1, Date.now(), data, lastBlock.hash);
        return await this.mineBlock(blockInit, 2);
    }

    private async mineBlock(block: Block, difficulty: number): Promise<Block> {
        while (block.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            block.nonce++;
            block.hash = block.calculateHash();
            console.log(block.hash);
        }
        console.log("BLOCK MINED: " + block.hash);
        return block;
    }
}
