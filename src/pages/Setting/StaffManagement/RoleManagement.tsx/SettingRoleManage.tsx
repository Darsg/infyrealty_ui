import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import PageMeta from "../../../../components/common/PageMeta";
import ComponentCardWithButton from "../../../../components/common/ComponentCardWithButton";
import RoleManageTable from "./RoleManageTable";
import { getOrgRoleList } from "../../../../service/apis/AuthService";
import RoleManageForm from "./RoleManageForm";

interface RoleProps {
  id: number;
  description: string;
  is_deleted: number;
  name: string;
  org_id: number;
}

export default function SettingRoleManage() {
  const [isOpen, setIsOpen] = useState(false);
  const [roleList, setRoleList] = useState<RoleProps[]>([]);
  const [selectedRole, setSelectedRole] = useState<RoleProps | null>(null);
  const navigate = useNavigate();

  // Fetch roles
  const fetchRoleList = useCallback(async () => {
    try {
      const response = await getOrgRoleList();
      if (response?.records) {
        setRoleList(response.records);
      } else {
        console.warn("No role records found.");
      }
    } catch (error) {
      console.error("Error fetching role list:", error);
    }
  }, []);

  useEffect(() => {
    fetchRoleList();
  }, [fetchRoleList]);

  // Button handlers
  const handleNavigateBack = () => navigate("/setting/staff-management", { replace: true });
  const handleEditRole = (role: RoleProps) => {
    setSelectedRole(role);
    setIsOpen(true);
  };
  const handleAddRole = () => {
    setSelectedRole(null);
    setIsOpen(true);
  };

  return (
    <>
      <PageMeta
        title="React.js Role Management"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <ComponentCardWithButton
        title="Role Management"
        backButton
        onBackButtonClick={handleNavigateBack}
        buttonTitle="Add Role"
        onButtonClick={handleAddRole}
      >
        <div className="space-y-6">
          <RoleManageTable roleList={roleList} onEdit={handleEditRole} />
          <RoleManageForm
            roleId={selectedRole?.id ?? 0}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onSave={() => {
              fetchRoleList();
            }}
          />
        </div>
      </ComponentCardWithButton>
    </>
  );
}
