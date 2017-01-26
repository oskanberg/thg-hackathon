chrome.tabs.insertCSS({
    file: 'css/main_injected.css'
});
chrome.tabs.executeScript({
    code: 'var el = document.createElement("span");el.id="hhGo";document.body.appendChild(el);'
});
