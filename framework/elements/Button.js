import ElementType from "../constants/ElementType.js";
import Logger from "../utils/Logger.js";
import BaseElement from "./BaseElement.js";

const MouseButtons = {
  RIGHT: 'right',
  MIDDLE: 'middle',
  DOUBLE: 'double',
};

export class Button extends BaseElement {
  constructor(locator, name) {
    super(locator, name);
    this.type = ElementType.BUTTON;
  }

  /**
   * Click on the element
   * @param {string} type - type of mouse button to click 
   * @returns {Promise<void>}
   */
  async #click(type) {
    Logger.info(`${this.log()}${type} click at element`);
    await this.state().waitForExist();
    await this.state().waitForClickable();

    const element = await this._get$()
    if (type === MouseButtons.DOUBLE){
      return element.doubleClick();
    } else {
      return element.click({ button: type });
    }
  }

  /**
   * Click by right button on the element
   * @returns {Promise<void>}
   */
  async rightClick() {
    return this.#click(MouseButtons.RIGHT);
  }

  /**
   * Click by middle button on the element
   * @returns {Promise<void>}
   */
  async middleClick() {
    return this.#click(MouseButtons.MIDDLE);
  }

  /**
   * Double click on the element
   * @returns {Promise<void>}
   */
  async doubleClick() {
    return this.#click(MouseButtons.DOUBLE);
  }
}
