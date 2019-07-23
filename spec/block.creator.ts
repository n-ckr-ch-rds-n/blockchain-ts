import {expect} from "chai";
import {describe} from "mocha";
import {Block} from "../src/block";
import {BlockCreator} from "../src/block.creator";
import {CreateBlockRequest} from "../src/create.block.request";
import {HashCalculator} from "../src/hash.calculator";
import {Logger} from "../src/logger";

describe("Block creator", () => {
    let creator: BlockCreator;
    let calculator: HashCalculator;
    let logger: Logger;
    let difficulty: number;
    let mockBlock: Block;

    beforeEach(() => {
        calculator = new HashCalculator();
        logger = new Logger();
        mockBlock = {
            index: 0,
            nonce: 0,
            prevHash: "foo",
            timeStamp: new Date().toString(),
            data: "bar",
            hash: "foobar"
        };
        creator = new BlockCreator(calculator, logger);
    });

    it("Makes new blocks", async () => {
        let newBlock: Block;
        let request: CreateBlockRequest;
        difficulty = 2;
        request = { lastBlock: mockBlock, data: "baz", difficulty };
        newBlock = await creator.createNewBlock(request);
        expect(newBlock.index).to.eql(1);
        expect(newBlock.data).to.eql("baz");
        expect(newBlock.hash.startsWith("00")).to.eql(true);
        difficulty = 3;
        request = { lastBlock: mockBlock, data: "baz", difficulty };
        newBlock = await creator.createNewBlock(request);
        expect(newBlock.hash.startsWith("000")).to.eql(true);
    });

    it("Makes genesis blocks", () => {
        const genesisBlock = creator.createGenesisBlock();
        expect(genesisBlock.index).to.eql(0);
        expect(genesisBlock.data).to.eql(creator.genesisData);
    })
});
