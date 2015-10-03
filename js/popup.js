//"Options" page, instead of using options.html

$(document).ready(function() {

	//Retrieve when document.ready
	var radioVal;
	chrome.storage.sync.get(null, function (val) {
    	console.log("Retrieve: ", val.radioSettings);
    	$("#" + val.radioSettings).attr("checked", true);
	});
	//Finish regex

	//Auto save settings after change
	$('input:radio[name=radioSettings]').click(function() { 
		var radioSettings = $('input:radio[name=radioSettings]:checked').attr('id'); 
		console.log("Saving: ", radioSettings);

		chrome.storage.sync.set({
			"radioSettings": radioSettings
		});

	}); 

});

