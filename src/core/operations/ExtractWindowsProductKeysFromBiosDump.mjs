/**
 * @author Benjamin Altpeter [hi@bn.al]
 * @copyright Crown Copyright 2023
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import { findWindowsProductKeys } from "bios-info";

/**
 * Find Windows product keys in BIOS/UEFI dump operation
 */
class ExtractWindowsProductKeysFromBiosDump extends Operation {
    /**
     * ExtractWindowsProductKeysFromBiosDump constructor
     */
    constructor() {
        super();

        this.name = "Extract Windows product keys from BIOS dump";
        this.module = "Extractors";
        this.description = `Finds the Windows product key(s) embedded by the OEM in the BIOS or UEFI firmware.<br><br>

Whereas for previous Windows versions, the Windows product key on OEM systems was provided on a COA sticker, since Windows 8, it is typically stored in the MSDM ACPI table in the BIOS/UEFI.<br>This function tries to extract the key from a BIOS dump using two methods:<br>

<ol>
    <li><a href='https://vlab.su/viewtopic.php?f=35&t=30952'>Various</a> <a href='https://www.alisaler.com/find-windows-key-from-bios-bin-file/'>sources</a> indicate that the key should be stored in the BIOS immediately following the marker <code>010000000000000001000000000000001d000000</code>. If we find this marker, we extract the following 29 characters (the length of a product key).</li>
    <li>As a backup, we also extract everything that looks like a product key in the dump using a regex.</li>
</ol>

e.g. <code>3V66T-NKG7Y-8B7W4-X2WWD-8QK9K</code>`;
        this.infoURL =
            "https://dellwindowsreinstallationguide.com/the-oem-product-key-and-oem-system-locked-preinstallation/";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
    }

    /**
     * @param {ArrayBuffer} input
     * @returns {string}
     */
    run(input) {
        const biosBuffer = Buffer.from(input);
        const keys = findWindowsProductKeys(biosBuffer);

        return keys.join("\n");
    }
}

export default ExtractWindowsProductKeysFromBiosDump;
