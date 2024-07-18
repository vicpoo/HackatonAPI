export interface User {
    user_id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    rol_id_fk: number;
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
    deleted: boolean;
}
