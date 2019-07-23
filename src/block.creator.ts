import {range} from "lodash";
import {Block} from "./block";
import {CreateBlockRequest} from "./create.block.request";
import {HashCalculator} from "./hash.calculator";
import {Logger} from "./logger";
import {SuccessMessage} from "./success.message";
import {UnhashedBlock} from "./unhashed.block";

export class BlockCreator {
    constructor(private hashCalculator: HashCalculator,
                private logger: Logger) {
    }

    public createGenesisBlock(): Block {
        const unhashed = this.toUnhashedBlock("Genesis block");
        const hash = this.hashCalculator.calculateHash(unhashed);
        return {...unhashed, hash};
    }

    public async createNewBlock(request: CreateBlockRequest): Promise<Block> {
        const unhashed = this.toUnhashedBlock(request.data, request.lastBlock);
        const hash = this.hashCalculator.calculateHash(unhashed);
        return await this.mineBlock({...unhashed, hash}, request.difficulty);
    }

    public toHashPrefix(difficulty: number): string {
        return range(0, difficulty).map(() => 0).join("");
    }

    private async mineBlock(block: Block, difficulty: number): Promise<Block> {
        while (!block.hash.startsWith(this.toHashPrefix(difficulty))) {
            block.nonce++;
            block.hash = this.hashCalculator.calculateHash(block);
            this.logger.logHash(block.hash);
        }
        this.logger.logSuccess(SuccessMessage.blockMined);
        this.logger.logHash(block.hash);
        return block;
    }

    private toUnhashedBlock(data: string, lastBlock?: Block): UnhashedBlock {
        return {
            index: lastBlock ? lastBlock.index + 1 : 0,
            nonce: 0,
            timeStamp: Date.now().toString(),
            data,
            prevHash: lastBlock ? lastBlock.hash : "No previous"
        };
    }
}
