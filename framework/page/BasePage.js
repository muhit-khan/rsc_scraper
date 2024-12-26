import Timeouts from '../constants/Timeouts.js';
import BaseElement from '../elements/BaseElement.js';
import Logger from '../utils/Logger.js';

export default class BasePage {
  constructor(uniqueElement, name) {
    this.uniqueElement = uniqueElement;
    this.name = name;
  }

  /**
   * Get name of the page
   * @returns {string} Name of the page
   */
  getPageName() {
    return this.name;
  }

  /**
   * Get unique element of the page
   * @returns {<T>BaseElement} unique element of the page
   */
  getPageUniqueElement() {
    return this.uniqueElement;
  }

  /**
   * Check if the form is opened, with 'pageLoadTime' timeout
   * @returns {Promise<boolean>} true if opened else false
   */
  async isPageOpened() {
    Logger.info(`Waiting for page "${this.name}" to load`);
    const isOpened = await this.uniqueElement.state().waitForDisplayed({
      timeout: Timeouts.pageLoadTime
    });
    Logger.info(`Page "${this.name}" is opened - "${isOpened}"`);
    return isOpened;
  }

}
