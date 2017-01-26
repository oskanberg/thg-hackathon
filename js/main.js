// this file is run when user activates on page

alert('whooop');

let video = '<video id="myVideo" width="400" height="300" preload autoplay loop muted></video>';
$($.parseHTML(video)).appendTo('body');

let colours = new tracking.ColorTracker(['magenta']);

console.log(colours);

colours.on('track', function (event) {
    if (event.data.length === 0) {
        // No colours were detected in this frame.
    } else {
        event.data.forEach(function (rect) {
            console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
        });
    }
});

tracking.track('#myVideo', colours, { camera: true });
