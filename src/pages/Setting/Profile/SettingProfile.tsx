import { useEffect, useState } from "react";
import PageMeta from "../../../components/common/PageMeta";
import { UserProfile } from "../../../type/usermanagment"; // Assuming you have a `UserProfile` type
import { fetchUserDetails } from "../../../service/apis/AuthService";
import BmUserMetaCard from "../../../components/UserProfile/BuilderModule/BMUserMetaCard";
import BMUserInfoCard from "../../../components/UserProfile/BuilderModule/BMUserInfoCard";
import BMUserAddressCard from "../../../components/UserProfile/BuilderModule/BMUserAddressCard";
import SettingProfileForm from "./SettingProfileForm";

export default function SettingProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<UserProfile | null>(null);

  // Dhruvil API will be call here
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserDetails();
        if (response.status_code === 200) {
          setUserData(response.record);
        } else {
          console.error("Error fetching user data: ", response.msg);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <PageMeta
        title="React.js Profile"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>

        {userData ? (
          <div className="space-y-6">
            <BmUserMetaCard data={userData} onEdit={() => setIsOpen(true)} />
            <BMUserInfoCard data={userData} onEdit={() => setIsOpen(true)} />
            <BMUserAddressCard data={userData} onEdit={() => setIsOpen(true)} />
          </div>
        ) : (
          <p>No user data available</p>
        )}
      </div>

      {isOpen && userData && (
        <SettingProfileForm
          data={userData}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onSave={() => console.log("save clicked ...")}
        />
      )}
    </>
  );
}
