import { useState, useEffect } from "react";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import Button from "../../../components/ui/button/Button";
import { Modal } from "../../../components/ui/modal";
import { toast } from "react-toastify";
import { createProject, updateProject } from "../../../service/apis/AuthService";

interface Project {
  id?: number;
  project_id?: number;
  name: string;
  email: string;
  contact_code: string;
  contact_no: string;
  address1: string;
  address2: string | null;
  locality: string | null;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  project_type: string;
}

interface ProjectFormProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  project?: Project | null;
  onSave: (project: Project) => void;
}

export default function ProjectForm({ isOpen, setIsOpen, project, onSave }: ProjectFormProps) {

  const requiredFields = ["name", "email", "contact_no", "address1", "city", "state", "zipcode"];

  const [formData, setFormData] = useState<Project>({
    project_id: undefined,
    name: "",
    email: "",
    contact_code: "+91",
    contact_no: "",
    address1: "",
    address2: "",
    locality: "",
    city: "",
    state: "",
    country: "India",
    zipcode: "",
    project_type: "Residentials",
  });

  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        project_id: project?.id,
        address2: project.address2 || "",
        locality: project.locality || "",
      });
    } else {
      setFormData({
        id: undefined,
        name: "",
        email: "",
        contact_code: "+91",
        contact_no: "",
        address1: "",
        address2: "",
        locality: "",
        city: "",
        state: "",
        country: "India",
        zipcode: "",
        project_type: "Residentials",
      });
    }
  }, [project]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (requiredFields.some((field) => !formData[field as keyof Project]?.toString().trim())) {
      console.log("Form Data:", formData);
      toast.info("Please fill all required fields.");
      return;
    }
    
    try {
        let response;

        if (project?.id) {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    formDataToSend.append(key, value.toString());
                }
            });
            response = await updateProject(formDataToSend);
        } else {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    formDataToSend.append(key, value.toString());
                }
            });
            response = await createProject(formDataToSend);
        }
        console.log("Create/Update Project Response:", response);

        toast(response?.msg, { type: response?.alert });

        if(response.status_code === 200){
            setIsOpen(false);
            onSave(formData);
        }
    } catch (error) {
        console.error("Error creating/updating project:", error);
        toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="max-w-[700px] m-4">
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {project ? "Edit Project" : "Add Project"}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            {project ? "Update project details." : "Enter details to create a new project."}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">Project Details</h5>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <Label>Project Name</Label>
                <Input type="text" name="name" value={formData.name} onChange={handleChange} />
              </div>
              <div>
                <Label>Project Type</Label>
                <select name="project_type" value={formData.project_type} onChange={handleChange} className="w-full p-2 border rounded-md mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-400" disabled={!!project}>
                  <option value="Residentials">Residentials</option>
                  <option value="Commercials">Commercials</option>
                </select>
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div>
                <Label>Contact Code</Label>
                <Input type="text" name="contact_code" value={formData.contact_code} onChange={handleChange} />
              </div>
              <div>
                <Label>Contact Number</Label>
                <Input type="text" name="contact_no" value={formData.contact_no} onChange={handleChange} />
              </div>
            </div>
            <h5 className="mt-7 mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">Address</h5>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <Label>Address One</Label>
                <Input type="text" name="address1" value={formData.address1} onChange={handleChange} />
              </div>
              <div>
                <Label>Address Two</Label>
                <Input type="text" name="address2" value={formData.address2 || ""} onChange={handleChange} />
              </div>
              <div>
                <Label>Locality</Label>
                <Input type="text" name="locality" value={formData.locality || ""} onChange={handleChange} />
              </div>
              <div>
                <Label>City</Label>
                <Input type="text" name="city" value={formData.city} onChange={handleChange} />
              </div>
              <div>
                <Label>State</Label>
                <Input type="text" name="state" value={formData.state} onChange={handleChange} />
              </div>
              <div>
                <Label>Country</Label>
                <Input type="text" name="country" value={formData.country} onChange={handleChange} />
              </div>
              <div>
                <Label>ZipCode</Label>
                <Input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button size="sm" >{project ? "Update Project" : "Create Project"}</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
