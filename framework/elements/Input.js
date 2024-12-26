
import Logger from '../utils/Logger.js';
import BaseElement from './BaseElement.js';
import Keys from '../constants/Keys.js';
import Browser from '../browser/Browser.js';
import ElementType from '../constants/ElementType.js';
import ElementAttributes from '../constants/ElementAttributes.js';

// const maskedValue = '***********';

export class Input extends BaseElement {
    constructor(locator, name) {
        super(locator, name);
        this.type = ElementType.INPUT;
    }

    /**
     * Type text into element
     * @param {string} value - Text to type
     * @param {object} options - Options containing `secret` and `clear` boolean settings
     * @returns {Promise<void>}
     */
    async _type(value, options = { secret: false, clear: false }) {
        options.secret = options.secret || false;
        options.clear = options.clear || false;

        await this.state().waitForExist();
        await this.state().waitForDisplayed();
        await this.state().waitForEnabled();

        const valueToLog = options.secret ? value.replaceAll(/\S/gm, '*') : value;
        Logger.info(`${this.log()}Type text "${valueToLog}" in element`);

        const element = await this._get$();
        if (options.clear) {
            return element.setValue(value);
        }
        return element.addValue(value);
    }

    /**
     * Type text to the element
     * @param {string} value - Text to type
     * @returns {Promise<void>}
     */
    async typeText(value) {
        return this._type(value, { secret: false, clear: false });
    }

    /**
     * Clear text and then type
     * @param {string} value - Text to type
     * @returns {Promise<void>}
     */
    async typeTextWithClear(value) {
        return this._type(value, { secret: false, clear: true });
    }

    /**
     * Type text hiding value in log
     * @param {string} value - Text to type
     * @returns {Promise<void>}
     */
    async typeSecret(value) {
        return this._type(value, { secret: true, clear: false });
    }

    /**
     * Clear text and then type hiding value in log
     * @param {string} value - Text to type
     * @returns {Promise<void>}
     */
    async typeSecretWithClear(value) {
        return this._type(value, { secret: true, clear: true });
    }

    /**
     * Get value of the Input element
     * @returns {Promise<string>} Value from element
     */
    async getText() {
        Logger.info(`${this.log()}Get value from element`);
        await this.state().waitForExist();

        const element = await this._get$();
        const value = await element.getText();
        Logger.info(`Value: "${value}"`);
        return value;
    }
    
        /**
     * Get value of the Input element
     * @returns {Promise<string>} Value from element
     */
        async getValue() {
            Logger.info(`${this.log()}Get value from element`);
            await this.state().waitForExist();
    
            const element = await this._get$();
            const value = await element.getValue();
            Logger.info(`Value: "${value}"`);
            return value;
        }

    /**
     * Get placeholder from element
     * @returns {Promise<string>} Placeholder value
     */
    async getPlaceholder() {
        return this.getAttribute(ElementAttributes.PLACEHOLDER);
    }
}
