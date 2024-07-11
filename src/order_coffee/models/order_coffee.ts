export interface Order_coffee{
    order_coffee_id:number;
    order_id_fk: number;
    coffee_id_fk: number;
    quantify: number;
    created_at: String;
    created_by: string;
    updated_at: String;
    updated_by: string;
    deleted: boolean;
}