// Saves options to chrome.storage
var configuring = false;
var numberOfZones = 3;
var createdZones = [];

function createZone(location, code) {
    var zone = {
        x: location.x,
        y: location.y,
        code: code || null
    };
    return zone;
}

function addZone() {
    var location = oli.getLocation();
    createdZones.push(createZone(location));
}

function saveZones() {

    var message = document.getElementById('hh_message');
    var button = document.getElementById('hh_button');

    message.value = "Saving...";
    button.disabled = true;

    for (var i = 1; i++; i<=createdZones.length) {
        var stringifiedZone = JSON.stringify(createdZones[i]);
        sessionStorage.setItem(JSON.stringify(i), stringifiedZone);
        if (i == createdZones.length) {
            button.disabled = false;
            button.value = "Configure zones";
            message.value = "Zones saved!";

        }
    }
}

function onButtonClick(){

    if (configuring == true) {
        if (createdZones.length == numberOfZones) {
            // save zones
            saveZones();
            configuring = false;
        }
        else if (createdZones.length == numberOfZones-1) {
            // add last zone
            addZone();
            button.value = "Confirm Changes";
            button.style.backgroundColour = "blue";
        }

        else {
            addZone();
        }
    }
    else {
        configuring = true;
        startConfiguring();
    }

}

function startConfiguring() {
    document.getElementById('hh_message').value = "Place finger in position";
    document.getElementById('hh_button').value = "Add zone";
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

document.getElementById('hh_button').addEventListener('click', onButtonClick());


//
// var colours = new tracking.ColorTracker(['magenta']);
// tracking.track('#video', colours, { camera: true });
