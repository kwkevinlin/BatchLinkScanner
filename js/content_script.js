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
    //Find href="
    //substr till next "

    //href regex to find all URL occurences
    var regex = /href\n*=\n*".*?(?=")/g;
    var urlArr = html.match(regex);
    //Lookahead not present in JavaScript (?)
    for (var i = 0; i < urlArr.length; i++) {
        urlArr[i] = urlArr[i].substring(6);
    }
    console.log(urlArr);


    /* 
        # Open to suggestions on this part #

        HTML parsers seem ideal, but they wouldn't solve the "missing domain-name.tld" issue, right?
        For ex: <a href="/secondpage.html">visit second page</a>

        Check for 3 cases:
        1). Complete URL: Protocol://domain-name.tld
        2). Missing domain-name.tld
        3). (No protocol is fine, right?)

        NEW:
        1). Get url of current page
        2). Turn into regex. if no match, concat. Else (if present), go directly
        var domain = new URL(pageUrl).hostname; 
        return:
        images.google.com
    */



    
}



