import React, { useEffect, useState } from "react";
import { ArrowDownIcon, ArrowRightIcon } from "../../../../icons";
import Checkbox from "../../../../components/form/input/Checkbox";
import { Modal } from "../../../../components/ui/modal";
import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";
import Button from "../../../../components/ui/button/Button";
import { createRole, getAssignedRole, updateRole } from "../../../../service/apis/AuthService";
import { toast } from "react-toastify";

export interface PermissionResponse {
  status_code: number;
  alert: string;
  msg: string;
  role: Role;
}

export interface Role {
  org_id: number;
  role_id: number;
  role_name: string;
  permission_list: Module[];
}

export interface BasePermission {
  id: number;
  module_id: number;
  description?: string | null;
  is_set: number;
  autoChecked?: boolean;
}

export interface Module extends BasePermission {
  module_name: string;
  module_permissions: Permission[];
  sub_modules1_list: SubModule1[];
}

export interface Permission extends BasePermission {
  module_permission: string;
}

export interface SubModule1 extends BasePermission {
  sub_module1_name: string;
  sub_module1_permissions: SubModule1Permission[];
  sub_module2_list: SubModule2[];
}

export interface SubModule1Permission extends BasePermission {
  sub_module1_id: number;
  sub_module1_permission_name: string;
}

export interface SubModule2 extends BasePermission {
  sub_module1_id: number;
  sub_module2_name: string;
  sub_module2_permissions: SubModule2Permission[];
}

export interface SubModule2Permission extends BasePermission {
  sub_module1_id: number;
  sub_module2_id: number;
  sub_module2_permission_name: string;
}

interface Props {
  data: PermissionResponse;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  roleId: number | null; 
  onSave: () => void;
}

