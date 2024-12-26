import Browser from '../browser/Browser.js';
import Timeouts from '../constants/Timeouts.js';
import ElementType from '../constants/ElementType.js';
import Logger from '../utils/Logger.js';
import ElementStateProvider from './helper/StateProvider.js';

export default class BaseElement {
    constructor(locator, name) {
        this.locator = locator;
        this.name = name;
        this.type = ElementType.ELEMENT;
    }

    getLocator = () => typeof this.locator === 'string' ? this.locator : this.locator.selector;

    log = () => `${this.type} - "${this.name}" - by locator "${this.getLocator()}":\n\t`;

    state = () => new ElementStateProvider(this._get$(), this.name);

    _get$() {
        let selector;
        if (typeof this.locator === 'string') {
            selector = $(this.locator);
        } else {
            selector = this.locator;
        }
        return selector;
    }

    /**
     * Find a child element from this element
     * @param {BaseElement} childType - the type of the child element (ex. Label, Input, Button, etc.)
     * @param {string} childSelector - the selector that points at a child element
     * @param {string} childName - the name of the child element
     * @param {object} options - element options if needed
     * @returns {Promise<BaseElement>} Child element
     */
    async findChild(childType, childSelector, childName, options = {}) {
        Logger.info(`${this.log()}Find child element "${childName}" by locator: "${childSelector}"`);
        await this.state().waitForExist();
        const element = await this._get$().$(`.${childSelector}`);
        return new childType(element, childName, options);
    }

    /**
     * Find all child element from this element
     * @param {BaseElement} childType - the type of the child element (ex. Label, Input, Button, etc.)
     * @param {string} childSelector - the selector that points at a child element
     * @param {string} childName - the name of the child element
     * @param {object} options - element options if needed
     * @returns {Promise<array>} Array of child elements
     */
    async findAll(childType, childSelector, childName, options = {}) {
        Logger.info(`${this.log()}Find all child elements named "${childName}" by locator: "${childSelector}"`);

        await this.state().waitForExist();
        const listOfElements = await this._get$().$$(`.${childSelector}`);
        Logger.info(`${this.log()}Found '${listOfElements.length}' child elements`);

        const elements = [];
        for (const [index, el] of listOfElements.entries()) {
            const element = new childType(el, `${childName} #${index}`, options);
            elements.push(element);
        }
        return elements;
    }

    /**
     * Click on element
     * @param {object} options - Options containing `byJS` boolean setting
     * @returns {Promise<void>}
     */
    async _click({ byJS } = { byJS: false }) {
        const logMsg = byJS ? ' by JS executing' : '';
        Logger.info(`${this.log()}Click at element${logMsg}`);
        await this.state().waitForExist();
        await this.state().waitForClickable();

        const element = await this._get$();
        if (byJS) {
            return Browser.executeScript('arguments[0].click();', element);
        } else {
            return element.click();
        }
    }

    /**
     * Click on element
     * @returns {Promise<void>}
     */
    async click() {
        return this._click({ byJS: false });
    }

    /**
     * Click on element via JS
     * @returns {Promise<void>}
     */
    async clickByJS() {
        return this._click({ byJS: true });
    }

    /**
     * Move mouse cursor to the element
     * @returns {Promise<void>}
     */
    async moveTo() {
        Logger.info(`${this.log()}Move to element`);
        await this.state().waitForExist();
        await this.state().waitForDisplayed();

        const element = await this._get$();
        return element.moveTo();
    }

    /**
     * Scroll element into view
     * @param {object} scrollIntoViewOptions - Options for `scrollIntoView` method from webdriverIO
     * @returns {Promise<void>}
     */
    async scrollIntoView(scrollIntoViewOptions = { block: 'center' }) {
        Logger.info(`${this.log()}Scroll to element`);
        await this.state().waitForExist();
        await this.state().waitForDisplayed();

        const element = await this._get$();
        return element.scrollIntoView(scrollIntoViewOptions);
    }

    /**
     * Drags element to the target position
     * @param {object} target - position (x and y coordinates)
     * @returns {Promise<void>}
     */
    async dragAndDropToPosition(target) {
        Logger.info(`${this.log()}Drag and drop element to position {x: ${target.x}, y:${target.y}}`);
        await this.state().waitForExist();
        await this.state().waitForDisplayed();

        const element = await this._get$();
        return element.dragAndDrop(target);
    }

    /**
     * Drags element to the another element
     * @param {BaseElement} targetElement - target element to drop
     * @returns {Promise<void>}
     */
    async dragAndDropToElement(targetElement) {
        Logger.info(`${this.log()}Drag and drop element to another element "${targetElement.name}"`);
        await this.state().waitForExist();
        await this.state().waitForDisplayed();

        await targetElement.state().waitForExist();
        await targetElement.state().waitForDisplayed();

        const element = await this._get$();
        const target = await targetElement._get$();
        return element.dragAndDrop(target);
    }

    /**
     * Get text from element
     * @returns {Promise<string>} Text from element
     */
    async getText() {
        Logger.info(`${this.log()}Get text from element`);
        await this.state().waitForExist();

        const element = await this._get$()
        const text = await element.getText();
        Logger.info(`Received text: "${text}"`);
        return text;
    }

    /**
     * Get value of the attribute from element
     * @param {string} attribute - Name of the attribute
     * @returns {Promise<string>} Attribute value
     */
    async getAttribute(attributeName) {
        Logger.info(`${this.log()}Get attribute "${attributeName}" from element`);
        await this.state().waitForExist();

        const element = await this._get$()
        const attr = await element.getAttribute(attributeName);
        Logger.info(`Received attribute "${attributeName}" value: "${attr}"`);
        return attr;
    }

    /**
     * Get CSS property of the element
     * @param {string} property - Name of the CSS property to get
     * @returns {Promise<string>} Value of CSS property
     */
    async getCSSProperty(property) {
        Logger.info(`${this.log()}Get CSS property "${property}" from element`);
        await this.state().waitForExist();

        const element = await this._get$()
        const { value } = element.getCSSProperty(property);
        Logger.info(`Received CSS property "${property}" = "${value}"`);
        return value;
    }

    /**
     * Get HTML from element
     * @returns {Promise<string>} HTML from element
     */
    async getHTML() {
        Logger.info(`${this.log()}Get HTML from element`);
        await this.state().waitForExist();

        const element = await this._get$()
        const html = await element.getHTML();
        Logger.info(`Received html: "${html}"`);
        return html;
    }
}
