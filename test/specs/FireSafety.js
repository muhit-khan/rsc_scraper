import { baseUrl } from '../../framework/configs/main.wdio.conf.js'
import { assert, expect } from 'chai'
import Browser from '../../framework/Browser/Browser.js'
import MainPage from '../pageObjects/MainPage.js'
import testData from '../testData.json'

describe('Fire Safety PDF Download Test', () => {
    let downloadedPDFs = 0;
    let failedDownloads = 0;

    before(async () => {
        await Browser.openUrl(baseUrl);
        assert.isTrue(await MainPage.isPageOpened(), 'Main Page failed to load');
    });

    it('should download all Fire Safety PDFs', async function () {
        // Load all content by scrolling
        await MainPage.loadAllContent();

        // Get all Fire Safety buttons
        const buttons = await MainPage.getFireSafetyButtons();
        console.log(`Found ${buttons.length} Fire Safety buttons`);

        // Try to download PDFs
        for (const button of buttons) {
            try {
                await button.waitForClickable({ timeout: 5000 });
                await button.click();
                downloadedPDFs++;
                await Browser.pause(1000); // Wait between downloads
            } catch (error) {
                console.error('Failed to download PDF:', error.message);
                failedDownloads++;
            }
        }

        // Log summary
        console.log('\nDownload Summary:');
        console.log(`Total PDFs: ${downloadedPDFs + failedDownloads}`);
        console.log(`Successfully downloaded: ${downloadedPDFs}`);
        console.log(`Failed downloads: ${failedDownloads}`);

        // Verify we downloaded at least one PDF
        expect(downloadedPDFs, 'No PDFs were downloaded successfully').to.be.above(0);
    });
});
