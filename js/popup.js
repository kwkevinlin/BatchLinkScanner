//"Options" page, instead of using options.html

$(document).ready(function() {

	//RETRIEVE when document.ready
	chrome.storage.sync.get(null, function (val) {
    	$("#" + val.radioLinkSetting).attr("checked", true);
    	$("#" + val.radioWindowSetting).attr("checked", true);
    	$("#" + val.radioWarningSetting).attr("checked", true);
	});

	//Auto SAVE settings after change
	$('input:radio[name=radioLinkSetting]').click(function() { 
		var radioLinkSetting = $('input:radio[name=radioLinkSetting]:checked').attr('id'); 
		chrome.storage.sync.set({
			"radioLinkSetting": radioLinkSetting
		});
		console.log("Highlighted option changed!");

		//Gray out unavailable options 
		//If "All Links" selected, "Current Tab" should not be selectable option
		if ($('input:radio[name=radioLinkSetting]:checked').attr('id') == "boolAll") {
			$('#newTab').prop("checked", true);
			$('#currentTab').attr('disabled', true);
		} else {
			$('#newTab').attr('disabled', false);
			$('#currentTab').attr('disabled', false);
		}
	}); 
	$('input:radio[name=radioWindowSetting]').click(function() { 
		var radioWindowSetting = $('input:radio[name=radioWindowSetting]:checked').attr('id'); 
		chrome.storage.sync.set({
			"radioWindowSetting": radioWindowSetting
		});
		console.log("Tab option changed!");
	}); 
	$('input:radio[name=radioWarningSetting]').click(function() { 
		var radioWarningSetting = $('input:radio[name=radioWarningSetting]:checked').attr('id'); 
		chrome.storage.sync.set({
			"radioWarningSetting": radioWarningSetting
		});
		console.log("Warning option changed!");
	}); 

});

