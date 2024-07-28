export interface Order {
    order_id: number;
    date_orders: Date;
    client_id_fk: number;
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
    deleted: boolean;
}