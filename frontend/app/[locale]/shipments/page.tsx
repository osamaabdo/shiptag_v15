'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Plus, Search } from 'lucide-react';
import { SiteLayout } from '@/components/site-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusTabs } from '@/components/shipments/StatusTabs';
import { ShipmentTable } from '@/components/shipments/ShipmentTable';
import { BulkActionsBar } from '@/components/shipments/BulkActionsBar';
import { getShipments, getShipmentStats, performBulkAction } from '@/lib/api/shipments';
import type { 
  Shipment, 
  ShipmentStatus, 
  ShipmentStats, 
  ShipmentQueryParams,
  BulkAction 
} from '@/types/shipments';

export default function ShipmentsPage() {
  const t = useTranslations('shipments');
  
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [stats, setStats] = useState<ShipmentStats>({
    all: 0,
    pending: 0,
    in_transit: 0,
    out_for_delivery: 0,
    delivered: 0,
    returned: 0,
    cancelled: 0,
    on_hold: 0,
    preparing: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedShipments, setSelectedShipments] = useState<Shipment[]>([]);
  
  const [queryParams, setQueryParams] = useState<ShipmentQueryParams>({
    page: 1,
    limit: 10,
    status: undefined,
    search: '',
    sortBy: 'created_at',
    sortOrder: 'desc',
  });
  
  const [activeStatus, setActiveStatus] = useState<ShipmentStatus | 'all'>('all');
  const [searchValue, setSearchValue] = useState('');

  const fetchShipments = useCallback(async () => {
    setLoading(true);
    try {
      const [shipmentsData, statsData] = await Promise.all([
        getShipments(queryParams),
        getShipmentStats(),
      ]);
      setShipments(shipmentsData.data);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to fetch shipments:', error);
    } finally {
      setLoading(false);
    }
  }, [queryParams]);

  useEffect(() => {
    fetchShipments();
  }, [fetchShipments]);

  const handleStatusChange = (status: ShipmentStatus | 'all') => {
    setActiveStatus(status);
    setQueryParams(prev => ({
      ...prev,
      status: status === 'all' ? undefined : status,
      page: 1,
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQueryParams(prev => ({
      ...prev,
      search: searchValue,
      page: 1,
    }));
  };

  const handleBulkAction = async (action: BulkAction) => {
    if (selectedShipments.length === 0) return;
    
    try {
      await performBulkAction({
        shipmentIds: selectedShipments.map(s => s.id),
        action,
      });
      setSelectedShipments([]);
      await fetchShipments();
    } catch (error) {
      console.error('Failed to perform bulk action:', error);
    }
  };


  return (
    <SiteLayout>
      <div className="flex flex-col gap-6 p-4 lg:p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>

        <StatusTabs
          stats={stats}
          activeStatus={activeStatus}
          onStatusChange={handleStatusChange}
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <form onSubmit={handleSearch} className="flex gap-2 flex-1 max-w-sm">
            <div className="relative flex-1">
              <Search className="absolute left-2 rtl:right-2 rtl:left-auto top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t('search')}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-8 rtl:pr-8 rtl:pl-0"
              />
            </div>
          </form>

          <div className="flex gap-2">
            <Button size="sm">
              <Plus className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
              {t('newShipment')}
            </Button>
          </div>
        </div>

        <ShipmentTable
          data={shipments}
          loading={loading}
          onRowSelectionChange={setSelectedShipments}
        />

        <BulkActionsBar
          selectedShipments={selectedShipments}
          onBulkAction={handleBulkAction}
          onClearSelection={() => setSelectedShipments([])}
        />
      </div>
    </SiteLayout>
  );
}