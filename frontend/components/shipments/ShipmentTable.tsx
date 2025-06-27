'use client';

import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslations } from 'next-intl';
import { CarrierBadge } from './CarrierBadge';
import { CustomerTooltip } from './CustomerTooltip';
import { ItemsTooltipTable } from './ItemsTooltipTable';
import { TrackingLinkIcon } from './TrackingLinkIcon';
import type { Shipment } from '@/types/shipments';

interface ShipmentTableProps {
  data: Shipment[];
  loading?: boolean;
  onRowSelectionChange?: (selectedRows: Shipment[]) => void;
}

const statusVariants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  pending: 'secondary',
  preparing: 'secondary',
  in_transit: 'default',
  out_for_delivery: 'default',
  delivered: 'outline',
  returned: 'destructive',
  cancelled: 'destructive',
  on_hold: 'secondary',
};

export function ShipmentTable({ 
  data, 
  loading = false,
  onRowSelectionChange 
}: ShipmentTableProps) {
  const t = useTranslations('shipments');

  const columns = useMemo<ColumnDef<Shipment>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'id',
        header: t('table.orderInfo'),
        cell: ({ row }) => (
          <div>
            <div className="font-medium">{row.original.id}</div>
            <div className="text-sm text-muted-foreground">
              {format(new Date(row.original.created_at), 'MMM dd')}
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'user.name',
        header: t('table.customer'),
        cell: ({ row }) => (
          <CustomerTooltip
            name={row.original.user.name}
            location={row.original.user.location}
            address={row.original.user.address}
          />
        ),
      },
      {
        accessorKey: 'source',
        header: t('table.source'),
        cell: ({ row }) => (
          <Badge variant="outline">{row.original.source}</Badge>
        ),
      },
      {
        accessorKey: 'items',
        header: t('table.items'),
        cell: ({ row }) => (
          <ItemsTooltipTable items={row.original.items} />
        ),
      },
      {
        accessorKey: 'carrier.name',
        header: t('table.carrier'),
        cell: ({ row }) => (
          <CarrierBadge
            carrier={row.original.carrier}
            codAmount={row.original.cod_amount}
          />
        ),
      },
      {
        accessorKey: 'payment_status',
        header: t('table.payment'),
        cell: ({ row }) => (
          <Badge 
            variant={row.original.payment_status === 'Paid' ? 'outline' : 'secondary'}
          >
            {row.original.payment_status}
          </Badge>
        ),
      },
      {
        accessorKey: 'status',
        header: t('table.status'),
        cell: ({ row }) => (
          <Badge variant={statusVariants[row.original.status] || 'default'}>
            {t(`status.${row.original.status}`)}
          </Badge>
        ),
      },
      {
        accessorKey: 'tracking_number',
        header: t('table.tracking'),
        cell: ({ row }) => (
          <TrackingLinkIcon
            trackingNumber={row.original.tracking_number}
            carrierId={row.original.carrier.id}
          />
        ),
        enableSorting: false,
      },
    ],
    [t]
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
      onRowSelectionChange={(rowSelection) => {
        if (onRowSelectionChange) {
          const selectedRows = Object.keys(rowSelection)
            .filter(key => rowSelection[key])
            .map(index => data[parseInt(index)]);
          onRowSelectionChange(selectedRows);
        }
      }}
    />
  );
}