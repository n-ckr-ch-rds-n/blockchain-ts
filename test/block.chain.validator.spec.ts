import {expect} from "chai";
import {describe} from "mocha";
import {Block} from "../src/block";
import {BlockChainValidator} from "../src/block.chain.validator";
import {ErrorMessage} from "../src/error.message";
import {FileService} from "../src/file.service";
import {HashCalculator} from "../src/hash.calculator";
import {SuccessMessage} from "../src/success.message";
import {MockLogger} from "./mock.logger";

describe("Blockchain validator", () => {
    let blockchainValidator: BlockChainValidator;
    let mockFileService: FileService;
    let mockHashCalculator: HashCalculator;
    let mockLogger: MockLogger;
    let mockGenesisBlock: Block;
    let mockNonGenesisBlock: Block;
    let mockGenesisBlockHash: string;
    let mockNonGenesisBlockHash: string;
    let mockChain: Block[];

    beforeEach(() => {
        mockGenesisBlockHash = "foo";
        mockNonGenesisBlockHash = "bar";
        mockGenesisBlock = {
            hash: mockGenesisBlockHash,
            index: 0,
            nonce: 0,
            prevHash: "bar",
            timeStamp: "baz",
            data: "foobar"
        };
        mockNonGenesisBlock = {
            hash: mockNonGenesisBlockHash,
            index: 1,
            nonce: 0,
            prevHash: mockGenesisBlockHash,
            timeStamp: "baz",
            data: "foobar"
        };
        mockChain = [mockGenesisBlock, mockNonGenesisBlock];
        mockFileService = {
            getChain: (fileName: string) => ({
                difficulty: 0,
                chain: mockChain
            })
        } as FileService;
        mockHashCalculator = {
            calculateHash: () => mockGenesisBlockHash
        };
        mockLogger = new MockLogger();
        blockchainValidator = new BlockChainValidator(mockFileService, mockHashCalculator, mockLogger, "foobar");
    });

    it("Checks whether genesis blocks are valid", () => {
        expect(blockchainValidator.isValid(mockGenesisBlock)).to.eql(true);
        mockHashCalculator.calculateHash = () => "bar";
        expect(blockchainValidator.isValid(mockGenesisBlock)).to.eql(false);
    });

    it("Checks whether non-genesis blocks are valid", () => {
        expect(blockchainValidator.isValid(mockNonGenesisBlock)).to.eql(false);
        mockHashCalculator.calculateHash = () => mockNonGenesisBlockHash;
        expect(blockchainValidator.isValid(mockNonGenesisBlock)).to.eql(true);
        mockNonGenesisBlock.hash = "baz";
        expect(blockchainValidator.isValid(mockNonGenesisBlock)).to.eql(false);
    });

    // it("Validates blockchains", () => {
    //     let chainValidMessage: string;
    //     mockLogger.logSuccess = (message: string) => chainValidMessage = message;
    //     mockLogger.logError = (message: string) => chainValidMessage = message;
    //     const mockFilename = "foobar";
    //     blockchainValidator.validateBlock(mockFilename);
    //     expect(chainValidMessage).to.eql(SuccessMessage.chainValid);
    //     mockChain.push(mockNonGenesisBlock);
    //     blockchainValidator.validateBlock(mockFilename);
    //     expect(chainValidMessage.startsWith(ErrorMessage.chainInvalid)).to.eql(true);
    //     expect(chainValidMessage.endsWith("[1]")).to.eql(true);
    // });
});
