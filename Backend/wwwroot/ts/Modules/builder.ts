export default class builder {
    containerId: string;
    constructor(containerId: string) {
        this.containerId = containerId
    }

    cleanContainer(containerId: any) {
        const wrapper = document.getElementById(containerId);
        if (wrapper) {
            wrapper.innerHTML = '';
        } else {
            console.error(`Element with ID ${containerId} was not found`);
        }
    }

    createDiv(idName: any) {
        const div = document.createElement('div');
        div.id = idName;
        return div;
    }

    withClassCreateDiv(idName: any, classlist: any) {
        const div = document.createElement('div');
        div.id = idName;
        div.className = classlist;
        return div;
    }

    createP(innerText: string, idName: string) {
        const p = document.createElement('p');
        p.id = idName;
        p.innerText = innerText;
        return p;
    }

    withClassCreateP(innerText: string, idName: string, classList: string) {
        const p = document.createElement('p');
        p.id = idName;
        p.className = classList;
        p.innerText = innerText;
        return p;
    }
 
    createH1(innerText: string, idName: string) {
        const h1 = document.createElement('h1');
        h1.id = idName;
        h1.innerText = innerText;
        return h1;
    }

    withClassCreateH1(innerText: string, idName: string, classlist: string) {
        const h1 = document.createElement('h1');
        h1.id = idName;
        h1.className = classlist;
        h1.innerText = innerText;
        return h1;
    }
    
    createButton(innerText: string, idName: string) {
        const button = document.createElement('button');
        button.id = idName;
        button.innerText = innerText;
        return button;
    }

    withClassCreateButton(innerText: string, idName: string, classList: string) {
        const button = document.createElement('button');
        button.id = idName;
        button.className = classList;
        button.innerText = innerText;
        return button;
    }

    createA(href: string, idname: string) {
        const a = document.createElement('a');
        a.href = href;
        a.id = idname;
        return a;
    }

    withClassCreateA(href: string, idname: string, classList: string) {
        const a = document.createElement('a');
        a.href = href;
        a.id = idname;
        a.className = classList;
        return a;
    }

    createSpan(innerText: string, idName: string) {
        const span = document.createElement('span');
        span.id = idName;
        span.innerText = innerText;
        return span;
    }

    withClassCreateSpan(innerText: string, idName: string, classList: string) {
        const span = document.createElement('span');
        span.id = idName;
        span.className = classList;
        span.innerText = innerText;
        return span;
    }

    createTextInput(idName: string, placeholderText: string) {
        const input = document.createElement('input');
        input.id = idName;
        input.type = 'text';
        input.placeholder = placeholderText;
        return input;
    }
    
    withClassCreateTextInput(idName: string, placeholderText: string, classList: string) {
        const input = document.createElement('input');
        input.id = idName;
        input.type = 'text';
        input.placeholder = placeholderText;
        input.className = classList;
        return input;
    }

    getParentById(childId: string) {
        const child = document.getElementById(childId);
        if (child) {
            return child.parentElement;
        } else {
            console.error('Child element not found');
            return null;
        }
    }
}
