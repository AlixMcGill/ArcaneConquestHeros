export default class builder {
    constructor(containerId) {
        this.containerId = containerId
    }

    cleanContainer() {
        const wrapper = document.getElementById(this.containerId);
        wrapper.innerHTML = '';
    }

    createDiv(idName) {
        const div = document.createElement('div');
        div.id = idName;
        return div;
    }

    createDiv(idName, classlist) {
        const div = document.createElement('div');
        div.id = idName;
        div.classList = classlist;
        return div;
    }

    createP(innerText, idName) {
        const p = document.createElement('p');
        p.id = idName;
        p.innerText = innerText;
        return p;
    }

    createP(innerText, idName, classList) {
        const p = document.createElement('p');
        p.id = idName;
        p.classList = classList;
        p.innerText = innerText;
        return p;
    }
 
    createH1(innerText, idName) {
        const h1 = document.createElement('h1');
        h1.id = idName;
        h1.innerText = innerText;
        return h1;
    }

    createH1(innerText, idName, classlist) {
        const h1 = document.createElement('h1');
        h1.id = idName;
        h1.classList = classlist;
        h1.innerText = innerText;
        return h1;
    }
    
    createButton(innerText, idName) {
        const button = document.createElement('button');
        button.id = idName;
        button.innerText = innerText;
        return button;
    }

    createButton(innerText, idName, classList) {
        const button = document.createElement('button');
        button.id = idName;
        button.classList = classList;
        button.innerText = innerText;
        return button;
    }

    createSpan(innerText, idName) {
        const span = document.createElement('span');
        span.id = idName;
        span.innerText = innerText;
        return span;
    }

    createSpan(innerText, idName, classList) {
        const span = document.createElement('span');
        span.id = idName;
        span.classList = classList;
        span.innerText = innerText;
        return span;
    }

    createTextInput(idName, placeholderText) {
        const input = document.createElement('input');
        input.id = idName;
        input.type = 'text';
        input.placeholder = placeholderText;
        return input;
    }
}
