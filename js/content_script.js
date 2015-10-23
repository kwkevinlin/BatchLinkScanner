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

});

function parseHTML(html) {

    //href regex to find all URL occurences
    var regex = /href\n*=\n*".*?(?=")/g;
    var urlArr = html.match(regex);
    if (urlArr === null)
        return;

    //No lookahead in JavaScript?
    for (var i = 0; i < urlArr.length; i++) {
        urlArr[i] = urlArr[i].substring(6);
    }
    console.log(urlArr);

    //Retreive domain.tld
    var domain = new URL(window.location.href).hostname; 
    //console.log(domain);

    /* Retreiving settings from chrome storage
       Message passing to background.js required because content_script cant run a lot of chrome APIs */
    chrome.runtime.sendMessage({method: "getSettings"}, function(response) {
        console.log(response.data);
        console.log("This doesn't print either");

        if (response.data == "boolFirst") {
            openURL(urlArr[0], domain);
        }
        else if (response.data == "boolLast") {
            openURL(urlArr[urlArr.length-1, domain);
        }
        else if (response.data == "boolAll") {
            openURL(urlArr, domain);
        }
        else 
            console.log("Error in urlToOpen");
    
        /* Bad practice to throw everything into callback? */ 
        /* Even worse practice to nest functions so hard? */      

    }); 
}

function openURL(urlToOpen, domain) {

    /* boolAll */
    if (urlToOpen.isArray()) {
        /* HARD LIMIT 5 for test */
        for (var i = 0; i < 5; i++) {
            if (urlToOpen[i].indexOf(domain) != -1) { //Internal
                //window.open(urlArr[urlArr.length-1]); //Opens hidden in new tab
                //Or use chrome.tabs.create
            } else { //External
                //Test other 3 cases
            }
        }
    }
    /* boolFirst and boolLast */
    else { 
        if (urlToOpen.indexOf(domain) != -1) { //Internal
            //window.open(urlArr[urlArr.length-1]); //Opens hidden in new tab
            //Or use chrome.tabs.create
        } else { //External
            //Test other 3 cases
        }
    }


}


/*  Extracted URL could mean two cases:
    1. Linking to external page
    2. Linking to same page, just without domain.tld

    http://stackoverflow.com/questions/2910946/test-if-links-are-external-with-jquery-javascript
    var comp = new RegExp('^' + location.protocol + '//' + location.host);

    Internal Linking Cases:
    1. / means relative
    2. [blank] means replace domain.tld/r/test.html to domain.tld/r/[whatever]
    3. # means anchor, append to current URL
    4. Else, just go?

    Current approach:
    Possible issue: If current URL also contains domain.tld within URL
        Fix: Append location.protocol as well?

    Additional To-Do:
    Settings in popup.html: if over 5 links selected, continue? User set to max limit
*/
