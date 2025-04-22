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
    status: string | null;
    description: string | null;
    type: string;
    created_by: number;
    updated_by: number;
    is_visible: number;
    is_deleted: number;
    createdAt: string;
    updatedAt: string;
    res_tower_list: ProjectTower[];
    com_tower_list: ProjectTower[];
    photos: PhotoModel[];
}

export interface ProjectTower {
    id: number;
    org_id: number;
    project_id: number;
    name: string;
    description: string | null;
    created_by: number;
    updated_by: number | null;
    is_visible: number;
    is_deleted: number;
    createdAt: string;
    updatedAt: string;
    wing_list: Wing[];
}

export interface Wing {
    id: number;
    org_id: number;
    project_id: number;
    tower_id: number;
    name: string;
    prefix: string;
    total_floors: number;
    total_basement: number;
    total_shop_floors: number;
    flats_on_floor: number;
    shops_on_floor: number;
    flat_size: string;
    shop_size: string;
    basement_size: string;
    type: string;
    description: string;
    created_by: number;
    updated_by: number | null;
    is_visible: number;
    is_deleted: number;
    createdAt: string;
    updatedAt: string;
    floor_list: Floor[];
}

export interface Floor {
    id: number;
    org_id: number;
    project_id: number;
    tower_id: number;
    wing_id: number;
    prefix: string;
    floor_no: number;
    type: string;
    order: number;
    description: string | null;
    created_by: number;
    updated_by: number | null;
    is_visible: number;
    is_deleted: number;
    createdAt: string;
    updatedAt: string;
    flat_list: Flat[];
}
 
export interface Flat {
    id: number;
    org_id: number;
    project_id: number;
    tower_id: number;
    wing_id: number;
    floor_id: number;
    prefix: string;
    name: string;
    size: string;
    floor_no: number;
    type: string;
    order: number;
    description: string | null;
    created_by: number;
    updated_by: number | null;
    is_visible: number;
    is_deleted: number;
    createdAt: string;
    updatedAt: string;
}