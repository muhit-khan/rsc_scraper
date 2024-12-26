import ElementType from '../constants/ElementType.js';
import Logger from '../utils/Logger.js';
import BaseElement from './BaseElement.js';

export class Checkbox extends BaseElement {
  constructor(locator, name, options = { internalCheckbox: false }) {
    super(locator, name);
    this.type = ElementType.CHECKBOX;
    this.useInternalCheckbox = options.internalCheckbox;
  }

  #internalCheckboxElement = async () => this.findChild(Checkbox, '//input[@type="checkbox"]', 'Internal checkbox');

  /**
   * Method that validate if checkbox is checked and check/uncheck element
   * @param {boolean} reverse - "false" if need check the checkbox element and "true" if uncheck
   * @returns {Promise<void>}
   */
  async #check(reverse = false) {
    const isChecked = await this.isChecked();
    if (isChecked === reverse) {
      Logger.info(`${this.log()}Click at checkbox to check`);
      await this.click();
    } else {
      Logger.info(`${this.log()}Element is already ${!reverse ? 'checked' : 'unchecked'}`);
    }
  }

  /**
   * Click on checkbox element to check 
   * @returns {Promise<void>}
   */
  async check() {
    return this.#check();
  }

  /**
   * Click on checkbox element to uncheck 
   * @returns {Promise<void>}
   */
  async uncheck() {
    return this.#check(true);
  }

  /**
   * Check if checkbox element is selected 
   * @returns {Promise<boolean>}
   */
  async isChecked() {
    const element = this.useInternalCheckbox
      ? await this._get$()
      : await this.#internalCheckboxElement();

    await element.state().waitForExist();
    await element.state().waitForDisplayed();

    return element.state().isSelected();
  }

}
