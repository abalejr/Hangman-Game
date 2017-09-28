$(document).ready(function(){
    //establish currentWord as a Global Variable
    var currentWord = "";

    var newCurrentWord = function() {
        //establish the list of words as a variable within the newCurrentWord function
        var words = ["Corneria", "Meteo", "Sector Y", "Fichina", "Katina", "Aquas", "Sector X", "Solar", "Zoness", "Titania", "Macbeth", "Sector Z", "Bolse", "Area Six", "Venom"];
        //Clear #current-word element to make room for new word
        $("#current-word").innerHTML = "";
        //Pick a random word from the list
        var pickedWord = words[Math.floor(Math.random()*words.length)].toUpperCase();
        //Check if pickedWord matches currentWord, and run the next 2 lines of code over and over until that is not the case
        while (pickedWord == currentWord) {
            //Test to make sure repeats are being caught
            console.log("pickedWord == currentWord")
            //If pickedWord is the same as the currentWord, randomly pick a new one
            pickedWord = words[Math.floor(Math.random()*words.length)].toUpperCase();
        }
        //Once pickedWord is different than currentWord, make it the new currentWord
        currentWord = pickedWord;
        //Start looping through each letter in currentWord
        for (var i = 0; i < currentWord.length; i++) {
            //Add a <span> tag inside the #current-word element for each letter
            $("#current-word").append("<span id=\"" + i + "\">" + currentWord[i] + "</span>");
        }
        //Make sure those letters are not visible on the page by default
        $("#current-word").children("span").hide();
        //Output currentWord to console to test function
        console.log(currentWord);
    };
    //Run this when the page loads, so players can jump in right away
    newCurrentWord();

    //TESTS - everything below here is added just to test functionality
    //Handler below makes it easy to test newCurrentWord function - just click anywhere on the page to run newCurrentWord
    $(document).click(function() {
        newCurrentWord();
    });
});