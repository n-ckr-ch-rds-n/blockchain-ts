import {expect} from "chai";
import {describe} from "mocha";
import {Block} from "../src/block";
import {BlockChainCreator} from "../src/block.chain.creator";
import {BlockCreator} from "../src/block.creator";
import {Blockchain} from "../src/blockchain";
import {FileService} from "../src/file.service";

describe("Blockchain creator", () => {
    let creator: BlockChainCreator;
    let mockBlockCreator: BlockCreator;
    let mockFileService: FileService;
    let mockBlock: Block;

    let saveFilename: string;
    let saveBlock: Blockchain;

    const mockFilename = "barbaz";

    beforeEach(() => {
        mockBlock = {
            index: 0,
            nonce: 0,
            prevHash: "foo",
            timeStamp: "bar",
            data: "baz",
            hash: "foobar"
        };
        mockBlockCreator = {
            createGenesisBlock: () => mockBlock
        } as BlockCreator;
        mockFileService = {
            writeChainToFile: async (fileName: string, chain: Blockchain) => {
                saveFilename = fileName; saveBlock = chain;
            }
        } as FileService;
        creator = new BlockChainCreator(mockBlockCreator, mockFileService)
    });

    it("Creates blockchains", async () => {
        await creator.createBlockchain(mockFilename, 2);
        expect(saveBlock.chain).to.eql([mockBlock]);
        expect(saveBlock.difficulty).to.eql(2);
        expect(saveFilename).to.eql(mockFilename);
    });
});
