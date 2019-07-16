import * as sha256 from "sha256";

export class Block {
    hash: string;
    nonce = 0;
    constructor(public index: number,
                public timestamp: number,
                public data: string,
                public prevHash: string) {
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return sha256(`${this.index}${this.timestamp}${this.data}${this.prevHash}${this.nonce}`)
    }

    mineBlock(difficulty: number) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: ", this.hash);
    }
}
