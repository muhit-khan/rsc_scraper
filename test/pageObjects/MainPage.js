import BasePage from '../../framework/page/BasePage.js'
import { Label, ElementsList, Button } from '../../framework/elements/index.js'
import Browser from '../../framework/Browser/Browser.js'
import fs from 'fs'
import path from 'path'

const locatorForPageTitle = "//*[@class='promo-primary__title']";
const locatorForFireSafetyButton = "//*[normalize-space()='Fire Safety']";


class MainPage extends BasePage {
    constructor() {
        super(
            new Label(locatorForPageTitle, 'Factories Page Title'),
            'Factories Page'
        );

        // this.garmentCards = new ElementsList('.garments-card', 'Garment Cards');
        this.fireSafetyButtons = new ElementsList(locatorForFireSafetyButton, 'Fire Safety Buttons');
    }

    async scrollToBottom() {
        await Browser.execute('window.scrollTo(0, document.documentElement.scrollHeight)');
        await Browser.waitForDelay(2000);
    }

    async loadAllContent() {
        let lastHeight = 0;
        let newHeight = await Browser.execute('return document.documentElement.scrollHeight');

        while (lastHeight !== newHeight) {
            lastHeight = newHeight;
            await this.scrollToBottom();
            await Browser.waitForDelay(1000);
            newHeight = await Browser.execute('return document.documentElement.scrollHeight');
        }
    }

    async getFireSafetyButtons() {
        return this.fireSafetyButtons.getListOfElements();
    }
}

export default new MainPage();