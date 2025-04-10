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
  "status_code": 200,
  "alert": "success",
  "msg": "permission list fetch successfully",
  "role": {
      "org_id": 25,
      "role_id": 25,
      "role_name": "Admin",
      "role_description": null,
      "permission_list": [
          {
              "id": 1,
              "module_name": "DashBoard",
              "description": null,
              "is_set": 1,
              "module_permissions": [
                  {
                      "id": 1,
                      "module_id": 1,
                      "module_permission": "View",
                      "description": null,
                      "is_set": 1
                  }
              ],
              "sub_modules1_list": []
          },
          {
              "id": 2,
              "module_name": "Projects",
              "description": null,
              "is_set": 1,
              "module_permissions": [
                  {
                      "id": 2,
                      "module_id": 2,
                      "module_permission": "View",
                      "description": null,
                      "is_set": 1
                  },
                  {
                      "id": 3,
                      "module_id": 2,
                      "module_permission": "Add",
                      "description": null,
                      "is_set": 1
                  },
                  {
                      "id": 4,
                      "module_id": 2,
                      "module_permission": "Edit",
                      "description": null,
                      "is_set": 1
                  },
                  {
                      "id": 5,
                      "module_id": 2,
                      "module_permission": "Delete",
                      "description": null,
                      "is_set": 1
                  }
              ],
              "sub_modules1_list": [
                  {
                      "id": 1,
                      "module_id": 2,
                      "sub_module1_name": "Document",
                      "description": null,
                      "is_set": 1,
                      "sub_module1_permissions": [
                          {
                              "id": 1,
                              "module_id": 2,
                              "sub_module1_id": 1,
                              "sub_module1_permission_name": "View",
                              "description": null,
                              "is_set": 1
                          },
                          {
                              "id": 2,
                              "module_id": 2,
                              "sub_module1_id": 1,
                              "sub_module1_permission_name": "Add",
                              "description": null,
                              "is_set": 1
                          },
                          {
                              "id": 3,
                              "module_id": 2,
                              "sub_module1_id": 1,
                              "sub_module1_permission_name": "Edit",
                              "description": null,
                              "is_set": 1
                          },
                          {
                              "id": 4,
                              "module_id": 2,
                              "sub_module1_id": 1,
                              "sub_module1_permission_name": "Delete",
                              "description": null,
                              "is_set": 1
                          }
                      ],
                      "sub_module2_list": []
                  }
              ]
          },
          {
              "id": 3,
              "module_name": "Setting",
              "description": null,
              "is_set": 1,
              "module_permissions": [
                  {
                      "id": 6,
                      "module_id": 3,
                      "module_permission": "View",
                      "description": null,
                      "is_set": 1
                  }
              ],
              "sub_modules1_list": [
                  {
                      "id": 2,
                      "module_id": 3,
                      "sub_module1_name": "Staff Management",
                      "description": null,
                      "is_set": 1,
                      "sub_module1_permissions": [
                          {
                              "id": 5,
                              "module_id": 3,
                              "sub_module1_id": 2,
                              "sub_module1_permission_name": "View",
                              "description": null,
                              "is_set": 1
                          },
                          {
                              "id": 6,
                              "module_id": 3,
                              "sub_module1_id": 2,
                              "sub_module1_permission_name": "Add",
                              "description": null,
                              "is_set": 1
                          },
                          {
                              "id": 7,
                              "module_id": 3,
                              "sub_module1_id": 2,
                              "sub_module1_permission_name": "Edit",
                              "description": null,
                              "is_set": 1
                          },
                          {
                              "id": 8,
                              "module_id": 3,
                              "sub_module1_id": 2,
                              "sub_module1_permission_name": "Delete",
                              "description": null,
                              "is_set": 1
                          }
                      ],
                      "sub_module2_list": [
                          {
                              "id": 1,
                              "module_id": 3,
                              "sub_module1_id": 2,
                              "sub_module2_name": "Role Management",
                              "description": null,
                              "is_set": 1,
                              "sub_module2_permissions": [
                                  {
                                      "id": 1,
                                      "module_id": 3,
                                      "sub_module1_id": 2,
                                      "sub_module2_id": 1,
                                      "sub_module2_permission_name": "View",
                                      "description": null,
                                      "is_set": 1
                                  },
                                  {
                                      "id": 2,
                                      "module_id": 3,
                                      "sub_module1_id": 2,
                                      "sub_module2_id": 1,
                                      "sub_module2_permission_name": "Add",
                                      "description": null,
                                      "is_set": 1
                                  },
                                  {
                                      "id": 3,
                                      "module_id": 3,
                                      "sub_module1_id": 2,
                                      "sub_module2_id": 1,
                                      "sub_module2_permission_name": "Edit",
                                      "description": null,
                                      "is_set": 1
                                  },
                                  {
                                      "id": 4,
                                      "module_id": 3,
                                      "sub_module1_id": 2,
                                      "sub_module2_id": 1,
                                      "sub_module2_permission_name": "Delete",
                                      "description": null,
                                      "is_set": 1
                                  }
                              ]
                          }
                      ]
                  }
              ]
          }
      ]
  }
};
  
  
  export default mockPermissionResponse;
  