const RoleManageFormOne: React.FC<Props> = ({ roleId, data, isOpen, setIsOpen, onSave }) => {
  const [permissionData, setPermissionData] = useState(data);
  const [expandedModules, setExpandedModules] = useState<number[]>([]);

  useEffect(() => {
    const fetchRoleDetails = async () => {
      if (isOpen && roleId !== null) {
        try {
          const response = await getAssignedRole(roleId);
          if (response?.status_code === 200) {
            setPermissionData(response);
          }
        } catch (error) {
          console.error("Error fetching role details:", error);
        }
      }
    };
  
    fetchRoleDetails();
  }, [isOpen, roleId]);

  const isViewPermission = (label = "") =>
    label.toLowerCase().includes("view");

  const toggleExpand = (id: number) => {
    setExpandedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    if(!permissionData.role.role_name) {
      toast("Please enter a role name", { type: "error" });
      return;
    }

    try{
      console.log("Saving permissions...", permissionData);
      console.log("Saving permissions...", getSelectedPermissions());

      const formData = new FormData();
      const payload = getSelectedPermissions();
      let response;

      formData.append("role_name", permissionData.role.role_name);
      formData.append('module_list', JSON.stringify(payload.module_list));
      formData.append('module_permission', JSON.stringify(payload.module_permission));
      formData.append('sub_module1_list', JSON.stringify(payload.sub_module1_list));
      formData.append('sub_module1_permission', JSON.stringify(payload.sub_module1_permission));
      formData.append('sub_module2_list', JSON.stringify(payload.sub_module2_list));
      formData.append('sub_module2_permission', JSON.stringify(payload.sub_module2_permission));

      if (roleId !== 0) {
        formData.append("role_id", (roleId ?? 0).toString());
        response = await updateRole(formData);
      } else {
        formData.append("role_id", "0");
        response = await createRole(formData);
      }

      toast(response.msg, { type: response.alert});
      
      if (response?.status_code === 200) {
        setIsOpen(false);
        onSave();
      }
    } catch (error) {
      console.error("Error saving permissions:", error);
      toast("Error saving permissions", { type: "error" });
    }
  }

  const handlePermissionToggle = (path: string, autoCheckView = false) => {
    const updated = JSON.parse(JSON.stringify(permissionData));
    const keys = path.split(".");
    let target: any = updated;

    for (let i = 0; i < keys.length - 1; i++) {
      const match = keys[i].match(/(\w+)\[(\d+)\]/);
      if (match) {
        const [, key, idx] = match;
        target = target[key][+idx];
      } else {
        target = target[keys[i]];
      }
    }

    const last = keys[keys.length - 1];
    const [, arrKey, index] = last.match(/(\w+)\[(\d+)\]/) || [];
    if (!arrKey) return;

    const permission = target[arrKey][+index];
    const label =
      permission.module_permission ||
      permission.sub_module1_permission_name ||
      permission.sub_module2_permission_name;

    const isChecking = permission.is_set === 0;
    permission.is_set = isChecking ? 1 : 0;

    const isView = isViewPermission(label);
    const moduleIdx = parseInt(
      path.match(/role\.permission_list\[(\d+)\]/)?.[1] || "-1"
    );
    if (moduleIdx === -1) return;

    const module = updated.role.permission_list[moduleIdx];

    if (isChecking) {
      if (isView) {
        checkParentViewPermissions(keys, updated);
      } else if (autoCheckView) {
        const viewPerm = target[arrKey].find((p: any) =>
          isViewPermission(
            p.module_permission ||
              p.sub_module1_permission_name ||
              p.sub_module2_permission_name
          )
        );
        if (viewPerm) {
          viewPerm.is_set = 1;
          viewPerm.autoChecked = true;
        }
        checkParentViewPermissions(keys, updated);
      }
      module.is_set = 1;
    } else {
      if (isView) {
        uncheckChildrenOnly(module, path);
      }
      permission.autoChecked = false;
    }

    setPermissionData(updated);
  };

  const checkParentViewPermissions = (keys: string[], updated: any) => {
    let current = updated.role;
    for (let i = 0; i < keys.length - 1; i++) {
      const match = keys[i].match(/(\w+)\[(\d+)\]/);
      if (!match) continue;

      const [, key, idx] = match;
      current = current[key][+idx];

      let perms = [];
      if (key === "permission_list") perms = current.module_permissions;
      else if (key === "sub_modules1_list") perms = current.sub_module1_permissions;
      else if (key === "sub_module2_list") perms = current.sub_module2_permissions;

      const viewPerm = perms?.find((p: any) =>
        isViewPermission(
          p.module_permission ||
            p.sub_module1_permission_name ||
            p.sub_module2_permission_name
        )
      );

      if (viewPerm && viewPerm.is_set === 0) {
        viewPerm.is_set = 1;
        viewPerm.autoChecked = true;
      }

      current.is_set = 1;
    }
  };

  const uncheckChildrenOnly = (mod: Module, path: string) => {
    const uncheckPerms = (perms: BasePermission[]) =>
      perms.forEach((p) => {
        p.is_set = 0;
        p.autoChecked = false;
      });

    if (path.includes("module_permissions")) {
      uncheckPerms(mod.module_permissions);
    }

    mod.sub_modules1_list.forEach((s1) => {
      if (path.includes("sub_module1_permissions") || path.includes("module_permissions")) {
        uncheckPerms(s1.sub_module1_permissions);
      }
      s1.sub_module2_list.forEach((s2) => {
        if (
          path.includes("sub_module2_permissions") ||
          path.includes("sub_module1_permissions") ||
          path.includes("module_permissions")
        ) {
          uncheckPerms(s2.sub_module2_permissions);
        }
      });
    });
  };

  const renderPermissions = (
    permissions: (Permission | SubModule1Permission | SubModule2Permission)[],
    path: string
  ) =>
    permissions.map((perm, idx) => {
      const label =
        (perm as Permission).module_permission ||
        (perm as SubModule1Permission).sub_module1_permission_name ||
        (perm as SubModule2Permission).sub_module2_permission_name ||
        "";
      return (
        <label key={perm.id} className="block ml-4 pt-2">
          <Checkbox
            checked={perm.is_set === 1}
            onChange={() =>
              handlePermissionToggle(`${path}[${idx}]`, !isViewPermission(label))
            }
            label={label}
          />
        </label>
      );
    });

  const renderSubModule2 = (sub2List: SubModule2[], path: string) =>
    sub2List.map((s2, i) => {
      const s2Path = `${path}[${i}]`;
      return (
        <div key={s2.id} className="ml-6 border-gray-300 pl-4 pt-2">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => toggleExpand(s2.id)}
          >
            {expandedModules.includes(s2.id) ? (
              <ArrowDownIcon className="h-5 w-5 p-1 text-gray-500" />
            ) : (
              <ArrowRightIcon className="h-5 w-5 p-1 text-gray-500" />
            )}
            <Label>{s2.sub_module2_name}</Label>
          </div>
          {expandedModules.includes(s2.id) &&
            renderPermissions(s2.sub_module2_permissions, `${s2Path}.sub_module2_permissions`)}
        </div>
      );
    });

  const renderSubModule1 = (sub1List: SubModule1[], path: string) =>
    sub1List.map((s1, i) => {
      const s1Path = `${path}[${i}]`;
      return (
        <div key={s1.id} className="ml-4 border-gray-400 pl-4 pt-2">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => toggleExpand(s1.id)}
          >
            {expandedModules.includes(s1.id) ? (
              <ArrowDownIcon className="h-5 w-5 p-1 text-gray-500" />
            ) : (
              <ArrowRightIcon className="h-5 w-5 p-1 text-gray-500" />
            )}
            <Label>{s1.sub_module1_name}</Label>
          </div>
          {expandedModules.includes(s1.id) && (
            <>
              {renderPermissions(
                s1.sub_module1_permissions,
                `${s1Path}.sub_module1_permissions`
              )}
              {renderSubModule2(s1.sub_module2_list, `${s1Path}.sub_module2_list`)}
            </>
          )}
        </div>
      );
    });

  const renderModuleTree = () =>
    permissionData.role.permission_list.map((mod, idx) => (
      <div key={mod.id} className="mb-4 rounded-md">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => toggleExpand(mod.id)}
        >
          <div className="w-7 flex items-center justify-center">
            {expandedModules.includes(mod.id) ? (
              <ArrowDownIcon className="h-5 w-5 p-1 text-gray-500" />
            ) : (
              <ArrowRightIcon className="h-5 w-5 p-1 text-gray-500" />
            )}
          </div>
          <Label>{mod.module_name}</Label>
        </div>

        {expandedModules.includes(mod.id) && (
          <>
            {renderPermissions(
              mod.module_permissions,
              `role.permission_list[${idx}].module_permissions`
            )}
            {renderSubModule1(
              mod.sub_modules1_list,
              `role.permission_list[${idx}].sub_modules1_list`
            )}
          </>
        )}
      </div>
    ));

    const getSelectedPermissions = () => {
      const payload = {
        module_list: [] as any[],
        module_permission: [] as any[],
        sub_module1_list: [] as any[],
        sub_module1_permission: [] as any[],
        sub_module2_list: [] as any[],
        sub_module2_permission: [] as any[],
      };
  
      permissionData.role.permission_list.forEach((mod) => {
        const { id: module_id } = mod;
  
        if (mod.is_set === 1) {
          payload.module_list.push({ id: module_id });
        }
  
        mod.module_permissions.forEach((perm) => {
          if (perm.is_set === 1) {
            payload.module_permission.push({
              module_id,
              id: perm.id,
            });
          }
        });
  
        mod.sub_modules1_list.forEach((sub1) => {
          const { id: sub_module1_id } = sub1;
  
          if (sub1.is_set === 1) {
            payload.sub_module1_list.push({
              module_id,
              id: sub_module1_id,
            });
          }
  
          sub1.sub_module1_permissions.forEach((perm) => {
            if (perm.is_set === 1) {
              payload.sub_module1_permission.push({
                module_id,
                sub_module1_id,
                id: perm.id,
              });
            }
          });
  
          sub1.sub_module2_list.forEach((sub2) => {
            const { id: sub_module2_id } = sub2;
  
            if (sub2.is_set === 1) {
              payload.sub_module2_list.push({
                module_id,
                sub_module1_id,
                id: sub_module2_id,
              });
            }
  
            sub2.sub_module2_permissions.forEach((perm) => {
              if (perm.is_set === 1) {
                payload.sub_module2_permission.push({
                  module_id,
                  sub_module1_id,
                  sub_module2_id,
                  id: perm.id,
                });
              }
            });
          });
        });
      });
  
      return payload;
    };

    return (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          isFullscreen={true}
          className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900"
        >
          <div className="w-screen h-screen flex flex-col bg-white dark:bg-gray-900 rounded-3xl p-4 lg:p-11">
            {/* ✅ Make Header Sticky at Top */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 px-2 pr-14 pb-2">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Role Management
              </h4>
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                Only admins can assign roles to staff members.
              </p>
              <div className="px-2">
                <Label>Role Name*</Label>
                <Input
                  type="text"
                  name="roleName"
                  className="w-full sm:max-w-sm"
                  value={permissionData?.role?.role_name || ""}
                  onChange={(e) =>
                    setPermissionData((prev) => ({
                      ...prev,
                      role: {
                        ...prev.role,
                        role_name: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>
      
            <div className="flex-1 overflow-y-auto">
              {renderModuleTree()}
            </div>
      
            <div className="sticky bottom-0 left-0 w-full bg-white dark:bg-gray-900 py-4 px-2 flex justify-end gap-3 border-t">
              <Button size="sm" variant="outline" onClick={() => setIsOpen(false)}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>
        </Modal>
    );
};

export default RoleManageFormOne;
