window.runHH = function () {

    const config = {
        VIDEO_WIDTH: 640,
        VIDEO_HEIGHT: 480,
    };

    let currentControl = {
        x: 0,
        y: 0,
        amplitude: 0
    };

    let calculateControl = (rect) => {
        let avgX = rect.x + (rect.width / 2);
        let avgY = rect.y + (rect.height / 2);

        let newControl = {
            x: 0,
            y: 0,
            amplitude: 0
        };

        if (avgX < (config.VIDEO_WIDTH / 2)) {
            newControl.x = -1;
        } else {
            newControl.x = 1
        }
        if (avgY < (config.VIDEO_HEIGHT / 2)) {
            newControl.y = -1;
        } else {
            newControl.y = 1
        }

        newControl.amplitude = 1;
        return newControl;
    };

    // function roughly(source, target, threshold) {
    //     if (!threshold) threshold = 50;
    //     return Math.abs(target - source) <= threshold;
    // }


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

    colors.on('track', function (event) {
        context.clearRect(0, 0, canvasElement.width, canvasElement.height);

        event.data.forEach(function (rect) {
            if (rect.color !== 'green-finger') {
                return;
            }

            currentControl = calculateControl(rect);

            context.strokeStyle = rect.color;
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
            context.font = '11px Helvetica';
            context.fillStyle = "#fff";
            context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
            context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
        });
    });

    tracking.track('#helpingand-video', colors, {
        camera: true
    });

    setInterval(() => {
        // console.log(currentControl)
        // console.log(window);
        if (currentControl.x < 0) {
            window.hhController.space();
        } else {
            window.hhController.right();
        }
    }, 100);

};


var checkInterval = setInterval(() => {
    var els = document.getElementById('hhGo');
    if (els) {
        console.log('Starting hh.');
        runHH();
        clearInterval(checkInterval);
    } else {
        console.log('Searching for hhGo element.');
    }
}, 1000);
