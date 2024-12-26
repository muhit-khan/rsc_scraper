import Timeouts from '../../constants/Timeouts.js';
import Logger from '../../utils/Logger.js';

const elementState = {
  exist: 'exist',
  enabled: 'enabled',
  clickable: 'clickable',
  displayed: 'displayed',
};

export default class ElementStateProvider {
  constructor(element, name) {
    this.element = element;
    this.name = name;
  }

  /**
   * Check if element is existing
   * @returns {Promise<boolean>} true if existing else false
   */
  async isExisting() {
    Logger.info(`Is element "${this.name}" existing`);
    return (await this.element).isExisting();
  }

  /**
   * Check if element is clickable
   * @returns {Promise<boolean>} true if clickable else false
   */
  async isClickable() {
    Logger.info(`Is element "${this.name}" clickable`);
    return (await this.element).isClickable();
  }

  /**
   * Check if element is displayed
   * @returns {Promise<boolean>} true if displayed else false
   */
  async isDisplayed() {
    Logger.info(`Is element "${this.name}" displayed`);
    return (await this.element).isDisplayed();
  }

  /**
   * Check if element is displayed
   * @returns {Promise<boolean>} true if partially displayed and within viewport else false
   */
  async isDisplayedInViewport() {
    Logger.info(`Is element "${this.name}" displayed in viewport`);
    return (await this.element).isDisplayedInViewport();
  }

  /**
   * Check if element is enabled
   * @returns {Promise<boolean>} true if enabled else false
   */
  async isEnabled() {
    Logger.info(`Is element "${this.name}" enabled`);
    return (await this.element).isEnabled();
  }

  /**
   * Check if element is selected
   * @returns {Promise<boolean>} true if selected else false
   */
  async isSelected() {
    Logger.info(`Is element "${this.name}" selected`);
    return (await this.element).isSelected();
  }

  /**
   * Wait for element to exist
   * @param {object} options - Options for waiting
   * @returns {Promise<boolean>} true if exists else false
   */
  async waitForExist(options = { timeout: null, interval: null, reverse: null, noThrow: null }) {
    options.timeout = options.timeout || Timeouts.explicit;
    options.interval = options.interval || Timeouts.interval;
    options.reverse = options.reverse || false;
    const func = async (options) => await (await this.element).waitForExist(options);
    return this.#waitFor(func, options, elementState.exist);
  }

  /**
   * Wait for element to be enabled
   * @param {object} options - Options for waiting
   * @returns {Promise<boolean>} true if enabled else false
   */
  async waitForEnabled(options = { timeout: null, interval: null, reverse: null, noThrow: null }) {
    options.timeout = options.timeout || Timeouts.explicit;
    options.interval = options.interval || Timeouts.interval;
    options.reverse = options.reverse || false;
    const func = async (options) => await (await this.element).waitForEnabled(options);
    return this.#waitFor(func, options, elementState.enabled);
  }

  /**
   * Wait for element to be displayed
   * @param {object} options - Options for waiting
   * @returns {Promise<boolean>} true if displayed else false
   */
  async waitForDisplayed(options = { timeout: null, interval: null, reverse: null, noThrow: null }) {
    options.timeout = options.timeout || Timeouts.explicit;
    options.interval = options.interval || Timeouts.interval;
    options.reverse = options.reverse || false;
    const func = async (options) => await (await this.element).waitForDisplayed(options);
    return this.#waitFor(func, options, elementState.displayed);
  }

  /**
   * Wait for element to be clickable
   * @param {object} options - Options for waiting
   * @returns {Promise<boolean>} true if clickable else false
   */
  async waitForClickable(options = { timeout: null, interval: null, reverse: null, noThrow: null }) {
    options.timeout = options.timeout || Timeouts.explicit;
    options.interval = options.interval || Timeouts.interval;
    options.reverse = options.reverse || false;
    const func = async (options) => await (await this.element).waitForClickable(options);
    return this.#waitFor(func, options, elementState.clickable);
  }

  /**
   * Wait for element to be in state
   * @param {function} func - Waiter function
   * @param {object} options - Options for waiter function
   * @param {string} state - State to wait for
   * @returns {Promise<boolean>} true if in state else false
   */
  async #waitFor(func, options, state) {
    state = options.reverse === false ? state : `not ${state}`;
    Logger.info(`Waiting (${options.timeout} ms) for element "${this.name}" is "${state}"`);
    try {
      await func(options);
      Logger.info(`Element "${this.name}" is in state "${state}"`);
      return true;
    } catch {
      const msg = `Element "${this.name}" is not in state "${state}"`;
      Logger.warn(msg);
      if (options.noThrow) {
        return false;
      } else {
        throw new Error(msg);
      }
    }
  }

}
