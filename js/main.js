const config = {
    // VIDEO_WIDTH: 640,
    // VIDEO_HEIGHT: 480,
    VIDEO_WIDTH: 320,
    VIDEO_HEIGHT: 240,
};

let currentControl = {
    x: 0,
    y: 0
};

let calculateControl = (rect) => {
    let avgX = rect.x + (rect.width / 2);
    let avgY = rect.y + (rect.height / 2);

    return {
        x: avgX,
        y: avgY
    }
};

let handleTrack = (event) => {
    context.clearRect(0, 0, canvasElement.width, canvasElement.height);

    event.data.forEach(function (rect) {
        if (rect.color !== 'green-finger') {
            return;
        }

        currentControl = calculateControl(rect);
        if (currentControl.x < config.VIDEO_WIDTH / 3) {
            console.log('left');
            window.hhController.pressKey('LEFT');
        } else if (currentControl.x > (config.VIDEO_WIDTH / 3) * 2) {
            window.hhController.pressKey('RIGHT');
            console.log('right');
        } else {
            window.hhController.stopPressing();
            console.log('neuter');
        }

        context.strokeStyle = rect.color;
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.font = '11px Helvetica';
        context.fillStyle = "#fff";
        context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
    });
}

window.runHH = function () {
    let video = '<video id="helpingand-video" width="' + config.VIDEO_WIDTH + '" height="' + config.VIDEO_HEIGHT + '" preload autoplay loop muted></video>';
    let canvas = '<canvas id="helpingand-canvas" width="' + config.VIDEO_WIDTH + '" height="' + config.VIDEO_HEIGHT + '"></canvas>';

    $($.parseHTML(video)).appendTo('body');
    $($.parseHTML(canvas)).appendTo('body');

    var videoElement = document.getElementById('helpingand-video');
    var canvasElement = document.getElementById('helpingand-canvas');
    var context = canvasElement.getContext('2d');

    tracking.ColorTracker.registerColor('green-finger', function (r, g, b) {
        // return roughly(r, 60) && roughly(g, 110) && roughly(b, 76);
        if (r < 100 && g > 100 && b < 100) return true;

        return false;
    });

    let colors = new tracking.ColorTracker(['green-finger']);

    colors.on('track', handleTrack);

    tracking.track('#helpingand-video', colors, {
        camera: true
    });
};

let checkInterval = setInterval(() => {
    var els = document.getElementById('hhGo');
    if (els) {
        console.log('Starting hh.');
        runHH();
        clearInterval(checkInterval);
    } else {
        console.log('Searching for hhGo element.');
    }
}, 1000);
