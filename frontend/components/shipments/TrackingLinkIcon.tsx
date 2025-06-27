'use client';

import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface TrackingLinkIconProps {
  trackingNumber?: string;
  carrierId: string;
}

const trackingUrls: Record<string, string> = {
  dhl: 'https://www.dhl.com/global-en/home/tracking/tracking-express.html?submit=1&tracking-id=',
  fedex: 'https://www.fedex.com/fedextrack/?tracknumbers=',
  ups: 'https://www.ups.com/track?loc=en_US&tracknum=',
  aramex: 'https://www.aramex.com/track/results?ShipmentNumber=',
  smsa: 'https://www.smsaexpress.com/trackingdetails?tracknumber=',
};

export function TrackingLinkIcon({ trackingNumber, carrierId }: TrackingLinkIconProps) {
  if (!trackingNumber) {
    return <span className="text-muted-foreground">-</span>;
  }

  const getTrackingUrl = () => {
    const baseUrl = trackingUrls[carrierId] || '#';
    return `${baseUrl}${trackingNumber}`;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => window.open(getTrackingUrl(), '_blank')}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Track shipment: {trackingNumber}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}