import {Block} from "./block";

export interface Blockchain {
    difficulty: number;
    chain: Block[];
}
