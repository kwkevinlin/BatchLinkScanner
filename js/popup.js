//Globals
var ctrlPressed = false;

//When Document Ready
$(document).ready(function() {

	//Control keydown/up
	$(document).keydown(function(event){
    	if(event.which == "17")
    	    ctrlPressed = true;
	});
	$(document).keyup(function(){
    	ctrlPressed = false;
	});

    $(document).bind("mouseup", function() {
		if (ctrlPressed == true) {
   			//var mytext = getSelectedNode();
   			var html = getSelectionHtml();
    		alert(html);
    	}
	});

}); //End document.ready()

function getSelectionHtml() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    console.log(html);
    return html;
}



