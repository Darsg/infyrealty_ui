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

const mockPermissionResponse = {
    status_code: 200,
    alert: "success",
    msg: "permission list fetch successfully",
    role: {
      org_id: 1,
      role_id: 1,
      role_name: "Admin",
      permission_list: [
        {
          id: 1,
          module_id: 1,
          module_name: "Dashboard",
          description: null,
          is_set: 1,
          module_permissions: [
            {
              id: 2,
              module_id: 1,
              module_permission: "View",
              description: null,
              is_set: 1,
            },
          ],
          sub_modules1_list: [
            {
              id: 3,
              module_id: 1,
              sub_module1_name: "Project",
              description: null,
              is_set: 1,
              sub_module1_permissions: [
                { id: 4, module_id: 1, sub_module1_id: 3, sub_module1_permission_name: "View", is_set: 1 },
                { id: 5, module_id: 1, sub_module1_id: 3, sub_module1_permission_name: "Create", is_set: 0 },
                { id: 6, module_id: 1, sub_module1_id: 3, sub_module1_permission_name: "Update", is_set: 0 },
                { id: 7, module_id: 1, sub_module1_id: 3, sub_module1_permission_name: "Delete", is_set: 0 },
              ],
              sub_module2_list: [
                {
                  id: 8,
                  module_id: 1,
                  sub_module1_id: 3,
                  sub_module2_name: "Tower",
                  is_set: 1,
                  sub_module2_permissions: [
                    { id: 9, module_id: 1, sub_module1_id: 3, sub_module2_id: 8, sub_module2_permission_name: "View", is_set: 1 },
                    { id: 10, module_id: 1, sub_module1_id: 3, sub_module2_id: 8, sub_module2_permission_name: "Create", is_set: 0 },
                    { id: 11, module_id: 1, sub_module1_id: 3, sub_module2_id: 8, sub_module2_permission_name: "Update", is_set: 0 },
                    { id: 12, module_id: 1, sub_module1_id: 3, sub_module2_id: 8, sub_module2_permission_name: "Delete", is_set: 0 },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 13,
          module_id: 2,
          module_name: "Users",
          description: null,
          is_set: 0,
          module_permissions: [
            { id: 14, module_id: 2, module_permission: "View", is_set: 0 },
            { id: 15, module_id: 2, module_permission: "Create", is_set: 0 },
          ],
          sub_modules1_list: [],
        },
        {
          id: 16,
          module_id: 3,
          module_name: "Settings",
          description: null,
          is_set: 1,
          module_permissions: [
            { id: 17, module_id: 3, module_permission: "View", is_set: 1 },
          ],
          sub_modules1_list: [
            {
              id: 18,
              module_id: 3,
              sub_module1_name: "Preferences",
              description: null,
              is_set: 1,
              sub_module1_permissions: [
                { id: 19, module_id: 3, sub_module1_id: 18, sub_module1_permission_name: "View", is_set: 1 },
                { id: 20, module_id: 3, sub_module1_id: 18, sub_module1_permission_name: "Edit", is_set: 1 },
              ],
              sub_module2_list: [],
            },
          ],
        },
        {
          id: 21,
          module_id: 4,
          module_name: "Reports",
          description: null,
          is_set: 0,
          module_permissions: [
            { id: 22, module_id: 4, module_permission: "View", is_set: 0 },
          ],
          sub_modules1_list: [
            {
              id: 23,
              module_id: 4,
              sub_module1_name: "Monthly Reports",
              description: null,
              is_set: 0,
              sub_module1_permissions: [
                { id: 24, module_id: 4, sub_module1_id: 23, sub_module1_permission_name: "View", is_set: 0 },
                { id: 25, module_id: 4, sub_module1_id: 23, sub_module1_permission_name: "Export", is_set: 0 },
              ],
              sub_module2_list: [
                {
                  id: 26,
                  module_id: 4,
                  sub_module1_id: 23,
                  sub_module2_name: "Finance",
                  is_set: 0,
                  sub_module2_permissions: [
                    { id: 27, module_id: 4, sub_module1_id: 23, sub_module2_id: 26, sub_module2_permission_name: "View", is_set: 0 },
                    { id: 28, module_id: 4, sub_module1_id: 23, sub_module2_id: 26, sub_module2_permission_name: "Print", is_set: 0 },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  };
  
  
  export default mockPermissionResponse;
  