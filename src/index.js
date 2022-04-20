window.addEventListener("yt-page-data-updated", (e) => {
    if (window.location.href.includes('watch')) {
        createButton();
    }
})

function createButton() {
    let style = `
        text-decoration: none;
        font-size: var(--ytd-tab-system-font-size);
        font-weight: var(--ytd-tab-system-font-weight);
        letter-spacing: var(--ytd-tab-system-letter-spacing);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 36px;
        font-family: Roboto, Arial, sans-serif;
        color: white;
        cursor: pointer;
        `

    var a = document.createElement('a');
    var link = document.createTextNode("DOWNLOAD");
    a.id = "downloadButton";
    a.appendChild(link);
    a.download = `${document.querySelector("#container > h1 > yt-formatted-string").innerText}.mp3`;
    a.insertAdjacentHTML('afterbegin', '<svg id="downloadIcon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#bbb" style="padding:var(--yt-button-icon-padding,8px)"><path d="M14 2v11h2.51l-4.51 5.01-4.51-5.01h2.51v-11h4zm2-2h-8v11h-5l9 10 9-10h-5v-11zm3 19v3h-14v-3h-2v5h18v-5h-2z"/></svg>');
    a.style.cssText = style;
    document.querySelector("#menu > ytd-menu-renderer.style-scope.ytd-video-primary-info-renderer > #top-level-buttons-computed").appendChild(a);
    a.addEventListener("click", download)
}

function download() {

    console.log("[DOWNLOAD FUNCTION] Called.")

    this.removeEventListener('click', download, false);
    for (request of performance.getEntriesByType("resource")) {
        if (request.name.includes('videoplayback')) {
            if (request.name.includes('mime=audio')) {
                var mp3Link = request.name.replace(/&range.+?(?=&)/g, "");
                //console.log("[DOWNLOAD] Downloading...");
                console.log("[0]")
                downloadResource(mp3Link);
                return;
            }
        }
    }

    setTimeout(download, 1000);
}

function downloadResource(url) {
    fetch(url).then(function (res) {
        return res.blob();
    }).then(function (blob) {
        console.log("[Fetch BLOB] blob");
        blobUrl = URL.createObjectURL(blob);
        document.getElementById('downloadButton').href = blobUrl;
        document.getElementById('downloadButton').click();
    }).catch(e => console.error(e));
}