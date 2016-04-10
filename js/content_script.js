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

    /* Retreiving settings from chrome storage
       Message passing to background.js required because content_script cant run a lot of chrome APIs */
    chrome.runtime.sendMessage({method: "getSettings"}, function(response) {

        if (response.linkChoice == "boolFirst") {
            console.log("sendMessage Response: " + response.windowChoice);
            openURL(urlArr[0], response.windowChoice, response.warningChoice);
        }
        else if (response.linkChoice == "boolLast") {
            console.log("sendMessage Response: " + response.windowChoice);
            openURL(urlArr[urlArr.length-1], response.windowChoice, response.warningChoice); //Check for empty case?
        }
        else if (response.linkChoice == "boolAll") {
            console.log("sendMessage Response: " + response.windowChoice);
            openURL(urlArr, response.windowChoice, response.warningChoice);
        }
        else 
            console.log("Error in urlToOpen (linkChoice): " + response.linkChoice + ", " + response.windowChoice);
    
        /* Bad practice to throw everything into callback? */ 
        /* Even worse practice to nest functions so hard? */      

    }); 
}

function openURL(urlToOpen, linkSettings, warningChoice) {

    console.log("urlToOpen: ", urlToOpen, ", warningChoice: ", warningChoice);

    /* boolAll */
    if (urlToOpen.constructor === Array) {
        // Warn user if warningChoice is "5" or "10" links
        if (urlToOpen.length >= parseInt(warningChoice, 10)) {
            if (warningChoice != "10000") { //10000 == "Do Not Warn"
                if (!confirm("You are opening " + warningChoice + " links at once. Press OK to proceed."))
                    return;
            }
        }

        //Open all links
        for (var i = 0; i < urlToOpen.length; i++) {
            console.log("Opening: " + urlToOpen[i]);
            if (linkSettings == "newTab")
                window.open(urlToOpen[i]);
            else
                window.open(urlToOpen[i], "_self");
        }

    }
    /* boolFirst and boolLast */
    else { 

        console.log("Opening: " + urlToOpen);
        if (linkSettings == "newTab")
            window.open(urlToOpen);
        else
            window.open(urlToOpen, "_self");

        //Error: accidentally highlight = will open. option for diff buttons?
        //Blank ctrl clicks gets counted. return statement?

    }

}
