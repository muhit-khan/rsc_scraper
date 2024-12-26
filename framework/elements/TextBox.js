import ElementType from "../constants/ElementType.js";
import BaseElement from "./BaseElement.js";

export class TextBox extends BaseElement {
  constructor(locator, name) {
    super(locator, name);
    this.type = ElementType.TEXT_BOX;
  }
}
