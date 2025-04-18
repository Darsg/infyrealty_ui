export interface PhotoModel {
    id: number;
    org_id: number;
    project_id: number;
    key: string;
    description: string | null;
    created_by: number;
    updated_by: number;
    set_default: number;  
    is_visible: number;
    is_deleted: number;
    createdAt: string; 
    updatedAt: string;
    link: string;
}

export interface Project {
    id: number;
    name: string;
    email: string;
    contact_code: string;
    contact_no: string;
    address1: string;
    address2?: string | null;
    locality?: string | null;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    project_type: string;
    photos: PhotoModel[];
}