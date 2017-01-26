function inject() {
    chrome.tabs.executeScript(null, {
        file: "js/jquery/jquery.min.js"
    }, function () {
        chrome.tabs.executeScript(null, {
            file: "js/tracking.js"
        }, function () {
            chrome.tabs.executeScript({
                file: 'js/main.js'
            });
        });
    });
}

document.getElementById('clickme').addEventListener('click', inject);
