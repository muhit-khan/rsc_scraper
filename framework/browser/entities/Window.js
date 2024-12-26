import Logger from '../../utils/Logger.js';

export class Window {

    constructor() {
        this.browser = null;
    }

    /**
     * Resizes browser window outer size according to provided width and height
     * @param {object} [sizeOption={ width: 1200, height: 800 }] - browser window size (width and height)
     * @returns {Promise<void>}
     */
    async resize(sizeOption = { width: 800, height: 800 }) {
        const width = sizeOption && sizeOption.width || 800;
        const height = sizeOption && sizeOption.height || 800;
        Logger.info(`Resizes browser window - width:"${width}", height:"${height}"`);
        return this.browser.setWindowSize(width, height);
    }

    /**
     * Switch to window by name
     * @param {String} name - Name of the title or url of the page
     * @returns {Promise<void>}
     */
    async switchToWindow(name) {
        Logger.info(`Switch to window with name: "${name}"`);
        return this.browser.switchWindow(name);
    }

    /**
     * Switch to last window
     * @returns {Promise<void>}
     */
    async switchToLastWindow() {
        Logger.info('Switch to last window');
        const windows = await this.browser.getWindowHandles();
        Logger.info(`Windows count: ${windows.length}`);
        return this.browser.switchToWindow(windows.pop());
    }

    /**
     * Switch to first window
     * @returns {Promise<void>}
     */
    async switchToFirstWindow() {
        Logger.info('Switch to first window');
        const windows = await this.browser.getWindowHandles();
        return this.browser.switchToWindow(windows.shift());
    }

    /**
     * Close current window
     * @returns {Promise<void>}
     */
    async closeCurrentWindow() {
        Logger.info('Close last window');
        return this.browser.closeWindow();
    }

    /**
     * Refresh browser tab
     * @returns {Promise<void>}
     */
    async refresh() {
        Logger.info('Refresh the current page');
        return this.browser.refresh();
    }

    /**
     * Navigate to previous page
     * @returns {Promise<void>}
     */
    async back() {
        Logger.info('Navigate to previous page');
        return this.browser.back();
    }

    /**
     * Navigate to forward page
     * @returns {Promise<void>}
     */
    async forward() {
        Logger.info('Navigate to forward page');
        return this.browser.forward();
    }
};
