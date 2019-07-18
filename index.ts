#!/usr/bin/env ts-node
import * as program from "commander";
import {BlockChainCreator} from "./src/block.chain.creator";
import {BlockChainValidator} from "./src/block.chain.validator";
import {BlockCreator} from "./src/block.creator";
import {FileService} from "./src/file.service";
import {HashCalculator} from "./src/hash.calculator";

program
    .option("-i, --init <filename>", "Initialise blockchain")
    .option("-a --add [data]", "Add a block")
    .option("-f --filename <filename>", "Filename")
    .option("-v --validate", "Validate block")
    .parse(process.argv);

const fileService = new FileService();
const hashCalculator = new HashCalculator();
const blockCreator = new BlockCreator(hashCalculator);
const chainCreator = new BlockChainCreator(blockCreator, fileService);
const chainValidator = new BlockChainValidator(fileService, hashCalculator);
const noFilename = "Filename is required to perform this operation";

function filenameSupplied(): boolean {
    return !!program.filename;
}

if (program.init) {
    chainCreator.createBlockchain(program.init)
        .then(() => console.log("Blockchain created"))
        .catch((err) => console.log(err));
}

if (program.add) {
    if (filenameSupplied()) {
        chainCreator.addBlockToChain(program.filename, program.add)
            .then(() => console.log("Block added to chain"))
            .catch((err) => console.log(err));
    } else {
        console.log(noFilename);
    }
}

if (program.validate) {
    if (filenameSupplied()) {
        chainValidator.validateBlock(program.filename);
    } else {
        console.log(noFilename);
    }
}
