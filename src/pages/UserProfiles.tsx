import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import BmUserMetaCard from "../components/UserProfile/BuilderModule/BMUserMetaCard";
import BMUserInfoCard from "../components/UserProfile/BuilderModule/BMUserInfoCard";
import BMUserAddressCard from "../components/UserProfile/BuilderModule/BMUserAddressCard";
import SettingProfileForm from "./Setting/Profile/SettingProfileForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../service/store/store";
import { fetchUserData } from "../service/reducer/userInfoReducer";

export default function UserProfiles() {

  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);

  const { data: userData, loading, error } = useSelector(
    (state: RootState) => state.userInfo
  );

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);


  return (
    <>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        
        {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
  
          {userData && (
            <div className="space-y-6">
              <BmUserMetaCard data={userData} onEdit={() => setIsOpen(true)}/>
              <BMUserInfoCard data={userData} onEdit={() => setIsOpen(true)}/>
              <BMUserAddressCard data={userData} onEdit={() => setIsOpen(true)}/>
            </div>
          )}
      </div>

      {isOpen && userData && (<SettingProfileForm data={userData} isOpen={isOpen} setIsOpen={setIsOpen} onSave={() => console.log("save clicked ...")}/>)}
      
    </>
  );
}
