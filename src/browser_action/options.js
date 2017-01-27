// Saves options to chrome.storage
var configuring = false;
var numberOfZones = 3;
var createdZones = 0;

function createZone(location, code) {
    var zone = {
        x: location.x,
        y: location.y,
        code: code || null
    };
    return zone;
}

function addZone() {
    hhAddControlAtCurrentPoint();
    createdZones += 1;
}

function saveZones() {
    var message = document.getElementById('hh_message');
    var button = document.getElementById('hh_button');

    message.innerText = "Saving...";
    button.disabled = true;

    for (var i = 1; i++; i <= createdZones) {
        if (i == createdZones) {
            var button = document.getElementById('hh_button');
            button.disabled = false;
            button.innerText = "Configure zones";
            var message = document.getElementById('hh_message');
            message.innerText = "Zones saved!";
        }
    }
}

function onButtonClick() {
    console.log('clicked!');

    if (configuring == true) {
        if (createdZones == numberOfZones) {
            console.log('saving zones');
            saveZones();
            configuring = false;
        } else if (createdZones == numberOfZones - 1) {
            // add last zone
            addZone();

            var button = document.getElementById('hh_button');
            button.innerText = "Confirm Changes";
            button.style.backgroundColour = "blue";
        } else {
            addZone();
        }
    } else {
        configuring = true;
        startConfiguring();
    }

}

function startConfiguring() {
    document.getElementById("hh_message").innerText = "Place finger in position";
    document.getElementById('hh_button').innerText = "Add zone";
    // reset canvas to empty
};


//
// // Restores select box and checkbox state using the preferences
// // stored in chrome.storage.
// function restore_options() {
//     // Use default value color = 'red' and likesColor = true.
//     chrome.storage.sync.get({
//         favoriteColor: 'red',
//         likesColor: true
//     }, function(items) {
//         document.getElementById('color').value = items.favoriteColor;
//         document.getElementById('like').checked = items.likesColor;
//     });
// }


// document.addEventListener('DOMContentLoaded', restore_options);

document.getElementById("hh_button").addEventListener('click', onButtonClick);
console.log('in options.js');

//
// var colours = new tracking.ColorTracker(['magenta']);
// tracking.track('#video', colours, { camera: true });
