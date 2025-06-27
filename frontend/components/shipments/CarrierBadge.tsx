'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { CarrierInfo } from '@/types/shipments';

interface CarrierBadgeProps {
  carrier: CarrierInfo;
  codAmount?: number;
  className?: string;
}

export function CarrierBadge({ carrier, codAmount, className }: CarrierBadgeProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="font-medium">{carrier.name}</span>
      {codAmount && codAmount > 0 && (
        <Badge variant="secondary" className="text-xs">
          COD ${codAmount.toFixed(2)}
        </Badge>
      )}
    </div>
  );
}