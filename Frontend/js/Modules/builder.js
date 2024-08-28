export default class builder {
    constructor(containerId) {
        this.containerId = containerId
    }

    cleanContainer(containerId) {
        const wrapper = document.getElementById(containerId);
        wrapper.innerHTML = '';
    }

    createDiv(idName) {
        const div = document.createElement('div');
        div.id = idName;
        return div;
    }

    withClassCreateDiv(idName, classlist) {
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

    withClassCreateP(innerText, idName, classList) {
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

    withClassCreateH1(innerText, idName, classlist) {
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

    withClassCreateButton(innerText, idName, classList) {
        const button = document.createElement('button');
        button.id = idName;
        button.classList = classList;
        button.innerText = innerText;
        return button;
    }

    createA(href, idname) {
        const a = document.createElement('a');
        a.href = href;
        a.id = idname;
        return a;
    }

    withClassCreateA(href, idname, classList) {
        const a = document.createElement('a');
        a.href = href;
        a.id = idname;
        a.classList = classList;
        return a;
    }

    createSpan(innerText, idName) {
        const span = document.createElement('span');
        span.id = idName;
        span.innerText = innerText;
        return span;
    }

    withClassCreateSpan(innerText, idName, classList) {
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
    
    withClassCreateTextInput(idName, placeholderText, classList) {
        const input = document.createElement('input');
        input.id = idName;
        input.type = 'text';
        input.placeholder = placeholderText;
        input.classList = classList;
        return input;
    }
}
