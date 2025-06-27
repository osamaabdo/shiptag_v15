'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { Address } from '@/types/shipments';

interface CustomerTooltipProps {
  name: string;
  location: string;
  address: Address;
}

export function CustomerTooltip({ name, location, address }: CustomerTooltipProps) {
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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-help">
            <div className="font-medium">{name}</div>
            <div className="text-sm text-muted-foreground">{location}</div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          {formatAddress()}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}