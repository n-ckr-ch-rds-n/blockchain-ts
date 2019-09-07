import {BlockChainValidator} from "../src/block.chain.validator";
import {FileService} from "../src/file.service";
import {HashCalculator} from "../src/hash.calculator";
import {MockLogger} from "./mock.logger";

describe("Blockchain validator", () => {
    let blockchainValidator: BlockChainValidator;
    let mockFileService: FileService;
    let mockHashCalculator: HashCalculator;
    let mockLogger: MockLogger;

    beforeEach(() => {
        mockFileService = {
            getChain: (fileName: string) => ({
                difficulty: 0,
                chain: [{
                    hash: "foo",
                    index: 0,
                    nonce: 0,
                    prevHash: "bar",
                    timeStamp: "baz",
                    data: "foobar"
                }]
            })
        } as FileService;
        mockHashCalculator = {
            calculateHash: () => "foobar"
        };
        mockLogger = new MockLogger();
        blockchainValidator = new BlockChainValidator(mockFileService, mockHashCalculator, mockLogger);
    });
});
