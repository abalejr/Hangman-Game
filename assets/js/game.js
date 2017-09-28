$(document).ready(function(){
    //establish currentWord as a Global Variable
    var currentWord = "";
    //establish the list of words as a  Global variable
    var words = [{word:"Corneria", img:"", win:"", song:""},
                {word:"Meteo", img:"", win:"", song:""},
                {word:"Sector Y", img:"", win:"", song:""},
                {word:"Fichina", img:"", win:"", song:""},
                {word:"Katina", img:"", win:"", song:""},
                {word:"Aquas", img:"", win:"", song:""},
                {word:"Sector X", img:"", win:"", song:""},
                {word:"Solar", img:"", win:"", song:""},
                {word:"Zoness", img:"", win:"", song:""},
                {word:"Titania", img:"", win:"", song:""},
                {word:"Macbeth", img:"", win:"", song:""},
                {word:"Sector Z", img:"", win:"", song:""},
                {word:"Bolse", img:"", win:"", song:""},
                {word:"Area Six", img:"", win:"", song:""},
                {word:"Venom", img:"", win:"", song:""}];
    var currentWordDiv = $("#current-word");

    var newCurrentWord = function() {
        //Clear #current-word element to make room for new word
        currentWordDiv.empty();
        //Pick a random word from the list
        var pickedWord = words[Math.floor(Math.random()*words.length)].word.toUpperCase();
        //Check if pickedWord matches currentWord, and run the next 2 lines of code over and over until that is not the case
        while (pickedWord == currentWord) {
            //If pickedWord is the same as the currentWord, randomly pick a new one
            pickedWord = words[Math.floor(Math.random()*words.length)].word.toUpperCase();
        }
        //Once pickedWord is different than currentWord, make it the new currentWord
        currentWord = pickedWord;
        //Start looping through each letter in currentWord
        for (var i = 0; i < currentWord.length; i++) {
            //Add a <div> tag inside the #current-word element for each letter
            currentWordDiv.append("<div id=\"" + i + "\">" + currentWord[i] + "</div>");
            //Define a local variable for the selector of the <div> containing the current letter
            var currentLetterDiv = $("#" + i.toString());
            //Check if that div DOES NOT contain a space
            if (currentLetterDiv.text() != " ") {
                //Remove the letter from the div if it is not a space
                currentLetterDiv.empty();
            } else {
                currentLetterDiv.attr("style", "border-bottom: 0");
            }
        }
        //Output currentWord to console to test function
        console.log(currentWord);
    };
    //Run this when the page loads, so players can jump in right away
    newCurrentWord();


    //Listen for keyboard key to be released
    $(document).keyup(function(e) {
        //First, start looping through each letter of currentWord
        for (var i = 0; i < currentWord.length; i++) {
            //Check to see if tthe pressed character is present in currentWord
            if (String.fromCharCode(e.which) == currentWord[i]) {
                //Define a local variable for the selector of the <div> containing a matched letter
                var matchedLetterDiv = $("#" + i.toString());
                //Show that character
                if (matchedLetterDiv.text() != " ") {
                    matchedLetterDiv.text(String.fromCharCode(e.which));
                }
            }
        }
        if (currentWordDiv.text() == currentWord) {
            $("#win-message").text();
        }
    });

    $(document).click(function() {
        if (currentWordDiv.text() == currentWord) {
            newCurrentWord();
        }
    });

    //TESTS - everything below here is added just to test functionality
    //Handler below makes it easy to test newCurrentWord function - just click anywhere on the page to run newCurrentWord
});