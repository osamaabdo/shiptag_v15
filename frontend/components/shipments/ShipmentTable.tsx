'use client';

import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { DataTable } from '@/components/ui/data-table';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslations } from 'next-intl';
import { CarrierBadge } from './CarrierBadge';
import { ShipmentTooltip } from './ShipmentTooltip';
import { TrackingLinkIcon } from './TrackingLinkIcon';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t('table.orderInfo')}
          />
        ),
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
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t('table.customer')}
          />
        ),
        cell: ({ row }) => {
          const address = row.original.user.address;
          const formatAddress = () => {
            const parts = [
              address.street,
              address.city,
              address.state,
              address.country,
              address.zip,
            ].filter(Boolean);
            
            return (
              <div className="space-y-1">
                <div className="font-medium">{address.name}</div>
                <div className="text-sm text-muted-foreground">
                  {parts.join(', ')}
                </div>
                {address.phone && (
                  <div className="text-sm text-muted-foreground">
                    {address.phone}
                  </div>
                )}
              </div>
            );
          };

          return (
            <ShipmentTooltip
              trigger={
                <>
                  <div className="font-medium">{row.original.user.name}</div>
                  <div className="text-sm text-muted-foreground">{row.original.user.location}</div>
                </>
              }
              content={formatAddress()}
              contentClassName="max-w-xs"
            />
          );
        },
      },
      {
        accessorKey: 'source',
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t('table.source')}
            filterOptions={[
              { label: 'App', value: 'App' },
              { label: 'Web', value: 'Web' },
              { label: 'Platform', value: 'Platform' },
              { label: 'API', value: 'API' },
            ]}
          />
        ),
        cell: ({ row }) => (
          <Badge variant="outline">{row.original.source}</Badge>
        ),
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id));
        },
      },
      {
        accessorKey: 'items',
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t('table.items')}
          />
        ),
        cell: ({ row }) => {
          const items = row.original.items;
          const totalAmount = items.reduce((sum, item) => sum + item.total, 0);
          
          return (
            <ShipmentTooltip
              trigger={
                <span className="font-medium">
                  {items.length}
                </span>
              }
              content={
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="h-8 px-2">Product</TableHead>
                      <TableHead className="h-8 px-2 text-center">Qty</TableHead>
                      <TableHead className="h-8 px-2 text-right">Price</TableHead>
                      <TableHead className="h-8 px-2 text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="px-2 py-1.5 text-sm">
                          {item.name}
                        </TableCell>
                        <TableCell className="px-2 py-1.5 text-center text-sm">
                          {item.quantity}
                        </TableCell>
                        <TableCell className="px-2 py-1.5 text-right text-sm">
                          ${item.price.toFixed(2)}
                        </TableCell>
                        <TableCell className="px-2 py-1.5 text-right text-sm">
                          ${item.total.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="px-2 py-1.5 text-right font-medium">
                        Total:
                      </TableCell>
                      <TableCell className="px-2 py-1.5 text-right font-medium">
                        ${totalAmount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              }
              contentClassName="p-0"
            />
          );
        },
      },
      {
        accessorKey: 'carrier.name',
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t('table.carrier')}
            filterOptions={[
              { label: 'DHL', value: 'DHL' },
              { label: 'FedEx', value: 'FedEx' },
              { label: 'UPS', value: 'UPS' },
              { label: 'USPS', value: 'USPS' },
              { label: 'Canada Post', value: 'Canada Post' },
            ]}
          />
        ),
        cell: ({ row }) => (
          <CarrierBadge
            carrier={row.original.carrier}
            codAmount={row.original.cod_amount}
          />
        ),
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id));
        },
      },
      {
        accessorKey: 'payment_status',
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t('table.payment')}
            filterOptions={[
              { label: 'Paid', value: 'Paid' },
              { label: 'Unpaid', value: 'Unpaid' },
              { label: 'COD', value: 'COD' },
            ]}
          />
        ),
        cell: ({ row }) => (
          <Badge 
            variant={row.original.payment_status === 'Paid' ? 'outline' : 'secondary'}
          >
            {row.original.payment_status}
          </Badge>
        ),
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id));
        },
      },
      {
        accessorKey: 'status',
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t('table.status')}
            filterOptions={[
              { label: t('status.pending'), value: 'pending' },
              { label: t('status.preparing'), value: 'preparing' },
              { label: t('status.in_transit'), value: 'in_transit' },
              { label: t('status.out_for_delivery'), value: 'out_for_delivery' },
              { label: t('status.delivered'), value: 'delivered' },
              { label: t('status.returned'), value: 'returned' },
              { label: t('status.cancelled'), value: 'cancelled' },
              { label: t('status.on_hold'), value: 'on_hold' },
            ]}
          />
        ),
        cell: ({ row }) => (
          <Badge variant={statusVariants[row.original.status] || 'default'}>
            {t(`status.${row.original.status}`)}
          </Badge>
        ),
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id));
        },
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