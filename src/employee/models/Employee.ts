export interface Employee{
    employee_id: number;
    full_name: string;
    password: string;
    role_id_fk: number;
    created_at: String;
    created_by: string;
    updated_at: String;
    updated_by: string;
    deleted: boolean;
}