import Logger from '../../utils/Logger.js';

export class IFrame {

    constructor() {
        this.browser = null;
    }

    /**
     * Switch to frame of the element
     * @param {Frame} frame - Frame element object
     * @returns {Promise<void>}
     */
    async switchToFrame(frame) {
        Logger.info(`${frame.log()}Switch to new frame inside element`);
        await frame.state().waitForExist();
        await frame.state().waitForDisplayed();

        const element = await frame._get$();
        return this.browser.switchToFrame(element);
    }

    /**
     * Switch to parent frame of the current browsing frame context.
     * @returns {Promise<void>}
     */
    async switchToParentFrame() {
        Logger.info('Switch from element to the parent frame');
        return this.browser.switchToParentFrame();
    }

};
