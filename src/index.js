const observerDOMinit = new MutationObserver((mutations, obs) => {
    if (document.querySelector("#container > h1 > yt-formatted-string")) {
        init();
        obs.disconnect();
    }
});

function init() {
    var canCreateButton = true;
    var observer = new PerformanceObserver(list => {
        list.getEntries().forEach(entry => {
            //console.log(entry.name.indexOf('videoplayback') !== -1)
            if (entry.name.indexOf('videoplayback') !== -1) {
                //console.log(entry.name.indexOf('mime=audio') !== -1 && !document.getElementById("downloadButton") && canCreateButton == true, `[canCreateButton]: ${canCreateButton}`, `[Button DOM Element]: ${document.getElementById("downloadButton")}`);
                if (entry.name.indexOf('mime=audio') !== -1 && !document.getElementById("downloadButton") && canCreateButton == true) {
                    canCreateButton = false;
                    var mp3Link = entry.name.replace(/&range.+?(?=&)/g, "");
                    fetch(mp3Link).then(function (res) {
                        return res.blob();
                    }).then(function (blob) {
                        //console.log("[Fetch BLOB] blob");
                        var blobUrl = URL.createObjectURL(blob);
                        var a = document.createElement('a');
                        var link = document.createTextNode("DOWNLOAD");
                        a.id = "downloadButton";
                        a.appendChild(link);
                        a.href = blobUrl
                        a.download = `${document.querySelector("#container > h1 > yt-formatted-string").innerText}.wav`;

                        a.style.textDecoration = "none";
                        a.style.fontSize = "var(--ytd-tab-system_-_font-size)";
                        a.style.fontWeight = "var(--ytd-tab-system_-_font-weight)";
                        a.style.letterSpacing = "var(--ytd-tab-system_-_letter-spacing)";
                        a.style.display = "flex";
                        a.style.justifyContent = "center";
                        a.style.alignItems = "center";
                        a.style.height = "36px";
                        a.style.fontFamily = "Roboto, Arial, sans-serif";
                        a.style.color = "white";
                        //console.log(`[A DOM element]: ${a}`);
                        document.getElementById("top-level-buttons-computed").appendChild(a);
                        a.insertAdjacentHTML('afterbegin', '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="white" style="padding:var(--yt-button-icon-padding,8px)"><path d="M14 2v11h2.51l-4.51 5.01-4.51-5.01h2.51v-11h4zm2-2h-8v11h-5l9 10 9-10h-5v-11zm3 19v3h-14v-3h-2v5h18v-5h-2z"/></svg>');
                        canCreateButton = true;
                        //console.log(entry.name.replace(/&range.+?(?=&)/g, ""));
                    })
                }
            }
            // Display each reported measurement on console
            //                 console.log("Name: " + entry.name +
            //                     ", Type: " + entry.entryType +
            //                     ", Start: " + entry.startTime +
            //                     ", Duration: " + entry.duration + "\n");
        })
    });
    observer.observe({ entryTypes: ['resource'] });
}

observerDOMinit.observe(document, {
    childList: true,
    subtree: true
});