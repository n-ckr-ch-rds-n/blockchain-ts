import {Transaction} from "./transaction";
import {Block} from "./block";

export interface BlockChain {
    nodes: string;
    difficulty: number;
    miningReward: number;
    pendingTransactions: Transaction[];
    blocks: Block[];
}
