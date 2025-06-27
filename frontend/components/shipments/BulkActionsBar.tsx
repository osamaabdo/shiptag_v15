'use client';

import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { CheckCircle2, XCircle, CreditCard } from 'lucide-react';
import type { Shipment, BulkAction } from '@/types/shipments';

interface BulkActionsBarProps {
  selectedShipments: Shipment[];
  onBulkAction: (action: BulkAction) => void;
  onClearSelection: () => void;
}

export function BulkActionsBar({ 
  selectedShipments, 
  onBulkAction,
  onClearSelection 
}: BulkActionsBarProps) {
  const t = useTranslations('shipments.bulkActions');
  
  if (selectedShipments.length === 0) {
    return null;
  }

  const hasUnpaidShipments = selectedShipments.some(
    (shipment) => shipment.payment_status === 'Unpaid'
  );

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform">
      <div className="flex items-center gap-2 rounded-lg border bg-background p-2 shadow-lg">
        <span className="px-2 text-sm font-medium">
          {selectedShipments.length} selected
        </span>
        
        <Button
          size="sm"
          variant="outline"
          onClick={() => onBulkAction('mark_delivered')}
        >
          <CheckCircle2 className="mr-2 h-4 w-4" />
          {t('markDelivered')}
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={() => onBulkAction('cancel')}
        >
          <XCircle className="mr-2 h-4 w-4" />
          {t('cancel')}
        </Button>
        
        {hasUnpaidShipments && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onBulkAction('pay_now')}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            {t('payNow')}
          </Button>
        )}
        
        <Button
          size="sm"
          variant="ghost"
          onClick={onClearSelection}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}