import { useState, useEffect } from "react";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import { UserProfile } from "../../../type/usermanagment";

interface ProfileProps {
  data: UserProfile;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSave: (updatedData: UserProfile) => void;
}

export default function SettingProfileForm({
  data,
  isOpen,
  setIsOpen,
  onSave,
}: ProfileProps) {
  const [formData, setFormData] = useState<UserProfile>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (field: keyof UserProfile, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    setIsOpen(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Edit Personal Information
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Update your details to keep your profile up-to-date.
          </p>
        </div>

        <form className="flex flex-col">
          <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
            {/* Social Links */}
            <div>
              <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                Social Links
              </h5>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Facebook</Label>
                  <Input
                    type="text"
                    value={formData.facebook_link || ""}
                    onChange={(e) => handleChange("facebook_link", e.target.value)}
                  />
                </div>
                <div>
                  <Label>X.com</Label>
                  <Input
                    type="text"
                    value={formData.twitter_link || ""}
                    onChange={(e) => handleChange("twitter_link", e.target.value)}
                  />
                </div>
                <div>
                  <Label>LinkedIn</Label>
                  <Input
                    type="text"
                    value={formData.linkedin_link || ""}
                    onChange={(e) => handleChange("linkedin_link", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Instagram</Label>
                  <Input
                    type="text"
                    value={formData.instagram_link || ""}
                    onChange={(e) => handleChange("instagram_link", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div className="mt-7">
              <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                Personal Information
              </h5>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Email Address</Label>
                  <Input
                    type="text"
                    value={formData.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Contact Code</Label>
                  <Input
                    type="text"
                    value={formData.contact_code || ""}
                    onChange={(e) => handleChange("contact_code", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    type="text"
                    value={formData.contact_no || ""}
                    onChange={(e) => handleChange("contact_no", e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Label>Bio</Label>
                  <Input
                    type="text"
                    value={formData.description || ""}
                    onChange={(e) => handleChange("bio", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="mt-7">
              <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                Address
              </h5>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Address One</Label>
                  <Input
                    type="text"
                    value={formData.address1 || ""}
                    onChange={(e) => handleChange("address1", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Address Two</Label>
                  <Input
                    type="text"
                    value={formData.address2 || ""}
                    onChange={(e) => handleChange("address2", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Region</Label>
                  <Input
                    type="text"
                    value={formData.region || ""}
                    onChange={(e) => handleChange("region", e.target.value)}
                  />
                </div>
                <div>
                  <Label>City</Label>
                  <Input
                    type="text"
                    value={formData.city || ""}
                    onChange={(e) => handleChange("city", e.target.value)}
                  />
                </div>
                <div>
                  <Label>State</Label>
                  <Input
                    type="text"
                    value={formData.state || ""}
                    onChange={(e) => handleChange("state", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Country</Label>
                  <Input
                    type="text"
                    value={formData.country || ""}
                    onChange={(e) => handleChange("country", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Postal Code</Label>
                  <Input
                    type="text"
                    value={formData.zipcode || ""}
                    onChange={(e) => handleChange("zipcode", e.target.value)}
                  />
                </div>
                <div>
                  <Label>GSTIN</Label>
                  <Input
                    type="text"
                    value={formData.gstin || ""}
                    onChange={(e) => handleChange("gstin", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
            <Button size="sm" variant="outline" onClick={closeModal}>
              Close
            </Button>
            <Button size="sm" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
