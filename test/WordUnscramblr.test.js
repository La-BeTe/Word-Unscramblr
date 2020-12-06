import WordUnscramblr from "../WordUnscramblr.js";
import fs from "fs";
import chai from "chai";

const assert = chai.assert;

describe("Word Unscramblr", ()=>{
    let testWordUnscramblr;
    let testString = "assassination";
    let testScrambledString = "aniassansoits";

    before(()=>{
        // let words = fs.readFileSync("./dictionary.txt", "utf8").split(",");
        testWordUnscramblr = new WordUnscramblr([testString]);
    });

    it("should scramble testString", ()=>{
        let result = testWordUnscramblr.scramble(testString);
        assert.notStrictEqual(result, testString);
    });

    it("should unscramble testScrambledString", ()=>{
        let result = testWordUnscramblr.unscramble(testScrambledString);
        assert.strictEqual(result[0], testString);
    });

    it("should add an unknown string to dictionary on scrambling", ()=>{
        testWordUnscramblr.addWords("randomStringToTest");
        assert.strictEqual(testWordUnscramblr.length, 2);
    });

    describe("should throw", ()=>{
        it("when scrambling or unscrambling an empty array", ()=>{
            assert.throws(()=>{
                let result = testWordUnscramblr.scramble([]);
            });

            assert.throws(()=>{
                let result = testWordUnscramblr.scramble([]);
            });
        });

        it("when non-array and non-string arguments are passed to scramble or unscramble methods", ()=>{
            assert.throws(()=>{
                let result = testWordUnscramblr.scramble(1);
            });

            assert.throws(()=>{
                let result = testWordUnscramblr.unscramble(1);
            });
        });
    });
})