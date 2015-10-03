//All code in background.js

$(document).ready(function() {

	//Retrieve when document.ready
	var radioVal;
	chrome.storage.sync.get(radioSettings, function (val) {
    	console.log(val);
    	$("input[name=radioSettings][value=" + val + "]").attr('checked', 'checked');
	});
	//Check console to see if error
	//After that, finish regex

	//Auto save settings after change
	$('input:radio[name=radioSettings]').click(function() { 
		var radioSettings = $('input:radio[name=radioSettings]:checked').val(); 
		save_options(radioSettings);
	}); 

	/*
	$("#boolAll").change(function () {
	});

	$("#boolFirst").change(function () {
	});

	$("#boolLast").change(function () {
	});
	*/

});

function save_options(opt) {
	chrome.storage.sync.set({
		radioSettings: opt
	});
}