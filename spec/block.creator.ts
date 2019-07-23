import {expect} from "chai";
import {describe} from "mocha";
import {BlockCreator} from "../src/block.creator";
import {HashCalculator} from "../src/hash.calculator";
import {Logger} from "../src/logger";

describe("Block creator", () => {
    let creator: BlockCreator;
    let mockCalculator: HashCalculator;
    let mockLogger: Logger;
    let difficulty: number

    beforeEach(() => {
        mockCalculator = {
            calculateHash: () => "00123098"
        } as HashCalculator;
        mockLogger = {
            logSuccess: (message) => {console.log(`${message}`);},
            logHash: (hash) => {console.log(`${hash}`);}
        } as Logger;
        creator = new BlockCreator(mockCalculator, mockLogger);
    });

    it("Calculates the hash prefix", () => {
        difficulty = 4;
        const prefix = creator.toHashPrefix(difficulty);
        expect(prefix.length).to.eql(difficulty);
        for (const value of prefix.split("")) {
            expect(value).to.eql("0");
        }
    });
})
