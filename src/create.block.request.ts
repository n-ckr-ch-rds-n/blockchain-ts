import {Block} from "./block";

export interface CreateBlockRequest {
    lastBlock: Block;
    data: string;
    difficulty: number;
}
