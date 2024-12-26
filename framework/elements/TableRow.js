import ElementType from "../constants/ElementType.js";
import Logger from "../utils/Logger.js";
import BaseElement from "./BaseElement.js";
import { Label } from "./Label.js";

export class TableRow extends BaseElement {
    constructor(rowLocator, name, options = { cell: '//td', tableName: 'Table' }) {
        super(rowLocator, name);
        this.type = ElementType.TABLE_ROW;

        this.cell = options.cell || '//td';
        this.tableName = options.tableName || 'Table';
    }

    /**
     * Find cells elements of row in the table
     * @returns {Promise<array>} Array of table cells elements of row
     */
    async getRowCells() {
        Logger.info(`${this.log()}Find cells in the table "${this.tableName}"`);
        return this.findAll(Label, this.cell, `Cell of "${this.name}" of table "${this.tableName}"`);
    }

    /**
     * Return array of cells text
     * @returns {Promise<array>} Array of table cells elements of row
     */
    async getCellsText() {
        const arrayOfCellsText = [];
        const rowCells = await this.getRowCells();
        for (const cell of rowCells) {
            const cellText = await cell.getText();
            arrayOfCellsText.push(cellText);
        }
        return arrayOfCellsText;
    }
}
