import {UnhashedBlock} from "./unhashed.block";

export interface Block extends UnhashedBlock {
    hash: string;
}
