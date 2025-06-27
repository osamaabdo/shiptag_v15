'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';
import type { ShipmentStatus, ShipmentStats } from '@/types/shipments';

interface StatusTabsProps {
  stats: ShipmentStats;
  activeStatus: ShipmentStatus | 'all';
  onStatusChange: (status: ShipmentStatus | 'all') => void;
}

export function StatusTabs({ stats, activeStatus, onStatusChange }: StatusTabsProps) {
  const t = useTranslations('shipments.status');

  const statuses: Array<{ key: ShipmentStatus | 'all'; count: number }> = [
    { key: 'all', count: stats.all },
    { key: 'pending', count: stats.pending },
    { key: 'preparing', count: stats.preparing },
    { key: 'in_transit', count: stats.in_transit },
    { key: 'out_for_delivery', count: stats.out_for_delivery },
    { key: 'delivered', count: stats.delivered },
    { key: 'returned', count: stats.returned },
    { key: 'cancelled', count: stats.cancelled },
    { key: 'on_hold', count: stats.on_hold },
  ];

  return (
    <Tabs value={activeStatus} onValueChange={(value) => onStatusChange(value as ShipmentStatus | 'all')}>
      <TabsList className="h-auto flex-wrap">
        {statuses.map(({ key, count }) => (
          <TabsTrigger
            key={key}
            value={key}
            className="flex items-center gap-2"
          >
            {t(key)}
            <Badge variant="secondary" className="h-5 px-1.5 text-xs">
              {count}
            </Badge>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}