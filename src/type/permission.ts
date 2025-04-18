// This use for role managment related APIs
export interface PermissionDetails {
  [key: string]: {
    value: boolean;
  };
}
  
export interface SubModule2Response {
  id: number;
  module_id: number;
  sub_module2_name: string;
  sub_module2_permissions: {
    sub_module2_permission_name: string;
  }[];
}

export interface SubModule1Response {
  id: number;
  module_id: number;
  sub_module1_name: string;
  sub_module1_permissions: {
    sub_module1_permission_name: string;
  }[];
  sub_module2_list: SubModule2Response[];
}

export interface ModuleResponse {
  id: number;
  module_name: string;
  module_permissions: {
    module_permission: string;
  }[];
  sub_modules1_list: SubModule1Response[];
}

export interface RoleResponse {
  role_id: number;
  role_name: string;
  permission_list: ModuleResponse[];
}

export interface SubModule {
  id: number;
  parent_id: number | null;
  module_id: number;
  module_name: string;
  permission_details: PermissionDetails;
  sub_modules: SubModule[];
}

export interface Module {
  id: number;
  parent_id: number | null;
  module_id: number;
  module_name: string;
  permission_details: PermissionDetails;
  sub_modules: SubModule[];
}

export interface RoleForm {
  id?: number;
  roleName: string;
  modules: Module[];
}
  
export interface RoleProps {
  id: number;
  description: string;
  is_deleted: number;
  name: string;
  org_id: number;
}