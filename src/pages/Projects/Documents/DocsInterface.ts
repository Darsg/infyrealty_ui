export interface ProjectDocsLists {
    photos: Photo[];
    documents: Document[];
    groups: Group[];
}

export interface Photo {
    id: number;
    org_id: number;
    project_id: number;
    key: string;
    description: string | null;
    created_by: number;
    updated_by: number | null;
    set_default: number;
    is_visible: number;
    is_deleted: number;
    createdAt: string;
    updatedAt: string;
    link: string;
}

export interface Document {
    id: number;
    org_id: number;
    project_id: number;
    document_name: string;
    key: string;
    description: string | null;
    created_by: number;
    updated_by: number | null;
    is_visible: number;
    is_deleted: number;
    createdAt: string;
    updatedAt: string;
}

export interface Group {
    id: number;
    org_id: number;
    project_id: number;
    group_name: string;
    description: string | null;
    created_by: number;
    updated_by: number | null;
    is_visible: number;
    is_deleted: number;
    createdAt: string;
    updatedAt: string;
    document_list: Document[];
}  