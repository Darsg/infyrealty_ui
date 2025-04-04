import React, { useState } from "react";
import { ArrowDownIcon, ArrowRightIcon } from "../../../../icons";
import Checkbox from "../../../../components/form/input/Checkbox";

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
}

const RoleManageFormOne: React.FC<Props> = ({ data }) => {
  const [permissionData, setPermissionData] = useState(data);
  const [expandedModules, setExpandedModules] = useState<number[]>([]);

  const isViewPermission = (label: string = "") =>
    label.toLowerCase().includes("view");

  const toggleExpand = (id: number) => {
    setExpandedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const renderPermissions = (
    permissions: (Permission | SubModule1Permission | SubModule2Permission)[],
    path: string
  ) => {
    return permissions.map((perm, idx) => {
      const label =
        (perm as Permission).module_permission ||
        (perm as SubModule1Permission).sub_module1_permission_name ||
        (perm as SubModule2Permission).sub_module2_permission_name ||
        "";

      return (
        <label key={perm.id} className="block ml-4 pt-2">
          <Checkbox
                checked={perm.is_set === 1}
                onChange={(checked) => handlePermissionToggle(`${path}[${idx}]`, checked)}
                label={label}
            />
        </label>
      );
    });
  };

  const renderSubModule2 = (sub2List: SubModule2[], path: string) => {
    return sub2List.map((s2, i) => {
      const s2Path = `${path}[${i}]`;
      return (
        <div key={s2.id} className="ml-6 border-gray-300 pl-4 pt-2">
          <div
            className="flex items-center gap-2 cursor-pointer"
          >
            <strong>{s2.sub_module2_name}</strong>
          </div>
          {expandedModules.includes(s2.id) &&
            renderPermissions(
              s2.sub_module2_permissions,
              `${s2Path}.sub_module2_permissions`
            )}
        </div>
      );
    });
  };

  const renderSubModule1 = (sub1List: SubModule1[], path: string) => {
    return sub1List.map((s1, i) => {
      const s1Path = `${path}[${i}]`;
      return (
        <div key={s1.id} className="ml-4 border-gray-400 pl-4 pt-2">
            <div
            className="flex items-center gap-2 cursor-pointer"
            >
            <strong>{s1.sub_module1_name}</strong>
            </div>
            {expandedModules.includes(s1.id) && (
            <>
                {renderPermissions(
                s1.sub_module1_permissions,
                `${s1Path}.sub_module1_permissions`
                )}
                {renderSubModule2(
                s1.sub_module2_list,
                `${s1Path}.sub_module2_list`
                )}
            </>
            )}
        </div>
      );
    });
  };

  const renderModuleTree = () => {
    return permissionData.role.permission_list.map((mod, idx) => (
        <div key={mod.id} className="mb-4 border p-2 rounded-md">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => toggleExpand(mod.id)}
          >
            <div className="w-7 flex items-center justify-center">
              {expandedModules.includes(mod.id) ? (
                <ArrowDownIcon className="h-5 w-5 p-1 text-gray-500 text-gray-300" />
              ) : (
                <ArrowRightIcon className="h-5 w-5 p-1 text-gray-500 text-gray-300" />
              )}
            </div>
            <strong>{mod.module_name}</strong>
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
  };

  const uncheckChildrenOnly = (mod: typeof permissionData.role.permission_list[0], path: string) => {
    if (path.includes("sub_module2_permissions")) {
      mod.sub_modules1_list.forEach((s1) => {
        s1.sub_module2_list.forEach((s2) => {
          s2.sub_module2_permissions.forEach((p) => {
            p.is_set = 0;
            p.autoChecked = false;
          });
        });
      });
    } else if (path.includes("sub_module1_permissions")) {
      mod.sub_modules1_list.forEach((s1) => {
        s1.sub_module1_permissions.forEach((p) => {
          p.is_set = 0;
          p.autoChecked = false;
        });
        s1.sub_module2_list.forEach((s2) => {
          s2.sub_module2_permissions.forEach((p) => {
            p.is_set = 0;
            p.autoChecked = false;
          });
        });
      });
    } else if (path.includes("module_permissions")) {
      mod.module_permissions.forEach((p) => {
        p.is_set = 0;
        p.autoChecked = false;
      });
      mod.sub_modules1_list.forEach((s1) => {
        s1.sub_module1_permissions.forEach((p) => {
          p.is_set = 0;
          p.autoChecked = false;
        });
        s1.sub_module2_list.forEach((s2) => {
          s2.sub_module2_permissions.forEach((p) => {
            p.is_set = 0;
            p.autoChecked = false;
          });
        });
      });
    }
  };

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
      path.match(/role\.permission_list\[(\d+)\]/)?.[1] || "-1",
      10
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
    const pathChain = [];

    for (let i = 0; i < keys.length - 1; i++) {
      const match = keys[i].match(/(\w+)\[(\d+)\]/);
      if (match) {
        pathChain.push({ key: match[1], index: +match[2] });
      }
    }

    let current = updated.role;
    for (let i = 0; i < pathChain.length; i++) {
      const { key, index } = pathChain[i];
      current = current[key][index];

      let perms = [];
      if (key === "permission_list") {
        perms = current.module_permissions;
      } else if (key === "sub_modules1_list") {
        perms = current.sub_module1_permissions;
      } else if (key === "sub_module2_list") {
        perms = current.sub_module2_permissions;
      }

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

  return <div className="p-4">{renderModuleTree()}</div>;
};

export default RoleManageFormOne;
