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
        let chainValid: boolean;
        const invalidBlocks: Block[] = [];
        this.chain = this.fileService.getChain(filename);
        this.chain.forEach((block) => {
            console.log(block);
            if (!this.isValid(block)) {
                chainValid = false;
                invalidBlocks.push(block);
            }
        });
        chainValid
            ? console.log("Chain is valid!")
            : console.log(`Chain is invalid. The following blocks are corrupted:
                ${JSON.stringify(invalidBlocks.map((block) => block.index))}`);
    }

    public isValid(block: Block): boolean {
        return block.index === 0
            ? block.hash === this.hashCalculator.calculateHash(this.toUnhashed(block))
            : block.hash === this.hashCalculator.calculateHash(this.toUnhashed(block))
                && block.prevHash === this.chain[block.index - 1].hash;
    }

    private toUnhashed(block: Block): UnhashedBlock {
        const unhashed = {...block};
        delete unhashed.hash;
        return unhashed;
    }
}
