import {expect} from "chai";
import {describe} from "mocha";
import {Block} from "../src/block";
import {BlockChainValidator} from "../src/block.chain.validator";
import {FileService} from "../src/file.service";
import {HashCalculator} from "../src/hash.calculator";
import {MockLogger} from "./mock.logger";

describe("Blockchain validator", () => {
    let blockchainValidator: BlockChainValidator;
    let mockFileService: FileService;
    let mockHashCalculator: HashCalculator;
    let mockLogger: MockLogger;
    let mockGenesisBlock: Block;
    let mockGenesisBlockHash: string;

    beforeEach(() => {
        mockGenesisBlockHash = "foo";
        mockGenesisBlock = {
            hash: mockGenesisBlockHash,
            index: 0,
            nonce: 0,
            prevHash: "bar",
            timeStamp: "baz",
            data: "foobar"
        };
        mockFileService = {
            getChain: (fileName: string) => ({
                difficulty: 0,
                chain: [mockGenesisBlock]
            })
        } as FileService;
        mockHashCalculator = {
            calculateHash: () => mockGenesisBlockHash
        };
        mockLogger = new MockLogger();
        blockchainValidator = new BlockChainValidator(mockFileService, mockHashCalculator, mockLogger);
    });

    it("Checks whether genesis blocks are valid", () => {
        expect(blockchainValidator.isValid(mockGenesisBlock)).to.eql(true);
        mockHashCalculator.calculateHash = () => "bar";
        expect(blockchainValidator.isValid(mockGenesisBlock)).to.eql(false);
    });
});
