#!/usr/bin/env ts-node
import * as program from "commander";
import {BlockChainCreator} from "./src/block.chain.creator";
import {BlockCreator} from "./src/block.creator";
import {FileService} from "./src/file.service";

program
    .option("-i, --init", "Initialise blockchain")
    .option("-f --filename <filename>", "Blockchain filename")
    .parse(process.argv);

const fileService = new FileService()
const blockCreator = new BlockCreator()
const chainCreator = new BlockChainCreator(blockCreator, fileService);

if (program.init) {
    chainCreator.createBlockchain(program.filename)
        .then(() => console.log("Blockchain created"))
        .catch((err) => console.log(err));
}
