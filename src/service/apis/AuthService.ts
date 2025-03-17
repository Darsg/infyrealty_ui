import apiClient from "./axiosInstance";

// Define a generic API response type
interface ApiResponse<T = any> {
  data: T;
}

// Define a generic function for handling API requests
const handleRequest = async <T>(request: Promise<ApiResponse<T>>): Promise<T> => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* Authentication APIs */
export const signUp = async (formData: any) => handleRequest(apiClient.post("bm_organization/sign_up", formData));

export const sendOTP = async (formData: any) => handleRequest(apiClient.post("bm_otp/send_otp", formData));

export const verifyOTP = async (formData: any) => handleRequest(apiClient.post("bm_otp/verify_otp", formData));

export const login = async (formData: any) => handleRequest(apiClient.post("bm_user/sign_in", formData));

export const getToken = async () => handleRequest(apiClient.get("bm_organization/getDetails"));

export const forgotPassword = async (formData: any) => handleRequest(apiClient.post("bm_user/forgot_password", formData));

export const resetPassword = async (formData: any) => handleRequest(apiClient.post("bm_user/reset_password", formData));

export const logOut = async () => handleRequest(apiClient.post("bm_user/logout", ""));

/* Project Configuration APIs */
export const getProjectList = async () => handleRequest(apiClient.get("bm_project/get_project_list"));

export const getProjectDetails = async (
  projectId: string,
  towerId?: string,
  wingId?: string,
  floorId?: string,
  flatId?: string,
  shopId?: string
) =>
  handleRequest(
    apiClient.get("bm_project/get_project_details", {
      params: { project_id: projectId, tower_id: towerId, wing_id: wingId, floor_id: floorId, flat_id: flatId, shop_id: shopId },
    })
  );

export const createProject = async (formData: any) => handleRequest(apiClient.post("bm_project/create", formData));

export const updateProject = async (formData: any) => handleRequest(apiClient.put("bm_project/update_project", formData));

export const deleteProject = async (project_id: string) => handleRequest(apiClient.delete(`bm_project/delete_project?project_id=${project_id}`));

export const fetchTowerList = async (project_id: string) => handleRequest(apiClient.get(`bm_project/get_tower_list?project_id=${project_id}`));

export const createTower = async (formData: any) => handleRequest(apiClient.post("bm_project/create_tower", formData));

export const updateTower = async (formData: any) => handleRequest(apiClient.put("bm_project/update_tower", formData));

export const deleteTower = async (project_id: string, tower_id: string) =>
  handleRequest(apiClient.delete(`bm_project/delete_tower?project_id=${project_id}&tower_id=${tower_id}`));

export const createWing = async (formData: any) => handleRequest(apiClient.post("bm_project/create_wing", formData));

export const updateWing = async (formData: any) => handleRequest(apiClient.put("bm_project/update_wing", formData));

export const deleteWing = async (project_id: string, tower_id: string, wing_id: string) =>
  handleRequest(apiClient.delete(`bm_project/delete_wing?project_id=${project_id}&tower_id=${tower_id}&wing_id=${wing_id}`));

export const createFloor = async (formData: any) => handleRequest(apiClient.post("bm_project/create_floor", formData));

export const updateFloor = async (formData: any) => handleRequest(apiClient.put("bm_project/update_floor", formData));

export const deleteFloor = async (project_id: string, tower_id: string, wing_id: string, floor_id: string) =>
  handleRequest(apiClient.delete(`bm_project/delete_floor?project_id=${project_id}&tower_id=${tower_id}&wing_id=${wing_id}&floor_id=${floor_id}`));

export const getShopFlatDetails = async (project_id: string, tower_id: string, wing_id: string, floor_id: string, flat_id: string) =>
  handleRequest(apiClient.get(`bm_project/get_flat_or_shop_details?project_id=${project_id}&tower_id=${tower_id}&wing_id=${wing_id}&floor_id=${floor_id}&id=${flat_id}`));

export const createFlat = async (formData: any) => handleRequest(apiClient.post("bm_project/create_flat_or_shop", formData));

export const updateFlat = async (formData: any) => handleRequest(apiClient.put("bm_project/update_flat_or_shop", formData));

export const deleteFlat = async (project_id: string, tower_id: string, wing_id: string, floor_id: string, id: string) =>
  handleRequest(apiClient.delete(`bm_project/delete_flat_or_shop?project_id=${project_id}&tower_id=${tower_id}&wing_id=${wing_id}&floor_id=${floor_id}&id=${id}`));

/* Project Documents */
export const getProjectDocuments = async (project_id: string) => handleRequest(apiClient.get(`bm_project/get_project_photo_video_document?project_id=${project_id}`));

export const addPhotoVideo = async (formData: any) => handleRequest(apiClient.post("bm_project/upload_project_photo_video_document", formData));

export const updatePhotoVideo = async (formData: any) => handleRequest(apiClient.put("bm_project/update_project_photo_video_document", formData));

export const deletePhotoVideo = async (projectId: string, type: string, groupId: string, id: string) =>
  handleRequest(apiClient.delete(`bm_project/delete_project_photo_video_document?project_id=${projectId}&type=${type}&group_id=${groupId}&id=${id}`));

export const setProjectPhoto = async (formData: any) => handleRequest(apiClient.put("bm_project/set_default_photo", formData));

/* Project Document APIs */
export const createDocumentGroup = async (formData: any) => handleRequest(apiClient.post("bm_project/create_document_group", formData));

export const updateDocumentGroup = async (formData: any) => handleRequest(apiClient.put("bm_project/update_document_group", formData));

export const deleteDocumentGroup = async (project_id: string, id: string) =>
  handleRequest(apiClient.delete(`bm_project/delete_document_group?project_id=${project_id}&group_id=${id}`));

export const getDocumentLink = async (documentName: string) => handleRequest(apiClient.get(`bm_project/get_document_link/${documentName}`));
