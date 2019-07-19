#!/usr/bin/env ts-node
import * as program from "commander";
import {BlockChainCreator} from "./src/block.chain.creator";
import {BlockChainValidator} from "./src/block.chain.validator";
import {BlockCreator} from "./src/block.creator";
import {ErrorMessage} from "./src/error.message";
import {FileService} from "./src/file.service";
import {HashCalculator} from "./src/hash.calculator";
import {Logger} from "./src/logger";
import {SuccessMessage} from "./src/success.message";

program
    .option("-i, --init <filename>", "Initialise blockchain")
    .option("-d --difficulty [difficulty]", "Mining difficulty")
    .option("-a --add [data]", "Add a block")
    .option("-f --filename <filename>", "Filename")
    .option("-v --validate", "Validate block")
    .parse(process.argv);

const logger = new Logger();
const fileService = new FileService(logger);
const hashCalculator = new HashCalculator();
const blockCreator = new BlockCreator(hashCalculator, logger);
const chainCreator = new BlockChainCreator(blockCreator, fileService);
const chainValidator = new BlockChainValidator(fileService, hashCalculator, logger);
const defaultDifficulty = 2;

function filenameSupplied(): boolean {
    return !!program.filename;
}

if (program.init) {
    chainCreator.createBlockchain(program.init, program.difficulty || defaultDifficulty)
        .then(() => logger.logSuccess(SuccessMessage.blockchainCreated))
        .catch((err) => logger.logError(err));
}

if (program.add) {
    if (filenameSupplied()) {
        chainCreator.addBlockToChain(program.filename, program.add)
            .then(() => logger.logSuccess(SuccessMessage.blockAdded))
            .catch((err) => logger.logError(err));
    } else {
        logger.logError(ErrorMessage.noFilename);
    }
}

if (program.validate) {
    if (filenameSupplied()) {
        chainValidator.validateBlock(program.filename);
    } else {
        logger.logError(ErrorMessage.noFilename);
    }
}
