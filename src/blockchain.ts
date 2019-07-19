import {Block} from "./block";

export interface Blockchain {
    difficulty: string;
    chain: Block[];
}
