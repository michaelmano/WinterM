'use babel';

export default class WintermView {
    constructor(serializedState) {
        this.element = document.createElement('div');
        this.element.classList.add('winterm');
        const message = document.createElement('div');
        message.textContent = 'WinterM is coming';
        message.classList.add('message');
        this.element.appendChild(message);
    }
    serialize() {}
    dispose() {
        return this.element.remove();
    }
    getElement() {
        return this.element;
    }
}
