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

// var c, ctx;
//
// function startVoronoi() {
//     //Initialize triangulation
//     var sites = new Array(10);
//     for (var i = 0; i < 10; ++i) {
//         sites[i] = [Math.random(), Math.random()];
//     }
//     var vDiagram = window.voronoi(sites)
//     var colors = new Array(vDiagram.cells.length);
//     for (var i = 0; i < vDiagram.cells.length; ++i) {
//         colors[i] = '#AAFF00';
//     }
//
//     canvas = document.getElementById("helpingand-voronoi");
//     context = canvas.getContext("2d");
//
//
//     var w = canvas.width;
//     var h = canvas.height;
//     context.setTransform(
//         w, 0,
//         0, h,
//         0, 0);
//     context.fillStyle = "#fff";
//     context.fillRect(0, 0, w, h);
//
//     var cells = vDiagram.cells;
//     var points = vDiagram.positions;
//
//     context.strokeStyle = "#000";
//     context.lineWidth = Math.min(1.0 / w, 1.0 / h);
//     console.log('cell number:' + cells.length);
//     for (var i = 0; i < cells.length; ++i) {
//         console.log(cell);
//         var cell = cells[i];
//         if (cell.indexOf(-1) >= 0) {
//             continue;
//         }
//         context.fillStyle = colors[i];
//         context.beginPath();
//         context.moveTo(points[cell[0]][0], points[cell[0]][1]);
//         for (var j = 1; j < cell.length; ++j) {
//             context.lineTo(points[cell[j]][0], points[cell[j]][1]);
//         }
//         context.closePath();
//         context.stroke();
//         context.fill();
//     }
//
//     context.fillStyle = "#000";
//     for (var i = 0; i < sites.length; ++i) {
//         context.beginPath();
//         context.arc(sites[i][0], sites[i][1], 5.0 / w, 0, 2 * Math.PI);
//         context.closePath();
//         context.fill();
//     }
// }


window.hhPoints = [
    [50, 10],
    [100, 200]
];

class VoronoiDisplay {
    constructor() {
        let w = config.VIDEO_WIDTH;
        let h = config.VIDEO_HEIGHT;

        this.canvas = window.d3.select("#helpingand-voronoi").node();
        this.context = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.voronoi = window.d3.voronoi()
            .extent([
                [-1, -1],
                [this.width + 1, this.height + 1]
            ]);

        this.redraw();
    }

    updatePointer(x, y) {
        window.hhPoints[0] = [x, y];
        this.redraw();
    }

    addPointAtPointer() {
        window.hhPoints[0].push(window.hhPoints[0]);
    }

    redraw() {
        var sites = window.hhPoints;
        var diagram = this.voronoi(sites),
            links = diagram.links(),
            polygons = diagram.polygons();

        this.context.clearRect(0, 0, this.width, this.height);
        this.context.beginPath();
        this.drawCell(polygons[0]);
        this.context.fillStyle = "#f00";
        this.context.fill();

        this.context.beginPath();
        for (var i = 0, n = polygons.length; i < n; ++i) this.drawCell(polygons[i]);
        this.context.strokeStyle = "#000";
        this.context.stroke();

        this.context.beginPath();
        for (var i = 0, n = links.length; i < n; ++i) this.drawLink(links[i]);
        this.context.strokeStyle = "rgba(0,0,0,0.2)";
        this.context.stroke();

        this.context.beginPath();
        this.drawSite(sites[0]);
        this.context.fillStyle = "#fff";
        this.context.fill();

        this.context.beginPath();
        for (var i = 1, n = sites.length; i < n; ++i) this.drawSite(sites[i]);
        this.context.fillStyle = "#000";
        this.context.fill();
        this.context.strokeStyle = "#fff";
        this.context.stroke();
    }

    drawSite(site) {
        this.context.moveTo(site[0] + 2.5, site[1]);
        this.context.arc(site[0], site[1], 2.5, 0, 2 * Math.PI, false);
    }

    drawLink(link) {
        this.context.moveTo(link.source[0], link.source[1]);
        this.context.lineTo(link.target[0], link.target[1]);
    }

    drawCell(cell) {
        if (!cell) return false;
        this.context.moveTo(cell[0][0], cell[0][1]);
        for (var j = 1, m = cell.length; j < m; ++j) {
            this.context.lineTo(cell[j][0], cell[j][1]);
        }
        this.context.closePath();
        return true;
    }
}

function startVoronoi() {
    window.voronoiDisplay = new VoronoiDisplay();
    window.voronoiDisplay.redraw();
}

window.runHH = function () {

    let configPanel = "<div id='hh_container'><div id='hh_top'><video id='helpingand-video' width='" + config.VIDEO_WIDTH + "' height='" + config.VIDEO_HEIGHT + "' preload autoplay loop muted></video><canvas id='helpingand-canvas' width='" + config.VIDEO_WIDTH + "' height='" + config.VIDEO_HEIGHT + "'></canvas><canvas id='helpingand-voronoi' width='" + config.VIDEO_WIDTH + "' height='" + config.VIDEO_HEIGHT + "'></canvas></div> <div id='hh_bottom'><div id='hh_message'></div> <button id='hh_button'>Configure Zones</button></div></div>";

    $($.parseHTML(configPanel)).appendTo('body');

    // let video = '<video id="helpingand-video" width="' + config.VIDEO_WIDTH + '" height="' + config.VIDEO_HEIGHT + '" preload autoplay loop muted></video>';
    // let canvas = '<canvas id="helpingand-canvas" width="' + config.VIDEO_WIDTH + '" height="' + config.VIDEO_HEIGHT + '"></canvas>';
    // let voronoiCanvas = '<canvas id="helpingand-voronoi" width="' + config.VIDEO_WIDTH + '" height="' + config.VIDEO_HEIGHT + '"></canvas>';
    //
    // $($.parseHTML(video)).appendTo('body');
    // $($.parseHTML(canvas)).appendTo('body');
    // $($.parseHTML(voronoiCanvas)).appendTo('body');

    var videoElement = document.getElementById('helpingand-video');
    var canvasElement = document.getElementById('helpingand-canvas');
    var context = canvasElement.getContext('2d');

    tracking.ColorTracker.registerColor('green-finger', function (r, g, b) {
        // return roughly(r, 60) && roughly(g, 110) && roughly(b, 76);
        if (r < 100 && g > 100 && b < 100) return true;

        return false;
    });

    let colors = new tracking.ColorTracker(['green-finger']);

    colors.on('track', (event) => {
        context.clearRect(0, 0, canvasElement.width, canvasElement.height);

        event.data.forEach(function (rect) {
            if (rect.color !== 'green-finger') {
                return;
            }

            currentControl = calculateControl(rect);

            if (window.voronoiDisplay) voronoiDisplay.updatePointer(currentControl.x, currentControl.y);

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
    });

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
