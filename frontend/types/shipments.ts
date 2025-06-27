export interface Address {
  name: string;
  street: string;
  city: string;
  state?: string;
  country: string;
  zip?: string;
  phone?: string;
}

export interface CarrierInfo {
  id: string;
  name: string;
  logo?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Shipment {
  id: string;
  created_at: string;
  user: {
    name: string;
    location: string;
    address: Address;
  };
  carrier: CarrierInfo;
  items: OrderItem[];
  status: ShipmentStatus;
  source: OrderSource;
  payment_status: PaymentStatus;
  tracking_number?: string;
  cod_amount?: number;
}

export type ShipmentStatus = 
  | 'pending'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'returned'
  | 'cancelled'
  | 'on_hold'
  | 'preparing';

export type OrderSource = 'App' | 'Web' | 'Platform' | 'API';
export type PaymentStatus = 'Paid' | 'Unpaid';

export interface ShipmentQueryParams {
  page?: number;
  limit?: number;
  status?: ShipmentStatus;
  carrier?: string;
  source?: OrderSource;
  paymentStatus?: PaymentStatus;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  dateFrom?: string;
  dateTo?: string;
  codOnly?: boolean;
}

export interface ShipmentStats {
  all: number;
  pending: number;
  in_transit: number;
  out_for_delivery: number;
  delivered: number;
  returned: number;
  cancelled: number;
  on_hold: number;
  preparing: number;
}

export type BulkAction = 'mark_delivered' | 'cancel' | 'pay_now';

export interface BulkActionRequest {
  shipmentIds: string[];
  action: BulkAction;
}

export interface PaginatedShipments {
  data: Shipment[];
  total: number;
  page: number;
  totalPages: number;
}