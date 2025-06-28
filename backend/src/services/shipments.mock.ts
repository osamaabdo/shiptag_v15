import type { Shipment, ShipmentStatus, OrderSource, PaymentStatus } from '../../frontend/types/shipments';

const carriers = [
  { id: 'dhl', name: 'DHL', logo: '/carriers/dhl.png' },
  { id: 'fedex', name: 'FedEx', logo: '/carriers/fedex.png' },
  { id: 'ups', name: 'UPS', logo: '/carriers/ups.png' },
  { id: 'aramex', name: 'Aramex', logo: '/carriers/aramex.png' },
  { id: 'smsa', name: 'SMSA', logo: '/carriers/smsa.png' },
];

const customers = [
  {
    name: 'Ahmed Ghilan',
    location: 'Medina, SA',
    address: {
      name: 'Ahmed Ghilan',
      street: '123 King Fahd Road',
      city: 'Medina',
      state: 'Makkah',
      country: 'Saudi Arabia',
      zip: '42311',
      phone: '+966 50 123 4567',
    },
  },
  {
    name: 'John Smith',
    location: 'New York, US',
    address: {
      name: 'John Smith',
      street: '456 Broadway Ave',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      zip: '10001',
      phone: '+1 212 555 0123',
    },
  },
  {
    name: 'Sarah Johnson',
    location: 'Dubai, UAE',
    address: {
      name: 'Sarah Johnson',
      street: '789 Sheikh Zayed Road',
      city: 'Dubai',
      country: 'United Arab Emirates',
      zip: '00000',
      phone: '+971 50 987 6543',
    },
  },
  {
    name: 'محمد الأحمد',
    location: 'Riyadh, SA',
    address: {
      name: 'محمد الأحمد',
      street: '321 طريق الملك عبدالله',
      city: 'الرياض',
      state: 'الرياض',
      country: 'السعودية',
      zip: '11564',
      phone: '+966 55 876 5432',
    },
  },
  {
    name: 'Emily Chen',
    location: 'Singapore',
    address: {
      name: 'Emily Chen',
      street: '10 Marina Boulevard',
      city: 'Singapore',
      country: 'Singapore',
      zip: '018983',
      phone: '+65 9123 4567',
    },
  },
];

const products = [
  { name: 'iPhone 15 Pro', price: 999 },
  { name: 'MacBook Pro 16"', price: 2499 },
  { name: 'AirPods Pro', price: 249 },
  { name: 'iPad Air', price: 599 },
  { name: 'Apple Watch Series 9', price: 399 },
  { name: 'Samsung Galaxy S24', price: 899 },
  { name: 'Sony WH-1000XM5', price: 399 },
  { name: 'Nintendo Switch', price: 299 },
  { name: 'PlayStation 5', price: 499 },
  { name: 'Xbox Series X', price: 499 },
];

const statuses: ShipmentStatus[] = [
  'pending',
  'preparing',
  'in_transit',
  'out_for_delivery',
  'delivered',
  'returned',
  'cancelled',
  'on_hold',
];

const sources: OrderSource[] = ['App', 'Web', 'Platform', 'API'];
const paymentStatuses: PaymentStatus[] = ['Paid', 'Unpaid'];

function generateTrackingNumber(carrier: string): string {
  const prefix = carrier.toUpperCase().substring(0, 3);
  const numbers = Math.floor(Math.random() * 1000000000).toString().padStart(10, '0');
  return `${prefix}${numbers}`;
}

function generateOrderId(): string {
  const year = new Date().getFullYear();
  const number = Math.floor(Math.random() * 10000).toString().padStart(3, '0');
  return `ORD-${year}-${number}`;
}

function generateItems(): typeof products {
  const numItems = Math.floor(Math.random() * 3) + 1;
  const selectedItems: any[] = [];
  
  for (let i = 0; i < numItems; i++) {
    const product = products[Math.floor(Math.random() * products.length)];
    const quantity = Math.floor(Math.random() * 3) + 1;
    selectedItems.push({
      id: `item-${i + 1}`,
      name: product.name,
      quantity,
      price: product.price,
      total: product.price * quantity,
    });
  }
  
  return selectedItems;
}

function generateDate(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
}

export function generateMockShipments(count: number = 50): Shipment[] {
  const shipments: Shipment[] = [];
  
  for (let i = 0; i < count; i++) {
    const carrier = carriers[Math.floor(Math.random() * carriers.length)];
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const source = sources[Math.floor(Math.random() * sources.length)];
    const paymentStatus = paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];
    const hasCOD = Math.random() > 0.7;
    const hasTracking = ['in_transit', 'out_for_delivery', 'delivered'].includes(status);
    const items = generateItems();
    const totalAmount = items.reduce((sum, item) => sum + item.total, 0);
    
    shipments.push({
      id: generateOrderId(),
      created_at: generateDate(Math.floor(Math.random() * 30)),
      user: customer,
      carrier,
      items,
      status,
      source,
      payment_status: paymentStatus,
      tracking_number: hasTracking ? generateTrackingNumber(carrier.id) : undefined,
      cod_amount: hasCOD && paymentStatus === 'Unpaid' ? totalAmount : undefined,
    });
  }
  
  return shipments.sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export function calculateShipmentStats(shipments: Shipment[]) {
  const stats = {
    all: shipments.length,
    pending: 0,
    in_transit: 0,
    out_for_delivery: 0,
    delivered: 0,
    returned: 0,
    cancelled: 0,
    on_hold: 0,
    preparing: 0,
  };
  
  shipments.forEach(shipment => {
    const key = shipment.status.replace(/_/g, '_') as keyof typeof stats;
    if (key in stats && key !== 'all') {
      stats[key]++;
    }
  });
  
  return stats;
}