/**
 * @author Benjamin Altpeter [hi@bn.al]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 */

import JSON5 from "json5";
import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * JSON Parse operation
 */
class JSONParse extends Operation {
    /**
     * JSONParse constructor
     */
    constructor() {
        super();

        this.name = "JSON Parse";
        this.module = "Default";
        this.description = "Parse a JSON string into a JavaScript object.";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        let result;
        try {
            result = JSON5.parse(input);
        } catch (err) {
            throw new OperationError(err);
        }
        return result;
    }
}

export default JSONParse;
