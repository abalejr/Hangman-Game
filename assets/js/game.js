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
    var guessedDiv = $("#guessed");
    var guessLeftDiv = $("#guess-left");
    var winsSpan = $("#wins");
    var wins = 0;
    var guessLeft = 0;
    console.log(guessLeft);

    var newCurrentWord = function() {
        //Clear #current-word to make room for new word
        currentWordDiv.empty();
        guessedDiv.empty();
        guessLeft = 6;
        guessLeftDiv.text(guessLeft);
        //Pick a random word from the list
        var pickedWord = words[currentWordIndex].word.toUpperCase();
        //Check if pickedWord matches currentWord, and run the next 2 lines of code over and over until that is not the case
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
                //If it is a space, remove the border from the div
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
        //Check if the key pressed is a letter
        if (47 < e.which && e.which < 91) {
            //if so, convert that letter to a string
            var pressedLetter = String.fromCharCode(e.which);
            //First, start looping through each letter of currentWord
            if (currentWord.indexOf(pressedLetter) > -1) {
                for (var i = 0; i < currentWord.length; i++) {
                    //Check to see if the pressed character is present in currentWord
                    if (pressedLetter == currentWord[i]) {
                        //Define a local variable for the selector of the <div> containing a matched letter
                        var matchedLetterDiv = $("#" + i.toString());
                        //Unless that charachter is a space, show that character
                        if (matchedLetterDiv.text() != " ") {
                            matchedLetterDiv.text(pressedLetter);
                        }
                    }
                }
            //If there is no match...
            } else {
                //Check if the letter has already been pressed
                if (guessedDiv.text().indexOf(pressedLetter) == -1) {
                    //If not, reduce the number of guesses left, and
                    guessLeft -= 1;
                    //update that on the page
                    guessLeftDiv.text(guessLeft);
                    //then, add a new div with that letter in it
                    guessedDiv.append("<div>" + pressedLetter + "</div");
                }
                if (guessLeft == 0) {
                    winMessageDiv.html("Mission Failed<br><div id=\"win-sub\">Click Anywhere for a New Word.</div>");
                }
            }
            //Check if the word has been completed
            if (currentWordDiv.text() == currentWord) {
                //If so, increase the number of wins by 1 and update that on the page
                wins += 1;
                winsSpan.text(wins);
                //replace #win-message with the win property of the current word and the Click for New Word message
                winMessageDiv.html(words[currentWordIndex].win + "<br><div id=\"win-sub\">Click Anywhere for a New Word.</div>");
            }
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
