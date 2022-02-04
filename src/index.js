window.addEventListener("yt-page-data-updated", (e) => {
    console.log(window.location.href.includes('watch'))
    if (window.location.href.includes('watch')) {
        console.log("ok")
        createButton();
    }
})

function createButton() {
    let style = `
        text-decoration: none;
        font-size: var(--ytd-tab-system_-_font-size);
        font-weight: var(--ytd-tab-system_-_font-weight);
        letter-spacing: var(--ytd-tab-system_-_letter-spacing);
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
    a.download = `${document.querySelector("#container > h1 > yt-formatted-string").innerText}.wav`;
    a.insertAdjacentHTML('afterbegin', '<svg id="downloadIcon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#bbb" style="padding:var(--yt-button-icon-padding,8px)"><path d="M14 2v11h2.51l-4.51 5.01-4.51-5.01h2.51v-11h4zm2-2h-8v11h-5l9 10 9-10h-5v-11zm3 19v3h-14v-3h-2v5h18v-5h-2z"/></svg>');
    a.style.cssText = style;
    document.querySelector("#menu > ytd-menu-renderer.style-scope.ytd-video-primary-info-renderer > #top-level-buttons-computed").appendChild(a);
    a.addEventListener("click", download)
}
function download() {
    for (request of performance.getEntriesByType("resource")) {
        if (request.name.includes('videoplayback')) {
            if (request.name.includes('mime=audio')) {
                var mp3Link = request.name.replace(/&range.+?(?=&)/g, "");
                console.log("[DOWNLOAD] Downloading...");
                downloadResource(mp3Link);
                break;
            }
        };
    }
}

function downloadResource(url) {
    fetch(url, {
        mode: 'no-cors'
    })
        .then(response => response.blob())
        .then(blob => {
            let blobUrl = window.URL.createObjectURL(blob);
            document.getElementById('downloadButton').href = blobUrl;
        })
        .catch(e => console.error(e));
}