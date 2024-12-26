
import Timeouts from '../../constants/Timeouts.js';
import Logger from '../../utils/Logger.js';

export class Dialog {

    constructor() {
        this.browser = null;
    }

    /**
     * Private method that wait if dialog open or close
     * @param {object} options - Options for waiting
     * @returns {Promise<boolean>}
     */
    async #waitForDialogOpen(options = {
        timeout: Timeouts.explicit,
        reverse: false
    }) {
        options.timeout = options.timeout || Timeouts.explicit;
        options.reverse = options.reverse || false;

        Logger.info(`Waiting "${options.timeout}ms" until browser dialog will be${options.reverse ? ' not ' : ' '}open`);

        try {
            await this.browser.waitUntil(async () => {
                const dialogState = await this.browser.isAlertOpen();
                return options.reverse ? !dialogState : dialogState;
            }, options);
        } catch (_) {
            const message = `The browser dialog is${options.reverse ? ' ' : ' not '}opened`;
            Logger.info(message);
            return false;
        }
        Logger.info(`The browser dialog is${options.reverse ? ' not ' : ' '}opened`);
        return true;
    }

    /**
     * Wait and check that browser dialog will be open 
     * @param {number} timeout - Timeout waiting for the dialog to open 
     * @returns {Promise<void>}
     */
    async isDialogOpened(timeout) {
        return this.#waitForDialogOpen({ timeout, reverse: false });
    }

    /**
     * Wait and check that browser dialog will be close 
     * @param {number} timeout Timeout waiting for the dialog to close 
     * @returns {Promise<void>}
     */
    async isDialogClosed(timeout) {
        return this.#waitForDialogOpen({ timeout, reverse: true });
    }

    /**
     * Dismiss browser alert dialog
     * @returns {Promise<boolean>}
     */
    async dismissDialog() {
        Logger.info('Dismiss browser alert dialog');
        await this.browser.dismissAlert();
        return this.#waitForDialogOpen({ reverse: true });
    }

    /**
     * Accept browser alert dialog
     * @returns {Promise<boolean>}
     */
    async acceptDialog() {
        Logger.info('Accept browser alert dialog');
        await this.browser.acceptAlert();
        return this.#waitForDialogOpen({ reverse: true });
    }

    /**
     * Get browser dialog text
     * @returns {Promise<string>}
     */
    async getDialogText() {
        Logger.info('Get browser dialog text');
        const text = await this.browser.getAlertText();
        Logger.info(`Value: "${text}"`);
        return text;
    }

    /**
     * Type text to browser dialog
     * @param {string} text Text to type
     * @returns {Promise<void>}
     */
    async typeTextToDialog(text) {
        Logger.info(`Type text "${text}" to browser dialog`);
        return this.browser.sendAlertText(text);
    }

};
