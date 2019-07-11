import {BlockChainCreator} from "./src/block.chain.creator";
import {BlockCreator} from "./src/block.creator";
import {FileService} from "./src/file.service";

const blockCreator  = new BlockCreator();
const fileService = new FileService();
const chainCreator = new BlockChainCreator(blockCreator, fileService);
const args = process.argv.slice(2);
const fileName = args[0];

if (!fileName) {
    console.log("Error: a filename is required to create blockchain");
} else {
    try {
        chainCreator.createBlockchain(fileName)
            .then(() => console.log(`Chain created at blockchains/${fileName}.json`))
    } catch(err) {
        console.log(err)
    }
}
