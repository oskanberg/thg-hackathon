// // Saves options to chrome.storage
// var configuring = false;
// var numberOfZones = 3;
// var createdZones = 0;
//
// function createZone(location, code) {
//     var zone = {
//         x: location.x,
//         y: location.y,
//         code: code || null
//     };
//     return zone;
// }
//
// function addZone() {
//     hhAddControlAtCurrentPoint();
//     createdZones += 1;
// }
//
// function saveZones() {
//     var message = document.getElementById('hh_message');
//     var button = document.getElementById('hh_button');
//
//     message.innerText = "Saving...";
//     button.disabled = true;
//
//     for (var i = 1; i++; i <= createdZones) {
//         if (i == createdZones) {
//             var button = document.getElementById('hh_button');
//             button.disabled = false;
//             button.innerText = "Configure zones";
//             var message = document.getElementById('hh_message');
//             message.innerText = "Zones saved!";
//         }
//     }
// }
//
// function onButtonClick() {
//     console.log('clicked!');
//
//     if (configuring == true) {
//         if (createdZones == numberOfZones) {
//             console.log('saving zones');
//             saveZones();
//             configuring = false;
//         } else if (createdZones == numberOfZones - 1) {
//             // add last zone
//             addZone();
//
//             var button = document.getElementById('hh_button');
//             button.innerText = "Confirm Changes";
//             button.style.backgroundColour = "blue";
//         } else {
//             addZone();
//         }
//     } else {
//         configuring = true;
//         startConfiguring();
//     }
//
// }
//
// function startConfiguring() {
//     document.getElementById("hh_message").innerText = "Place finger in position";
//     document.getElementById('hh_button').innerText = "Add zone";
//     // reset canvas to empty
// };


// document.addEventListener('DOMContentLoaded', restore_options);


//
// var colours = new tracking.ColorTracker(['magenta']);
// tracking.track('#video', colours, { camera: true });
