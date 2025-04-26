export interface UserForm {
    id?: number;
    name: string;
    contact_code: string;
    contact_no: string;
    email: string;
    address: string;
    address1?: string;
    description: string;
    password?: string;
}

export interface User {
    id: number;
    org_id: number;
    user_type: string;
    name: string;
    email: string;
    contact_code: string;
    contact_no: string;
    address: string;
    status: string;
    description: string;
    created_by: number | null;
    updated_by: number | null;
    is_deleted: number;
}

export interface UserProfile {
    id: number;
    org_id: number;
    user_type: string;
    name: string;
    email: string;
    contact_code: string;
    contact_no: string;
    address: string;
    status: string;
    description: string;
    created_by: number | null;
    updated_by: number | null;
    is_deleted: number;
    facebook_link: string;
    twitter_link: string;
    instagram_link: string;
    linkedin_link: string;
    phone_number: string;
    bio: string;
    address1: string;
    address2: string;
    region: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    zipcode: string;
    gstin: string;
  }
  
  