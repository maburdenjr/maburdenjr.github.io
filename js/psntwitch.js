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
var searchQuery = getParameterByName('search');

/* Form Helper Methods */

formHelpers.buildSearchParams = function () {
    var searchQuery = formHelpers.getFieldValue('twitchApiSearchQuery'),
        searchLimit = formHelpers.getFieldValue('twitchApiSearchLimit'),
        searchOffset = formHelpers.getFieldValue('twitchApiSearchOffset'),
        searchParams = "search/streams?q="+searchQuery+"&limit="+searchLimit+"&ffset="+searchOffset+"&callback=jsonpCallback";
    if(!searchQuery) {
        psnUserInterface.fadeOut('loadingResults');
        psnUserInterface.displayError('Please enter a search query in the form above.');
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

    var apiResponse = twitchApi.jsonp(apiUrl);
    if (!apiResponse) {
        psnUserInterface.displayError('An unknown error occurred. Please try again.');
        return;
    }

}

twitchApi.jsonp = function (apiUrl) {
    var head = document.head;
    var script = document.createElement("script");

    script.setAttribute("src", apiUrl);
    head.appendChild(script);
    head.removeChild(script);
    return true;
}

twitchApi.processResponse = function (data) {
    var twitchData = JSON.parse(data);
    var error = twitchData.error;
    var total = twitchData._total;
    if (!error) {
        psnUserInterface.fadeOut('introScreen');
        psnUserInterface.fadeOut('errorMessage');
        psnUserInterface.fadeIn('loadingResults');
    } else {
        psnUserInterface.fadeOut('loadingResults');
        psnUserInterface.displayError('An unknown error occurred. Please try again.');
    }
}

/* UI Methods */
psnUserInterface.initSearch = function (query) {
    var searchParam = decodeURI(query);
    document.getElementById('twitchApiSearchQuery').value = searchParam;
    twitchApi.search();
}

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
    psnUserInterface.fadeIn('errorMessage');
}


if (searchQuery.length) {
    psnUserInterface.initSearch(searchQuery);
} else {
    psnUserInterface.fadeIn('introScreen');
}

psnUserInterface.searchBtn.addEventListener('click', twitchApi.search);

/* Other Goodies */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function jsonpCallback(data) {
    twitchApi.processResponse(JSON.stringify(data));
}