import { NextRequest, NextResponse } from 'next/server';
import { generateMockShipments, calculateShipmentStats } from '../mocks/shipments';
import { simulateLatency } from '../utils/simulateLatency';
import type { 
  Shipment, 
  ShipmentQueryParams, 
  ShipmentStats, 
  BulkActionRequest, 
  PaginatedShipments 
} from '../../frontend/types/shipments';

let mockShipments = generateMockShipments(100);

export async function GET(req: NextRequest) {
  await simulateLatency();

  const { searchParams } = new URL(req.url);
  const endpoint = searchParams.get('endpoint');

  if (endpoint === 'stats') {
    const stats = calculateShipmentStats(mockShipments);
    return NextResponse.json(stats);
  }

  const params: ShipmentQueryParams = {
    page: parseInt(searchParams.get('page') || '1'),
    limit: parseInt(searchParams.get('limit') || '10'),
    status: searchParams.get('status') as any || undefined,
    carrier: searchParams.get('carrier') || undefined,
    source: searchParams.get('source') as any || undefined,
    paymentStatus: searchParams.get('paymentStatus') as any || undefined,
    search: searchParams.get('search') || undefined,
    sortBy: searchParams.get('sortBy') || 'created_at',
    sortOrder: (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc',
    dateFrom: searchParams.get('dateFrom') || undefined,
    dateTo: searchParams.get('dateTo') || undefined,
    codOnly: searchParams.get('codOnly') === 'true',
  };

  let filteredShipments = [...mockShipments];

  if (params.status && params.status !== 'all') {
    filteredShipments = filteredShipments.filter(s => s.status === params.status);
  }

  if (params.carrier) {
    filteredShipments = filteredShipments.filter(s => s.carrier.id === params.carrier);
  }

  if (params.source) {
    filteredShipments = filteredShipments.filter(s => s.source === params.source);
  }

  if (params.paymentStatus) {
    filteredShipments = filteredShipments.filter(s => s.payment_status === params.paymentStatus);
  }

  if (params.codOnly) {
    filteredShipments = filteredShipments.filter(s => s.cod_amount && s.cod_amount > 0);
  }

  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredShipments = filteredShipments.filter(s => 
      s.id.toLowerCase().includes(searchLower) ||
      s.user.name.toLowerCase().includes(searchLower) ||
      s.user.location.toLowerCase().includes(searchLower) ||
      s.tracking_number?.toLowerCase().includes(searchLower)
    );
  }

  if (params.dateFrom) {
    filteredShipments = filteredShipments.filter(s => 
      new Date(s.created_at) >= new Date(params.dateFrom!)
    );
  }

  if (params.dateTo) {
    filteredShipments = filteredShipments.filter(s => 
      new Date(s.created_at) <= new Date(params.dateTo!)
    );
  }

  filteredShipments.sort((a, b) => {
    let aValue: any = a[params.sortBy as keyof Shipment];
    let bValue: any = b[params.sortBy as keyof Shipment];

    if (params.sortBy === 'created_at') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    if (params.sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const total = filteredShipments.length;
  const totalPages = Math.ceil(total / params.limit!);
  const start = (params.page! - 1) * params.limit!;
  const end = start + params.limit!;
  const paginatedData = filteredShipments.slice(start, end);

  const response: PaginatedShipments = {
    data: paginatedData,
    total,
    page: params.page!,
    totalPages,
  };

  return NextResponse.json(response);
}

export async function POST(req: NextRequest) {
  await simulateLatency();

  const body: BulkActionRequest = await req.json();
  const { shipmentIds, action } = body;

  switch (action) {
    case 'mark_delivered':
      mockShipments = mockShipments.map(shipment => 
        shipmentIds.includes(shipment.id) 
          ? { ...shipment, status: 'delivered' as const }
          : shipment
      );
      break;
    
    case 'cancel':
      mockShipments = mockShipments.map(shipment => 
        shipmentIds.includes(shipment.id) 
          ? { ...shipment, status: 'cancelled' as const }
          : shipment
      );
      break;
    
    case 'pay_now':
      mockShipments = mockShipments.map(shipment => 
        shipmentIds.includes(shipment.id) 
          ? { ...shipment, payment_status: 'Paid' as const, cod_amount: undefined }
          : shipment
      );
      break;
  }

  return NextResponse.json({ success: true, updatedCount: shipmentIds.length });
}