
// function inject() {
//     chrome.tabs.executeScript(null, {
//         file: "js/jquery/jquery.min.js"
//     }, function () {
//         chrome.tabs.executeScript(null, {
//             file: "js/tracking.js"
//         }, function () {
//             chrome.tabs.executeScript({
//                 file: 'js/main.js'
//             });
//             chrome.tabs.insertCSS({
//                 file: 'css/main_injected.css'
//             });
//         });
//     });
// }



    var s = document.createElement('script');
    s.src = chrome.extension.getURL('js/jquery/jquery.min.js');
    s.onload = function () {
        console.log(s);
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);

    var s = document.createElement('script');
    s.src = chrome.extension.getURL('js/tracking.js');
    s.onload = function () {
        console.log(s);
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);


    var s = document.createElement('script');
    s.src = chrome.extension.getURL('src/inject/hhController.js');
    s.onload = function () {
        console.log(s);
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);


    var m = document.createElement('script');
    m.src = chrome.extension.getURL('js/main.js');
    m.onload = function () {
        console.log(m);
        this.remove();
    };
    (document.head || document.documentElement).appendChild(m);

    var s = document.createElement('script');
    s.src = chrome.extension.getURL('js/options.js');
    s.onload = function () {
        console.log(s);
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
