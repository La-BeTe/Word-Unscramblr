class WordUnscramblr{
    /*
     * Constructor
     * 
     * @param array wordsArray - An array of words which serve as a dictionary for lookup when unscrambling
     * 
     * @returns WordUnscramblr
     * 
     */
    constructor(wordsArray){
        try{
            if(!wordsArray.length) throw "wordsArray must at least contain one word";
            this.addWords(wordsArray);
        }catch(e){
            if(typeof e === "string" && e === "addWords method expects a string or an array argument"){
                throw "Failed to initialize Word Unscramblr, please provide an array of words to constructor";
            }
            else throw e;
        }
    }
    /*
     * AddWords
     *
     * @param string/array words - A string or array containing words to be added to the dictionary
     * 
     * @retruns void
     */
    addWords(words){
        if(typeof words === "string") words = [words];
        if(!Array.isArray(words)) throw "addWords method expects a string or an array argument";
        for(let word of words){
            if(!this[word.length]) this.length = (this.length || 0) + 1;
            this[word.length] = this[word.length] || new Set([]);
            this[word.length].add(word);
        }
    }
    /*
     * Unscramble
     * 
     * Unscrambles a word and returns an array of unscrambled words
     *
     * @param string/array scrambled - The word or array of words to be unscrambled
     * 
     * @returns array/object - An array of unscrambled words or an object with key/value pairs of scrambled input and array of unscrambled words
     * 
     */
    unscramble(scrambled){
        if(typeof scrambled === "string") scrambled = [scrambled];
        if(!Array.isArray(scrambled)) throw "Unscramble method works for only strings and arrays";
        if(!scrambled.length) throw "Array passed to unscramble method is empty";
        let result = {};
        scrambled.forEach(scrambledWord=>{
            let neededWords = Array.from(this[scrambledWord.length]);
            if(!neededWords) return console.log("Failed to find word in dictionary");
            let scrambledMap = {};
            scrambledWord.split("").forEach(char=> scrambledMap[char] = (scrambledMap[char] || 0) + 1);
            neededWords = neededWords.filter(word=>{
                let wordMap = {};
                for(let char of word){
                    if(!scrambledWord.includes(char)) return false;
                    wordMap[char] = (wordMap[char] || 0) + 1;
                    if(wordMap[char] > scrambledMap[char]){
                        return false;
                    }
                }
                return true;
            });   
            result[scrambledWord] = neededWords;
        });
        return Object.keys(result).length === 1 ? result[scrambled[0]] : result;
    }
    /*
     * Scramble
     *
     * @param string/array stringsToScramble - A string or and array of strings to be scrambled
     * 
     * @returns string/array result - A scrambled string or an array of scrambled strings
     * 
     */
    scramble(stringsToScramble){
        if(typeof stringsToScramble === "string") stringsToScramble = [stringsToScramble];
        if(!Array.isArray(stringsToScramble)) throw "Scramble method works for only strings and arrays";
        if(!stringsToScramble.length) throw "Array passed to scramble method is empty";
        let result = stringsToScramble.map(string=>{
            this.addWords(string);
            let newStr = "", duplicateStr = string, i = 0;
            while(i < string.length){
                let randNum = Math.floor(Math.random() * duplicateStr.length);
                newStr += duplicateStr[randNum];
                let duplicateArr = duplicateStr.split("");
                duplicateArr.splice(randNum, 1);
                duplicateStr = duplicateArr.join("");
                i++;
            }
            if(newStr === string) return this.scramble(newStr);
            return newStr;
        });
        return result.length === 1 ? result[0] : result;
    }

    *[Symbol.iterator](){
        for(let key of Object.keys(this)){
            key = Number(key);
            if(key && this[key]){
                yield this[key];
            }
        }
    }
}

export default WordUnscramblr;