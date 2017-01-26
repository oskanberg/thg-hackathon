let keyDown = (keyCode) => {
    let event = new Event('keydown');
    event.keyCode = keyCode;
    window.document.dispatchEvent(event);
};

let keyUp = (keyCode) => {
    let event = new Event('keyup');
    event.keyCode = keyCode;
    window.document.dispatchEvent(event);
};

window.hhController = {
    up: () => {
        keyDown(38);
        keyUp(38);
    },
    left: () => {
        keyDown(65);
        setTimeout(() => {
            keyUp(65)
        }, 100);
    },
    right: () => {
        keyDown(68);
        setTimeout(() => {
            keyUp(68)
        }, 100);
    },
    space: () => {
        keyDown(32);
        setTimeout(() => {
            keyUp(68)
        }, 100);
    }
}
