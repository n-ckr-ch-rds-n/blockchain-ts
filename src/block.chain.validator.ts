import {Block} from "./block";
import {FileService} from "./file.service";

export class BlockChainValidator {
    chain: Block[];

    constructor(private fileService: FileService) {
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
        return block.hash === block.calculateHash() && block.prevHash === this.chain[block.index - 1].hash;
    }
}
