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
        searchParams = "search/streams?q="+searchQuery+"&limit=20&callback=jsonpCallback";
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
    var links = twitchData._links;
    var streams = twitchData.streams;
    if (!error && (total > 0)) {
        psnUserInterface.fadeOut('introScreen');
        psnUserInterface.fadeOut('errorMessage');
        psnUserInterface.fadeOut('resultsView');
        psnUserInterface.fadeIn('loadingResults');
        psnUserInterface.buildResults(twitchData, total, links, streams)

    } else {
        psnUserInterface.fadeOut('loadingResults');
        psnUserInterface.displayError('We\'re sorry, we did not find any results for your search query.  Please try again.');
    }
}

/* UI Methods */
psnUserInterface.buildResults = function (twitchData, total, links, streams) {
    var elTotal = document.getElementById('resultsTotal');
    var elPagination = document.getElementById('resultsPagination');
    var nextLink = links.next;
    var prevLink = links.prev;
    var paginationHTML = "";
    elTotal.innerHTML = "Total results: "+total;

    if (typeof prevLink !== 'undefined') { paginationHTML += "&laquo; <a id='prevBtn' class='pagination' href='"+links.prev+"'>Previous</a> "; }
    if (typeof nextLink !== 'undefined' && streams.length) { paginationHTML += " <a id='nextBtn' class='pagination' href='"+links.next+"'>Next</a> &raquo;"; }

    elPagination.innerHTML = paginationHTML;
    psnUserInterface.initPaginateClick('nextBtn');
    psnUserInterface.initPaginateClick('prevBtn');
    document.getElementById('resultsContainer').innerHTML = "";

    for (var key in streams) {
        if (streams.hasOwnProperty(key)) {
            var obj = streams[key];
            psnUserInterface.displayStreamInfo(obj);
        }
    }
    setTimeout(function(){ psnUserInterface.fadeOut('loadingResults'); psnUserInterface.fadeIn('resultsView');}, 1000);
}

psnUserInterface.initPaginateClick = function (btnID) {
    var btn = document.getElementById(btnID);
    if (btn) {
        btn.addEventListener('click', function(event) { event.preventDefault()});
        btn.addEventListener('click', function(){
            psnUserInterface.paginationClick(btnID)
        });
    }
}

psnUserInterface.paginationClick = function (btnID) {
    var paginateApiUrl = document.getElementById(btnID).getAttribute('href');
    var apiResponse = twitchApi.jsonp(paginateApiUrl+"&callback=jsonpCallback");
    if (!apiResponse) {
        psnUserInterface.displayError('An unknown error occurred. Please try again.');
        return;
    }
}

psnUserInterface.initSearch = function (query) {
    var searchParam = decodeURI(query);
    document.getElementById('twitchApiSearchQuery').value = searchParam;
    twitchApi.search();
}

psnUserInterface.fadeOut = function (elID) {
    var element = document.getElementById(elID);
    element.style.display = 'none';
    element.style.opacity = 0;
    element.style.filter = 'alpha(opacity=0)';
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

psnUserInterface.displayStreamInfo = function (streamObj) {
    var resultsContainer = document.getElementById('resultsContainer');
    var twitchImage = streamObj.preview.large;
    var twitchStreamName = streamObj.channel.status;
    var twitchGame = streamObj.game;
    var twitchViewers = streamObj.viewers;
    var twitchURL = streamObj.channel.url;
    var twitchInfo = twitchGame + " - " + twitchViewers + " viewers";

    var streamLink = psnUserInterface.createUiElement("A", {class: 'modalLink', href: twitchURL, target: '_blank', rel: twitchURL+'/embed', title: twitchStreamName});
    var streamContainer = psnUserInterface.createUiElement("DIV", {id: streamObj._id, class: 'streamContainer'})
    var streamTitle = document.createElement("H2");
    var streamImageContainer = psnUserInterface.createUiElement("DIV", {class: 'streamImage'});
    var streamDetails = psnUserInterface.createUiElement("DIV", {class: 'streamDetails'});
    var streamImage = psnUserInterface.createUiElement("IMG", {src: twitchImage});

    streamTitle.innerText = twitchStreamName;
    streamDetails.innerText = twitchInfo;

    streamLink.appendChild(streamImage);
    streamImageContainer.appendChild(streamLink);
    streamContainer.appendChild(streamTitle);
    streamContainer.appendChild(streamDetails);
    streamContainer.appendChild(streamImageContainer)
    resultsContainer.appendChild(streamContainer);
    psnUserInterface.initModalLinks();
}

psnUserInterface.initModalLinks = function() {
    var modalLinks = document.querySelectorAll('a.modalLink');
    for (var i = 0; i < modalLinks.length; i++) {
        modalLinks[i].addEventListener('click',function(event) { event.preventDefault()});
        modalLinks[i].addEventListener('click', psnUserInterface.displayModal);
    }
}

psnUserInterface.displayModal = function(e) {
    var embedUrl = this.rel;
    var twitchURL = this.href;
    var videoPlayer = document.getElementById('twitchPlayer');
    var videoTitle =  document.getElementById('twitchTitle');
    var videoChat =  document.getElementById('twitchChat');

    videoTitle.innerText = this.title;
    videoPlayer.setAttribute('src', embedUrl);
    videoChat.setAttribute('src', twitchURL+'/chat?popout=');
    psnUserInterface.fadeOut('resultsView');
    psnUserInterface.fadeIn('videoEmbed');
}

psnUserInterface.createUiElement = function(element, attributes) {
    var element = document.createElement(element);
    for (var key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    return element;
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