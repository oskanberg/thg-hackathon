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

var s2 = document.createElement('script');
s2.src = chrome.extension.getURL('js/tracking.js');
s2.onload = function () {
    console.log(s2);
    this.remove();
};
(document.head || document.documentElement).appendChild(s2);


var s3 = document.createElement('script');
s3.src = chrome.extension.getURL('js/hhController.js');
s3.onload = function () {
    console.log(s3);
    this.remove();
};
(document.head || document.documentElement).appendChild(s3);


var s4 = document.createElement('script');
s4.src = chrome.extension.getURL('js/node_modules/d3/build/d3.min.js');
s4.onload = function () {
    console.log(s4);
    this.remove();
};
(document.head || document.documentElement).appendChild(s4);


var m = document.createElement('script');
m.src = chrome.extension.getURL('js/main.js');
m.onload = function () {
    console.log(m);
    this.remove();
};
(document.head || document.documentElement).appendChild(m);
