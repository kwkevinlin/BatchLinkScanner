//"Options" page, instead of using options.html

$(document).ready(function() {

	//RETRIEVE when document.ready
	chrome.storage.sync.get(null, function (val) {
    	$("#" + val.radioSettings).attr("checked", true);
	});

	//Auto SAVE settings after change
	$('input:radio[name=radioSettings]').click(function() { 
		var radioSettings = $('input:radio[name=radioSettings]:checked').attr('id'); 

		chrome.storage.sync.set({
			"radioSettings": radioSettings
		});

	}); 

});

