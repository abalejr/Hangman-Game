$(document).ready(function(){
    //establish the list of words as a  Global variable
    var words = [{word:"Corneria", img:"assets/img/Corneria.jpg", win:"Former Army Base", song:"assets/audio/09-corneria.mp3"},
                {word:"Meteo", img:"assets/img/Meteo.jpg", win:"Ateroid Belt", song:"assets/audio/11-meteo.mp3"},
                {word:"Sector Y", img:"assets/img/Sectory.jpg", win:"Enter Star Wolf", song:"assets/audio/12-sector-y-and-solar.mp3"},
                {word:"Fichina", img:"assets/img/Fichina.jpg", win:"Former Defense Base", song:"assets/audio/10-fichina-and-sector-z.mp3"},
                {word:"Katina", img:"assets/img/Katina.jpg", win:"Frontline Base", song:"assets/audio/13-katarina.mp3"},
                {word:"Aquas", img:"assets/img/Aquas.jpg", win:"Terror of the Deep", song:"assets/audio/14-aquas.mp3"},
                {word:"Sector X", img:"assets/img/Sectorx.jpg", win:"Space Base", song:"assets/audio/15-sector-x.mp3"},
                {word:"Solar", img:"assets/img/Solar.jpg", win:"The Sun", song:"assets/audio/12-sector-y-and-solar.mp3"},
                {word:"Zoness", img:"assets/img/Zoness.jpg", win:"Toxic Waste Area", song:"assets/audio/16-zoness.mp3"},
                {word:"Titania", img:"assets/img/Titania.jpg", win:"Arid Desert", song:"assets/audio/17-titania-and-macbeth.mp3"},
                {word:"Macbeth", img:"assets/img/Macbeth.jpg", win:"Venom Army Supply Base", song:"assets/audio/17-titania-and-macbeth.mp3"},
                {word:"Sector Z", img:"assets/img/Sectorz.jpg", win:"Great Fox Ambush", song:"assets/audio/10-fichina-and-sector-z.mp3"},
                {word:"Bolse", img:"assets/img/Bolse.jpg", win:"The Last Hurrah", song:"assets/audio/19-bolse.mp3"},
                {word:"Area Six", img:"assets/img/Area6.jpg", win:"Defense Station", song:"assets/audio/18-area-6.mp3"},
                {word:"Venom", img:"assets/img/Venom.jpg", win:"Andross' Homeworld", song:"assets/audio/20-venom.mp3"}];
    //establish currentWord and its div as Global Variables
    var currentWord = "";
    var currentWordDiv = $("#current-word");
    var currentWordIndex = Math.floor(Math.random()*words.length);
    var winMessageDiv = $("#win-message");
    var guessedDiv = $("#guessed");
    var guessLeftDiv = $("#guess-left");
    var winsSpan = $("#wins");
    var displayDiv = $("#display");
    var song = $("#song");
    var wins = 0;
    var guessLeft = 6;

    var NewCurrentWord = function() {
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
        //Once pickedWord is different than currentWord, make it the new currentWord and...
        currentWord = pickedWord;
        //Display the image for the current word and...
        displayDiv.html("<img src=\"" + words[currentWordIndex].img + "\" />");
        //Play the song for the current word
        song.attr("src", words[currentWordIndex].song);
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
    };
    //Run this when the page loads, so players can jump in right away
    NewCurrentWord();


    //Listen for keyboard key to be released
    var Guess = function(e) {
        if (currentWordDiv.text() != currentWord && guessLeft != 0) {
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
                    //Check if there are no guesses left
                    if (guessLeft == 0) {
                        //if so, display the Mission Failed and Click for New Word messages and...
                        winMessageDiv.html("Mission Failed <br><div id=\"win-sub\">Click Anywhere for a New Word.</div>");
                        //Play the Mission Failed music
                        song.attr("src", "assets/audio/35-mission-failed.mp3");
                    }
                }
                //Check if the word has been completed
                if (currentWordDiv.text() == currentWord) {
                    //If so, increase the number of wins by 1 and update that on the page
                    wins += 1;
                    winsSpan.text(wins);
                    //replace #win-message with the win property of the current word and the Click for New Word message and...
                    winMessageDiv.html(words[currentWordIndex].win + "<br><div id=\"win-sub\">Click Anywhere for a New Word.</div>");
                    //play the Mission Accomplished music
                    song.attr("src", "assets/audio/34-mission-accomplished.mp3");
                }
            }
        }
    };

    $(document).keyup(Guess);

    //Whenever someone clicks...
    $(document).click(function() {
        //Check if the player has won or lost
        if (currentWordDiv.text() == currentWord || guessLeft == 0) {
            //If so, remove the Click for New Word text and...
            winMessageDiv.text(words[currentWordIndex].win);
            //Pick a new word
            NewCurrentWord();
        }
    });

    //TESTS - everything below here is added just to test functionality
    //Handler below makes it easy to test newCurrentWord function - just click anywhere on the page to run newCurrentWord
});
