import { getAccessTokenFromClient } from '@/utils/getAccessTokenFromClient';
import type { 
  ShipmentQueryParams, 
  PaginatedShipments, 
  ShipmentStats, 
  BulkActionRequest 
} from '@/types/shipments';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = getAccessTokenFromClient();
  
  const headers = new Headers(options.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  headers.set('Content-Type', 'application/json');
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

export async function getShipments(params: ShipmentQueryParams = {}): Promise<PaginatedShipments> {
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, value.toString());
    }
  });
  
  const url = `${API_BASE}/api/shipments?${queryParams.toString()}`;
  return fetchWithAuth(url);
}

export async function getShipmentStats(): Promise<ShipmentStats> {
  const url = `${API_BASE}/api/shipments?endpoint=stats`;
  return fetchWithAuth(url);
}

export async function performBulkAction(request: BulkActionRequest): Promise<{ success: boolean; updatedCount: number }> {
  const url = `${API_BASE}/api/shipments/bulk-action`;
  return fetchWithAuth(url, {
    method: 'POST',
    body: JSON.stringify(request),
  });
}