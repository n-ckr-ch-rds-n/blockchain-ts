import {Block} from "./block";

export class BlockCreator {
    public createGenesisBlock(): Block {
        return new Block(0, Date.now(), "Genesis Block", "0");
    }

    public createNextBlock(lastBlock: Block, data: string): Block {
        return new Block(lastBlock.index + 1, Date.now(), data, lastBlock.thisHash);
    }
}
