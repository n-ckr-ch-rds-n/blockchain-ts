import {Block} from "./block";
import {ErrorMessage} from "./error.message";
import {FileService} from "./file.service";
import {HashCalculator} from "./hash.calculator";
import {Logger} from "./logger";
import {SuccessMessage} from "./success.message";
import {UnhashedBlock} from "./unhashed.block";

export class BlockChainValidator {
    chain: Block[];

    constructor(private fileService: FileService,
                private hashCalculator: HashCalculator,
                private logger: Logger,
                private fileName: string) {
        this.chain = this.fileService.getChain(fileName).chain;
    }

    public validateBlock(): void {
        let chainValid: boolean = true;
        const invalidBlocks: Block[] = [];
        this.chain.forEach((block) => {
            if (!this.isValid(block)) {
                chainValid = false;
                invalidBlocks.push(block);
            }
        });
        this.logMessages(chainValid, invalidBlocks);
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

    private logMessages(chainValid: boolean, invalidBlocks: Block[]): void {
        chainValid
            ? this.logger.logSuccess(SuccessMessage.chainValid)
            : this.logger.logError(`${ErrorMessage.chainInvalid}` +
                `${JSON.stringify(invalidBlocks.map((block) => block.index))}`);
    }
}
