import { useEffect, useState } from "react";
import PageMeta from "../../../components/common/PageMeta";
import { UserProfile } from "../../../type/usermanagment";
import { fetchUserDetailsForSetting, saveUserDetails } from "../../../service/apis/AuthService";
import BmUserMetaCard from "../../../components/UserProfile/BuilderModule/BMUserMetaCard";
import BMUserInfoCard from "../../../components/UserProfile/BuilderModule/BMUserInfoCard";
import BMUserAddressCard from "../../../components/UserProfile/BuilderModule/BMUserAddressCard";
import SettingProfileForm from "./SettingProfileForm";
import { toast } from "react-toastify";

export default function SettingProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserDetailsForSetting();
        if (response.status_code === 200) {
          setUserData(response.data);
        } else {
          console.error("Error fetching user data: ", response.msg);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleSave = async (updatedData: UserProfile) => {
    try {
      const formData = new FormData();
      formData.append("name", updatedData.name);
      formData.append("email", updatedData.email);
      formData.append("facebook_link", updatedData.facebook_link);
      formData.append("twitter_link", updatedData.twitter_link);
      formData.append("instagram_link", updatedData.instagram_link);
      formData.append("linkedin_link", updatedData.linkedin_link);
      formData.append("contact_code", updatedData.contact_code);
      formData.append("contact_no", updatedData.contact_no);
      formData.append("description", updatedData.description);
      formData.append("address1", updatedData.address1);
      formData.append("address2", updatedData.address2);
      formData.append("region", updatedData.region);
      formData.append("city", updatedData.city);
      formData.append("state", updatedData.state);
      formData.append("country", updatedData.country);
      formData.append("zipcode", updatedData.zipcode);
      formData.append("tax_id", updatedData.gstin);

      const response = await saveUserDetails(formData);
      if (response.status_code === 200) {
        setUserData(response.records);
        setIsOpen(false);
      }

      if(response?.msg) {
        toast(response.msg, { type: response.alert });
      }

    } catch (error) {
      console.error("Error saving user data: ", error);
    }
  };

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
          onSave={(updatedData) => handleSave(updatedData)}
        />
      )}
    </>
  );
}
