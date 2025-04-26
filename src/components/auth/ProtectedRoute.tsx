import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../service/store/store";
import { getRoleDetails } from "../../service/apis/AuthService";
import { setPermissionData } from "../../service/reducer/permissionSlice";
import {
  Module,
  PermissionDetails,
  RoleForm,
  RoleResponse,
  SubModule,
} from "../../type/permission";
import SplashScreen from "../../pages/SplashScreen";

const ProtectedRoute = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("infytoken");
  const rawRoleId = localStorage.getItem("infyRoleId");
  const roleId = rawRoleId !== "undefined" ? rawRoleId : null;
  const isAdmin = localStorage.getItem("infyIsAdmin") === "Admin";
  const projectId = localStorage.getItem("infyProjectId");

  useEffect(() => {
    let isMounted = true;

    const fetchUserPermission = async (role_id: string) => {
      try {
        const response = await getRoleDetails(role_id);
        const role: RoleResponse = response?.role;

        const modules: Module[] = role.permission_list.map((module): Module => ({
          id: module.id,
          parent_id: null,
          module_id: module.id,
          module_name: module.module_name,
          permission_details: module.module_permissions.reduce(
            (acc: PermissionDetails, p) => ({
              ...acc,
              [p.module_permission]: { value: true },
            }),
            {}
          ),
          sub_modules: module.sub_modules1_list.map((sub1): SubModule => ({
            id: sub1.id,
            parent_id: module.id,
            module_id: sub1.module_id,
            module_name: sub1.sub_module1_name,
            permission_details: sub1.sub_module1_permissions.reduce(
              (acc: PermissionDetails, p) => ({
                ...acc,
                [p.sub_module1_permission_name]: { value: true },
              }),
              {}
            ),
            sub_modules: sub1.sub_module2_list.map((sub2): SubModule => ({
              id: sub2.id,
              parent_id: sub1.id,
              module_id: sub2.module_id,
              module_name: sub2.sub_module2_name,
              permission_details: sub2.sub_module2_permissions.reduce(
                (acc: PermissionDetails, p) => ({
                  ...acc,
                  [p.sub_module2_permission_name]: { value: true },
                }),
                {}
              ),
              sub_modules: [],
            })),
          })),
        }));

        const roleForm: RoleForm = {
          id: role.role_id,
          roleName: role.role_name,
          modules: modules,
        };

        if (isMounted) {
          dispatch(setPermissionData(roleForm));
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error while fetching user permission", error);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (token && roleId) {
      fetchUserPermission(roleId);
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, token, roleId]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (token && ((isAdmin && roleId) || (projectId && roleId))) ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
