import ElementType from '../constants/ElementType.js';
import BaseElement from './BaseElement.js';

export class Frame extends BaseElement {
    constructor(locator, name) {
        super(locator, name);
        this.type = ElementType.IFRAME;
    }

}
