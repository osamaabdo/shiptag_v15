'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { OrderItem } from '@/types/shipments';

interface ItemsTooltipTableProps {
  items: OrderItem[];
}

export function ItemsTooltipTable({ items }: ItemsTooltipTableProps) {
  const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help font-medium">
            {items.length}
          </span>
        </TooltipTrigger>
        <TooltipContent className="p-0">
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
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}