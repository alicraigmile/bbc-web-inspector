// This one acts in the context of the panel in the Dev Tools
//
// Can use
// chrome.devtools.*
// chrome.runtime.*

/*
document.querySelector('#executescript').addEventListener('click', function() {
    sendObjectToInspectedPage({action: "code", content: "console.log('Inline script executed')"});
}, false);

document.querySelector('#insertscript').addEventListener('click', function() {
    sendObjectToInspectedPage({action: "script", content: "inserted-script.js"});
}, false);

document.querySelector('#insertmessagebutton').addEventListener('click', function() {
    sendObjectToInspectedPage({action: "code", content: "document.body.innerHTML='<button>Send message to DevTools</button>'"});
    sendObjectToInspectedPage({action: "script", content: "messageback-script.js"});
}, false);
*/

var headers2 = [];

function clearList() {
	document.querySelector('#headers').innerHTML='';
	headers2 = [];
}

function addToList(text, key, cl) {
	var div = document.createElement('div');
	div.innerHTML = '<span class="key">' + key + '</span><span class="' + cl + '">' + text + '</span>';
	document.querySelector('#headers').appendChild(div);
}

function isTest(url) {
	return url.match(/\.test\./);
}

chrome.devtools.network.onNavigated.addListener(function(url) {
    chrome.devtools.inspectedWindow.eval('console.log("bbc page loaded")');
    clearList();

    chrome.devtools.inspectedWindow.eval('console.log("url: "' + url + '")');
    addToList(url, 'url', 'url');

	if (isTest(url)) {
    		addToList('TEST', 'environment', 'test');
	} else {
    		addToList('LIVE', 'environment', 'live');
	}

    chrome.devtools.network.getHAR(function(har) {
        //chrome.devtools.inspectedWindow.eval('console.log("getHAR")');
        var entry = har.entries[0];
        var url = entry.request.url;
        var method = entry.request.method;
        var headers = entry.response.headers;

        headers.forEach(function(header) {
            headers2[header.name] = header.value;    
        });

        ['req-svc-chain', 'via', 'server', 'x-bbc-edge-cache-status', 'belfrage-cache-status', 'bid', 'moz-cache-status', 'content-return-type'].forEach(header => {
            //chrome.devtools.inspectedWindow.eval('console.log(unescape("' + escape(header) + '") + ": " + unescape("' + escape(headers2[header]) + '"))');
		var cl= '';
		if (headers2[header] == 'STALE') {
			cl='stale'
		}
		if (headers2[header] == 'EXPIRED') {
			cl='expired'
		}
		if (headers2[header] == 'MISS') {
			cl='miss'
		}
		if (headers2[header] == 'REVALIDATED') {
			cl='revalidated'
		}
		if (headers2[header] == 'HIT') {
			cl='hit'
		}
		addToList(headers2[header], header, cl);
        });
        
        //chrome.devtools.inspectedWindow.eval('console.log(unescape("' + escape('req-svc-chain') + '") + ": " + unescape("' + escape(headers2['req-svc-chain']) + '"))');

  });

});


chrome.devtools.network.onRequestFinished.addListener(function(request) {
    /*
    chrome.devtools.inspectedWindow.eval('console.log("onRequestFinished()")');
        if (request.request.url) {
            chrome.devtools.inspectedWindow.eval('console.log("url set")');
        } else {
            chrome.devtools.inspectedWindow.eval('console.log("url not set")');
        }
        chrome.devtools.inspectedWindow.eval('console.log("url: "' + request.request.url + '")');
        chrome.devtools.inspectedWindow.eval('console.log("url: " + unescape("' + escape(request.request.url) + '"))');
        chrome.devtools.inspectedWindow.eval('console.log("method: " + unescape("' + escape(request.request.method) +'"))');
*/
/*    var headers = request.response.headers;
    chrome.devtools.inspectedWindow.eval('console.log("hello: " + unescape("' + escape('world') +'")');

    var header = headers.find(function(header) {header.name == 'Accept-Encoding'});
    chrome.devtools.inspectedWindow.eval('console.log("via: " + unescape("' + escape(header.value) +'")');
    */
});


chrome.devtools.inspectedWindow.eval('console.log("Inspect BBC web - Ready!")');
