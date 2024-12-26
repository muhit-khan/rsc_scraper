import BasePage from '../../framework/page/BasePage.js'
import { Label, ElementsList, Button } from '../../framework/elements/index.js'
import Browser from '../../framework/browser/Browser.js'
import fs from 'fs'
import path from 'path'

const locatorForPageTitle = "//*[@class='promo-primary__title']";
// Updated locator to target Fire Safety links/buttons
const locatorForFireSafetyButton = "//a[contains(@href, 'fire-safety') or .//text()[contains(., 'Fire Safety')]]";

class MainPage extends BasePage {
    constructor() {
        super(new Label(locatorForPageTitle, 'Factories Page Title'), 'Factories Page');
        this.cardsList = new ElementsList(new Button(locatorForFireSafetyButton, "Fire Safety Report Downloading Button"), 'List of Fire Safety Buttons');
    }

    async numOfGarmentCards() {
        const cards = await this.cardsList.getListOfElements();
        return cards.length;
    }

    async scrollToBottom(scrollPauseTime, maxAttempts = 220) {
        let lastHeight = await Browser.executeScript('return document.documentElement.scrollHeight');
        let attempts = 0;

        while (attempts < maxAttempts) {
            try {
                await Browser.executeScript('window.scrollTo(0, document.documentElement.scrollHeight)');
                await Browser.waitForDelay(scrollPauseTime);

                let newHeight = await Browser.executeScript('return document.documentElement.scrollHeight');

                if (newHeight === lastHeight) {
                    break;
                }
                lastHeight = newHeight;
                attempts++;
            } catch (error) {
                console.error('Error while scrolling:', error);
                break;
            }
        }
    }

    async getAllGarmentCards(scrollPauseTime) {
        await this.scrollToBottom(scrollPauseTime);
        // Add wait for elements to be present
        await Browser.waitForDelay(20000);
        const cards = await this.cardsList.getListOfElements();
        console.log(`Found ${cards.length} Fire Safety buttons`);
        if (cards.length === 0) {
            console.error('No Fire Safety buttons found. Please check if the locator is correct or if the page structure has changed.');
        }
        return cards;
    }

    async createDownloadDirectory(downloadDir) {
        const fullPath = path.join(process.cwd(), downloadDir);
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath);
        }
        return fullPath;
    }

    async downloadAllFireSafetyPDFs(config) {
        const allCards = await this.getAllGarmentCards(config.scrollPauseTime);
        console.log(`Found ${allCards.length} garment cards`);

        const downloadResults = {
            successful: 0,
            failed: 0,
            errors: [],
            totalCards: allCards.length
        };

        for (let i = 0; i < allCards.length; i++) {
            try {
                await allCards[i].click();
                await Browser.waitForDelay(config.downloadTimeout);
                downloadResults.successful++;
                console.log(`Successfully downloaded PDF ${i + 1}/${allCards.length}`);
            } catch (error) {
                downloadResults.failed++;
                downloadResults.errors.push(`Failed to download PDF ${i + 1}: ${error.message}`);
                console.error(`Error downloading PDF ${i + 1}: ${error.message}`);
            }
        }

        this.logDownloadSummary(downloadResults);
        return downloadResults;
    }

    logDownloadSummary(results) {
        console.log('\nDownload Summary:');
        console.log(`Total PDFs: ${results.totalCards}`);
        console.log(`Successfully downloaded: ${results.successful}`);
        console.log(`Failed downloads: ${results.failed}`);
    }
}

export default new MainPage();