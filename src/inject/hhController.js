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

const keys = {
    'a': 65,
    'd': 68,
    'LEFT': 37,
    'RIGHT': 39,
    'SPACE': 32
};

class hhController {

    constructor() {
        this.currentKey = null;
    }

    pressKey(key) {
        if (this.currentKey === key) return;
        if (this.currentKey != null) this.stopPressing();
        this.currentKey = key;
        if (typeof key === 'string') key = keys[key];
        keyDown(key);
    }

    stopPressing() {
        let key = this.currentKey;
        if (typeof key === 'string') key = keys[key];
        this.currentKey = null;
        keyUp(key);
    }
}

window.hhController = new hhController();
