//
// this is just a stub for a function you need to implement
//
function getStats(txt) {
    let listOfPalindromes = [];
    let longestWords = [];
    let lineInfo = getLineInfo(txt);
    //let tenLongestWords = [];
    let wordInfo = getWordInfo(txt, listOfPalindromes, longestWords);

    return {
        nChars: getNChars(txt),
        nWords: wordInfo.nWords,
        nLines: getNLines(txt),
        nNonEmptyLines: lineInfo.numNonEmptyLines,
        averageWordLength: wordInfo.avgWLength,
        maxLineLength: lineInfo.maximumLength,
        palindromes: Array.from(new Set(listOfPalindromes)),
        longestWords: Array.from(new Set(wordInfo.sortedArr)),
        mostFrequentWords: wordInfo.tenMostFreqWords
    };
}

function getNChars(txt){
    return txt.length;
}

function getWordInfo(txt, listOfPalindromes, longestWords){
    txt = txt.toLowerCase();
    let noSpaceNoCommasTxt=txt.split(/[\s\W]/);
    let EmptyCount = 0;
    let charCountOfWord= 0;
    let numberOfWords;
    let averageWordL;
    let tenLongestWords = [];
 //   let items = []
    for(let i=0; i < noSpaceNoCommasTxt.length;i++){
        if( noSpaceNoCommasTxt[i] === ""){
            EmptyCount++;
        }
        else{
     //       console.log(noSpaceNoCommasTxt[i] + ":" + noSpaceNoCommasTxt[i].length);
            charCountOfWord = charCountOfWord + noSpaceNoCommasTxt[i].length;
            // Add this word to the longestWordArray
            longestWords.push(noSpaceNoCommasTxt[i]);

            //Can also check to see if the word is a palindrome here if the word is longer than 2 characters
            if(noSpaceNoCommasTxt[i].length >= 3){
                // check to see if the word is a palindrome, and record it as a palindrome if it is
    //            console.log('checking to see if this is a palindrome:' + noSpaceNoCommasTxt[i]);
                getPal(noSpaceNoCommasTxt[i], listOfPalindromes);
            }
        }
    }
    numberOfWords = noSpaceNoCommasTxt.length - EmptyCount;
    averageWordL = charCountOfWord/numberOfWords;
    //sort all of the words we have based on their length first and then based on their character set
    console.log(longestWords);
    longestWords.sort(compareLength);
    //console.log("\n sorted");
   // console.log(longestWords.reverse());
    //tenLongestWords[];
    // get the 10 longest words 
    for(let i=0; (i < 10) && (i < Array.from(new Set(longestWords)).length); i++){
        tenLongestWords.push(Array.from(new Set(longestWords))[i]);
    }
    console.log(tenLongestWords);

    let listOfWordsAndCountsMap = createWordMap(longestWords);
  //  console.log("word Map");
    //console.log(listOfWordsAndCountsMap);

    let wordsToSortByCount = [];
    // turn the map into key value pairs
    wordsToSortByCountArray = Object.keys(listOfWordsAndCountsMap).map(function(key){
        return{
            word: key,
            count: listOfWordsAndCountsMap[key]
        };
    });
    
   // console.log("words to sort by count");
   // console.log(wordsToSortByCount);

    let sortedByWordCountArr = wordsToSortByCountArray.sort(sortMap);
    //console.log("sorted by word count arr");
    //console.log(sortedByWordCountArr);


    let tenMostFrequentWords = [];
    for(let i = 0; (i < 10) && (i < sortedByWordCountArr.length); i++ ){
        tenMostFrequentWords[i] = sortedByWordCountArr[i].word + "(" +sortedByWordCountArr[i].count + ")";
    }

    //console.log(tenMostFrequentWords);

    //now we need to pass in our list of words and create a map of it
    return {nWords: numberOfWords, avgWLength: averageWordL, sortedArr: tenLongestWords, tenMostFreqWords : tenMostFrequentWords};
}

function getNLines(txt){
    return txt.split(/\n/).length;
}

function getLineInfo(txt){
    let lineDeliminatedTxt = txt.split(/\n/);
    let emptyCount = 0;
    let maxLength = 0;
//    console.log('in getNonEmptyLines');
    for(let i=0; i < lineDeliminatedTxt.length;i++){
    //    console.log(lineDeliminatedTxt[i]);
        //if we have an empty line containing only white space then increment empty counter
        if(lineDeliminatedTxt[i] === "" || !lineDeliminatedTxt[i].trim()){
            emptyCount++;
         //   console.log('removed empty space');
        }
        //check the length of the line
        else{
            getNChars(lineDeliminatedTxt[i]) > maxLength ? (maxLength= getNChars(lineDeliminatedTxt[i])) : maxLength = maxLength;
        }
    }
    //console.log(maxLength);
    return {numNonEmptyLines: lineDeliminatedTxt.length - emptyCount, maximumLength:maxLength};
}

function getPal(txt, listOfPalindromes){
    let normalizedTxt = txt.toLowerCase();
    let wordArray = normalizedTxt.split("");
    //let wordArrayCopy = txt.split("");
    // note to self: the reversal is done in place... AKA wordArray is reversed
    let reverseArr = normalizedTxt.split("").reverse();

    for(let j= 0; j < wordArray.length; j++){
        if(!(wordArray[j]===reverseArr[j])){
 //           console.log('breaking');
            break;
        }
        else if( j === wordArray.length-1){
  //          console.log("we have a palindrome");
            listOfPalindromes.push(normalizedTxt);
        }
        else{
            continue;
        }
    }
}


function compareLength(a, b){
    if (a.length > b.length){
        return -1;
    }
    if (a.length < b.length){
        return 1;
    }

    if(a.toLowerCase() < b.toLowerCase()){
        return -1
    }

    if(a.toLowerCase() > b.toLowerCase()){
        return 1
    }

        // if they are the same length, then sort the two strings based on their character values
        //sort(a,b);
        //if()
        // words are identical
        return 0;

}

function sortMap(a,b){


    if (a.count > b.count){
        return -1;
    }
    if (a.count < b.count){
        return 1;
    }

    if(a.word.toLowerCase() < b.word.toLowerCase()){
        return -1
    }

    if(a.word.toLowerCase() > b.word.toLowerCase()){
        return 1
    }

        // if they are the same length, then sort the two strings based on their character values
        //sort(a,b);
        //if()
        // words are identical
        return 0;

}
// This map maintains a count of each word that is passed in 
/*
I followed the tutorial on this blog to learn how to implement maps
in javascript 
the blog: http://chrisjopa.com/2016/04/21/counting-word-frequencies-with-javascript/

*/
function createWordMap (arrayOfWords) {

    var myWordMap = {};

    arrayOfWords.forEach(function(key){
        if(myWordMap.hasOwnProperty(key)){
            myWordMap[key]++;
        }else{
            myWordMap[key] = 1;
        }
    });

    
    // implemented it my own way to make underlying implementation more clear
    /*
    for(let i=0; i < arrayOfWords.length; i++){
        if(myWordMap.hasOwnProperty(arrayOfWords[i])){
            myWordMap[arrayOfWords[i]]++;
        }else{
            myWordMap[arrayOfWords[i]]= 1;
        }
    }
    */
    return myWordMap;
}
