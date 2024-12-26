import Logger from '../utils/Logger.js';

export class ElementsList {
    constructor(elementType, locator, name) {
        this.elementType = elementType;
        this.locator = locator;
        this.name = name;
    }

    /**
     * Get list of elements
     * @returns {Promise<array>} Array of elements
     */
    async getListOfElements() {
        Logger.info(`Get all elements "${this.name}"`);

        // await this.state().waitForExist();
        const listOfElements = await $$(this.locator);
        Logger.info(`Found '${listOfElements.length}' elements`);

        const elements = [];
        for (const [index, el] of listOfElements.entries()) {
            const element = new this.elementType(el, `${this.name} #${index}`);
            elements.push(element);
        }
        return elements;
    }

}
