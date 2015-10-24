/* Configure default settings for first-time installs */
chrome.runtime.onInstalled.addListener( function(details) {
    if (details.reason == "install") {
        console.log("Configuring user settings on first time install.");
        chrome.storage.sync.set({
            "radioSettings": "boolLast"
        });
    }
});

/* Event listener to call chrome.APIs from content_script.js */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getSettings") {
    	chrome.storage.sync.get(null, function (val) {
            sendResponse({data: val.radioSettings}); 
    	});
    }
    return true;
});


    

    