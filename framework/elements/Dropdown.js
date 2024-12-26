import ElementType from '../constants/ElementType.js';
import Logger from '../utils/Logger.js';
import BaseElement from './BaseElement.js';

export class Dropdown extends BaseElement {
    constructor(locator, name) {
        super(locator, name);
        this.type = ElementType.DROPDOWN;
    }

    /**
      * Select dropdown option by value
      * @param {string} value - Value of option from dropdown
      * @returns {Promise<void>}
      */
    async selectOptionByValue(value) {
        Logger.info(`${this.log()}Select option with value "${value}" from element`);
        await this.state().waitForExist();
        await this.state().waitForDisplayed();

        const element = await this._get$()
        return element.selectByAttribute('value', value);
    }

    /**
     * Select dropdown option by text
     * @param {string} text - Text of option from dropdown
     * @returns {Promise<void>}
     */
    async selectOptionByText(text) {
        Logger.info(`${this.log()}Select option with text "${text}" from element`);
        await this.state().waitForExist();
        await this.state().waitForDisplayed();

        const element = await this._get$();
        return element.selectByVisibleText(text);
    }

}
