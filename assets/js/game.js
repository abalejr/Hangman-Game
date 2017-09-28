$(document).ready(function(){
    //establish the list of words as a  Global variable
    var words = [{word:"Corneria", img:"", win:"Former Army Base", song:""},
                {word:"Meteo", img:"", win:"Ateroid Belt", song:""},
                {word:"Sector Y", img:"", win:"Enter Star Wolf", song:""},
                {word:"Fichina", img:"", win:"Former Defense Base", song:""},
                {word:"Katina", img:"", win:"Frontline Base", song:""},
                {word:"Aquas", img:"", win:"Terror of the Deep", song:""},
                {word:"Sector X", img:"", win:"Space Base", song:""},
                {word:"Solar", img:"", win:"The Sun", song:""},
                {word:"Zoness", img:"", win:"Toxic Waste Area", song:""},
                {word:"Titania", img:"", win:"Arid Desert", song:""},
                {word:"Macbeth", img:"", win:"Venom Army Supply Base", song:""},
                {word:"Sector Z", img:"", win:"Great Fox Ambush", song:""},
                {word:"Bolse", img:"", win:"The Last Hurrah", song:""},
                {word:"Area Six", img:"", win:"Defense Station", song:""},
                {word:"Venom", img:"", win:"Andross' Homeworld", song:""}];
    //establish currentWord and its div as Global Variables
    var currentWord = "";
    var currentWordDiv = $("#current-word");
    var currentWordIndex = Math.floor(Math.random()*words.length);
    var winMessageDiv = $("#win-message");

    var newCurrentWord = function() {
        //Clear #current-word element to make room for new word
        currentWordDiv.empty();
        //Check if pickedWord matches currentWord, and run the next 2 lines of code over and over until that is not the case
        //Pick a random word from the list
        var pickedWord = words[currentWordIndex].word.toUpperCase();
        while (pickedWord == currentWord) {
            //If pickedWord is the same as the currentWord, randomly pick a new one
            currentWordIndex = Math.floor(Math.random()*words.length);
            pickedWord = words[currentWordIndex].word.toUpperCase();
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
        var pressedCharacter = String.fromCharCode(e.which);
        //First, start looping through each letter of currentWord
        for (var i = 0; i < currentWord.length; i++) {
            //Check to see if tthe pressed character is present in currentWord
            if (pressedCharacter == currentWord[i]) {
                //Define a local variable for the selector of the <div> containing a matched letter
                var matchedLetterDiv = $("#" + i.toString());
                //Show that character
                if (matchedLetterDiv.text() != " ") {
                    matchedLetterDiv.text(pressedCharacter);
                }
            }
        }
        if (currentWordDiv.text() == currentWord) {
            winMessageDiv.html(words[currentWordIndex].win + "<br><div id=\"win-sub\">Click Anywhere for a New Word.</div>");
        }
    });

    $(document).click(function() {
        if (currentWordDiv.text() == currentWord) {
            winMessageDiv.text(words[currentWordIndex].win);
            newCurrentWord();
        }
    });

    //TESTS - everything below here is added just to test functionality
    //Handler below makes it easy to test newCurrentWord function - just click anywhere on the page to run newCurrentWord
});
