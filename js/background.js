chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    if (request.method == "getSettings") {
    	chrome.storage.sync.get(null, function (val) {
    		//sendResponse(val.radioSettings);

    		sendResponse({data: "test"});

    		console.log("Responding: " + val.radioSettings);


    		/*sendResponse(
    		{
    			data: "test settings"
    			//status: val.radioSettings
    		});*/
    	});
    }

});


    

    