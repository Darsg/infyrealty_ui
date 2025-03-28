import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

// Extend dayjs with custom parsing support
dayjs.extend(customParseFormat);
export class Utility {

    /**
     * Converts a date from one format to another.
     * @param date - The date string to convert.
     * @param inputFormat - The format of the input date string.
     * @param outputFormat - The desired output format.
     * @returns The formatted date string or an empty string if invalid.
     */
    static convertDateFormat(date: string, inputFormat: string, outputFormat: string): string {
        if (!date || !inputFormat || !outputFormat) return "";

        const parsedDate = dayjs(date, inputFormat);
        return parsedDate.isValid() ? parsedDate.format(outputFormat) : "";
    }
}
