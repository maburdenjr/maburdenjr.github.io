/**
 * Author: Michael Burden
 * Date: 6/11/2015
 */

var psnUserInterface = {
    searchBtn: document.getElementById('submitSearch')
}
var formHelpers = {}
var twitchApi = {
    baseUrl: 'https://api.twitch.tv/kraken/'
};
var xhrRequest;



/* Form Helper Methods */

formHelpers.buildSearchParams = function () {
    var searchQuery = formHelpers.getFieldValue('twitchApiSearchQuery'),
        searchLimit = formHelpers.getFieldValue('twitchApiSearchLimit'),
        searchOffset = formHelpers.getFieldValue('twitchApiSearchOffset'),
        searchParams = "search/streams?q="+searchQuery+"&limit="+searchLimit+"&ffset="+searchOffset;
    if(!searchQuery) {
        psnUserInterface.displayError('Please enter a search query in the form above.');
        psnUserInterface.fadeIn('errorMessage');
        return false;
    } else {
        return encodeURI(searchParams);
    }

}

formHelpers.getFieldValue = function (fieldID) {
    if(!fieldID) return;
    var fieldValue = document.getElementById(fieldID).value;
    return fieldValue;
}

/* TwitchAPI Methods */

twitchApi.search = function () {
    var apiUrl = twitchApi.baseUrl+formHelpers.buildSearchParams();
    if(!formHelpers.buildSearchParams()) return;
    psnUserInterface.fadeOut('introScreen');
    psnUserInterface.fadeOut('errorMessage');
    console.log(apiUrl);
}

twitchApi.ajaxRequest = function() {

}

/* UI Methods */
psnUserInterface.fadeOut = function (elID) {
    var element = document.getElementById(elID);
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 10);
}
psnUserInterface.fadeIn = function (elID) {
    var element = document.getElementById(elID);
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

psnUserInterface.displayError = function(errorMessage) {
    var errorContainer = document.getElementById('errorMessage');
    errorContainer.innerHTML = "<h3 class='centered'>"+errorMessage+"</h3>";
}

psnUserInterface.searchBtn.addEventListener('click', twitchApi.search);

