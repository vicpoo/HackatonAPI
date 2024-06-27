export interface User{
    user_id: number;
    name: string;
    email:string;
    password: string;
    rol_id_fk: number;
    created_at: String;
    created_by: string;
    updated_at: String;
    updated_by: string;
    deleted: boolean;
}