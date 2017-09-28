$(document).ready(function(){
    var currentWord = "";
    var words = ["Corneria", "Meteo", "Sector Y", "Fichina", "Katina", "Aquas", "Sector X", "Solar", "Zoness", "Titania", "Macbeth", "Sector Z", "Bolse", "Area Six", "Venom"];
    var newCurrentWord = function() {
        currentWord = words[Math.floor(Math.random()*words.length)].toUpperCase();;
        for (var i = 0; i < currentWord.length; i++) {
            $("#current-word").append("<span id=\"" + i + "\">" + currentWord[i] + "</span>");
        }
    }
    newCurrentWord();
    $("#current-word").children("span").hide();
    console.log(currentWord);
});