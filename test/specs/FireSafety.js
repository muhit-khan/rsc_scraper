import { baseUrl } from '../../framework/configs/main.wdio.conf.js'
import { assert } from 'chai'
import Browser from '../../framework/browser/Browser.js'
import MainPage from '../pageObjects/MainPage.js'
import testData from '../testData.json'

describe('Fire Safety PDF Download Test', () => {
    before(async () => {
        await MainPage.createDownloadDirectory(testData.downloadConfig.downloadDir);
    });

    it('should download all Fire Safety PDFs', async function () {
        this.timeout(60000);

        await Browser.openUrl(baseUrl);
        assert.isTrue(await MainPage.isPageOpened(), 'Main Page failed to load');

        const downloadResults = await MainPage.downloadAllFireSafetyPDFs(testData.downloadConfig);

        assert.isAbove(downloadResults.totalCards, 0, 'No garment cards found on page');
        assert.equal(downloadResults.failed, 0,
            `Failed to download ${downloadResults.failed} PDFs:\n${downloadResults.errors.join('\n')}`);
    });
});
