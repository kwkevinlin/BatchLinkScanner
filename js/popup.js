//"Options" page, instead of using options.html

$(document).ready(function() {

	//RETRIEVE when document.ready
	chrome.storage.sync.get(null, function (val) {
    	$("#" + val.radioLinkSetting).attr("checked", true);
    	$("#" + val.radioWindowSetting).attr("checked", true);
	});

	//Auto SAVE settings after change
	$('input:radio[name=radioLinkSetting]').click(function() { 
		var radioLinkSetting = $('input:radio[name=radioLinkSetting]:checked').attr('id'); 
		chrome.storage.sync.set({
			"radioLinkSetting": radioLinkSetting
		});
	}); 
	$('input:radio[name=radioWindowSetting]').click(function() { 
		var radioWindowSetting = $('input:radio[name=radioWindowSetting]:checked').attr('id'); 
		chrome.storage.sync.set({
			"radioWindowSetting": radioWindowSetting
		});
	}); 


});

