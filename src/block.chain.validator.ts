import {Block} from "./block";
import {FileService} from "./file.service";

export class BlockChainValidator {
    constructor(private fileService: FileService,
                private fileName: string) {
    }

    get chain(): Block[] {
        return this.fileService.getChain(this.fileName);
    }

    validateBlock(): void {
        this.chain.forEach(block => {
            if (!this.isValid(block)) {
                throw new Error(`Block ${block.index} is invalid`);
            }
        });
    }

    isValid(block: Block): boolean {
        return block.hash === block.calculateHash() && block.prevHash === this.chain[block.index - 1].hash;
    }
}
