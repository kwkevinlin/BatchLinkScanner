/* StackOverflow Question:
    http://stackoverflow.com/questions/32928598/extract-url-from-html-text-but-if-url-only-shows-partial-like-secondpage-html
*/

//When Document Ready
$(document).ready(function() {

    //Binding mouseup (selection) and control key
    $(document).bind("mouseup", function(event) {

        if (event.ctrlKey) {

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
            parseHTML(html);
        }

    });

}); //End document.ready()

function parseHTML(html) {

    //href regex to find all URL occurences
    var regex = /href\n*=\n*".*?(?=")/g;
    var urlArr = html.match(regex);
    if (urlArr === null) //End early if no URLs highlighted
        return;

    //Retreiving settings from chrome storage
    //Message passing to background.js required because content_script cant run a lot of chrome APIs
    chrome.runtime.sendMessage({method: "getSettings"}, function(response) {
        console.log(response.data);
        console.log("This doesn't print either");
    });

    //No lookahead in JavaScript?
    for (var i = 0; i < urlArr.length; i++) {
        urlArr[i] = urlArr[i].substring(6);
    }
    console.log(urlArr);

    var domain = new URL(window.location.href).hostname; 
    //console.log(domain);

    /*  Could mean two cases:
        1. Linking to external page
        2. Linking to same page, just without domain.tld

        http://stackoverflow.com/questions/2910946/test-if-links-are-external-with-jquery-javascript
        var comp = new RegExp('^' + location.protocol + '//' + location.host);

        Even easier?
        1. / means relative
        2. [blank] means replace domain.tld/r/test.html to domain.tld/r/[whatever]
        3. # means anchor, append to current URL
        4. Else, just go?

        Current approach:
        Possible issue: If current URL also contains domain.tld within URL
    */

    //Currently selecting last URL highlighted
    if (urlArr[urlArr.length-1].indexOf(domain) != -1) { //URL not present. 

        console.log("Internal");

        //window.open(urlArr[urlArr.length-1]); //Opens hidden in new tab
    } else {
        console.log("External");
        //window.open(urlArr[urlArr.length-1]); //Opens hidden in new tab
    }


    /* 
        Corner case 1:
        If #, anchor, so append to current URL
            Or just ignore?
    */



    
}



