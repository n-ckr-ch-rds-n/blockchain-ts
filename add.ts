import {BlockChainCreator} from "./src/block.chain.creator";
import {BlockCreator} from "./src/block.creator";
import {FileService} from "./src/file.service";

const blockCreator  = new BlockCreator();
const fileService = new FileService();
const chainCreator = new BlockChainCreator(blockCreator, fileService);
const args = process.argv.slice(2);
const fileName = args[0];
const data = args[1];

if (!fileName) {
    console.log("Error: a filename is required");
} else if (!data) {
    console.log("Error: data is required to create a block");
} else {
    try {
        chainCreator.addBlockToChain(fileName, data)
            .then(() => console.log(`Added block`))
    } catch(err) {
        console.log(err)
    }
}
