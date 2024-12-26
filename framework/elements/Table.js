import ElementType from "../constants/ElementType.js";
import Logger from "../utils/Logger.js";
import BaseElement from "./BaseElement.js";
import { TableRow } from "./TableRow.js";

export class Table extends BaseElement {
    constructor(tableLocator, name, options = {
        rowLocator: '//tbody//tr',
        headerLocator: '//thead//tr',
        headerCellLocator: '//th',
        cellLocator: '//td'
    }) {
        super(tableLocator, name);
        this.type = ElementType.TABLE;

        this.rowLocator = options.rowLocator || '//tbody//tr';
        this.headerLocator = options.headerLocator || '//thead//tr';
        this.headerCellLocator = options.headerCellLocator || '//th';
        this.cellLocator = options.cellLocator || '//td';
    }

    /**
     * Find header row element in the table
     * @returns {Promise<TableRow>} Table header row
     */
    async getTableHeaderRow() {
        Logger.info(`${this.log()}Find header row in the table`);
        return this.findChild(TableRow, this.headerLocator, `Header row of "${this.name}"`, {
            cell: this.headerCellLocator,
            tableName: this.name,
        });
    }

    /**
     * Find rows elements in the table
     * @returns {Promise<array>} Array of table rows elements
     */
    async getTableRows() {
        Logger.info(`${this.log()}Find rows in the table`);
        return this.findAll(TableRow, this.rowLocator, `Row of "${this.name}"`, {
            cell: this.cellLocator,
            tableName: this.name,
        });
    }

    /**
     * Read all table cells and parse data to array of object
     * @returns {Promise<array>} Array objects. Object - row of table where property is header name and value is cell value
     */
    async parseTableContent() {
        Logger.info(`${this.log()}Parse table content and return array of objects`);
        const arrayOfData = [];

        const headerRow = await this.getTableHeaderRow();
        const headerTextArray = await headerRow.getCellsText();

        const tableRows = await this.getTableRows();
        for (const row of tableRows) {
            const rowObject = {};
            const rowTextArray = await row.getCellsText();
            for (const [index, cellText] of rowTextArray.entries()) {
                rowObject[headerTextArray[index]] = cellText;
            }
            arrayOfData.push(rowObject);
        }
        return arrayOfData;
    }

}
