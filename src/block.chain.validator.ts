import {Block} from "./block";
import {FileService} from "./file.service";
import {HashCalculator} from "./hash.calculator";
import {UnhashedBlock} from "./unhashed.block";

export class BlockChainValidator {
    chain: Block[];

    constructor(private fileService: FileService,
                private hashCalculator: HashCalculator) {
    }

    public validateBlock(filename: string): void {
        this.chain = this.fileService.getChain(filename);
        this.chain.forEach((block) => {
            if (!this.isValid(block)) {
                throw new Error(`Block ${block.index} is invalid`);
            }
        });
    }

    public isValid(block: Block): boolean {
        return block.hash === this.hashCalculator.calculateHash(this.toUnhashed(block))
            && block.prevHash === this.chain[block.index - 1].hash;
    }

    private toUnhashed(block: Block): UnhashedBlock {
        const unhashed = {...block};
        delete unhashed.hash;
        return unhashed;
    }
}
