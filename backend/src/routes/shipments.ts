import { FastifyPluginAsync } from 'fastify';
import { generateMockShipments, calculateShipmentStats } from '../services/shipments.mock';
import { simulateLatency } from '../utils/simulateLatency';
import type { 
  Shipment, 
  ShipmentQueryParams, 
  ShipmentStats, 
  BulkActionRequest, 
  PaginatedShipments 
} from '../types/shipments';

let mockShipments = generateMockShipments(100);

const shipmentsRoutes: FastifyPluginAsync = async (fastify) => {
  // Get shipment stats
  fastify.get<{
    Reply: ShipmentStats;
  }>('/stats', async (request, reply) => {
    await simulateLatency();
    const stats = calculateShipmentStats(mockShipments);
    return reply.send(stats);
  });

  // Get paginated shipments with filters
  fastify.get<{
    Querystring: ShipmentQueryParams;
    Reply: PaginatedShipments;
  }>('/', async (request, reply) => {
    await simulateLatency();

    const params: ShipmentQueryParams = {
      page: request.query.page || 1,
      limit: request.query.limit || 10,
      status: request.query.status || undefined,
      carrier: request.query.carrier || undefined,
      source: request.query.source || undefined,
      paymentStatus: request.query.paymentStatus || undefined,
      search: request.query.search || undefined,
      sortBy: request.query.sortBy || 'created_at',
      sortOrder: request.query.sortOrder || 'desc',
      dateFrom: request.query.dateFrom || undefined,
      dateTo: request.query.dateTo || undefined,
      codOnly: request.query.codOnly || false,
    };

    let filteredShipments = [...mockShipments];

    // Apply filters
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

    // Sort results
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

    // Paginate results
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

    return reply.send(response);
  });

  // Bulk actions endpoint
  fastify.post<{
    Body: BulkActionRequest;
    Reply: { success: boolean; updatedCount: number };
  }>('/bulk-action', async (request, reply) => {
    await simulateLatency();

    const { shipmentIds, action } = request.body;

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

    return reply.send({ success: true, updatedCount: shipmentIds.length });
  });
};

export default shipmentsRoutes;