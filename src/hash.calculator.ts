import * as sha256 from "sha256";
import {UnhashedBlock} from "./unhashed.block";

export class HashCalculator {
    calculateHash(unhashedBlock: UnhashedBlock): string {
        return sha256(`
            ${unhashedBlock.data}
            ${unhashedBlock.index}
            ${unhashedBlock.prevHash}
            ${unhashedBlock.timeStamp}
            ${unhashedBlock.nonce}`
        );
    }
}
