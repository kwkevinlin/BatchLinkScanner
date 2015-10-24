chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    if (request.method == "getSettings") {
    	chrome.storage.sync.get(null, function (val) {
            sendResponse({data: val.radioSettings}); 
    	});
    }

    return true;

});


    

    