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


//Builds query string based on current state of search form
formHelpers.buildSearchParams = function () {
    var searchQuery = formHelpers.getFieldValue('twitchApiSearchQuery'),
        searchLimit = formHelpers.getFieldValue('twitchApiSearchLimit'),
        searchOffset = formHelpers.getFieldValue('twitchApiSearchOffset'),
        searchParams = "search/streams?q="+searchQuery+"&limit="+searchLimit+"&ffset="+searchOffset;
    if(!searchQuery) {
        alert('Hang tight, we need something to search for or else we will be wandering in the dark.  Please enter a search query.');
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

twitchApi.search = function () {
    var apiUrl = twitchApi.baseUrl+formHelpers.buildSearchParams();
    if(!formHelpers.buildSearchParams()) return;
    console.log(apiUrl);
}

psnUserInterface.searchBtn.addEventListener('click', twitchApi.search);

