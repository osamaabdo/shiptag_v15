'use client';

import * as React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ShipmentTooltipProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  contentClassName?: string;
  asChild?: boolean;
}

export function ShipmentTooltip({ 
  trigger, 
  content, 
  className,
  contentClassName,
  asChild = true 
}: ShipmentTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild={asChild} className={className}>
          {asChild ? (
            <div className="cursor-help">
              {trigger}
            </div>
          ) : (
            trigger
          )}
        </TooltipTrigger>
        <TooltipContent className={contentClassName}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}