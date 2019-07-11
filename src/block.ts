import * as sha256 from "sha256";

export class Block {
    thisHash: string;
    constructor(public index: number,
                public timestamp: number,
                public data: string,
                public prevHash: string) {
        this.thisHash = sha256(`${this.index}${this.timestamp}${this.data}${this.prevHash}`)
    }
}
