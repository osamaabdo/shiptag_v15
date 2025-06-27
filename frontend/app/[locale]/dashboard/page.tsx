"use client"

import { useTranslations } from 'next-intl';
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { ChartBarBreakdown } from "@/components/chart-bar-breakdown"
import { ChartDonutBreakdown } from "@/components/chart-donut-breakdown"
import { DataTable } from "@/components/proposal-data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteLayout } from "@/components/site-layout"

import data from "./data.json"

export default function DashboardPage() {
  const t = useTranslations('dashboard');

  return (
    <SiteLayout>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive />
        </div>
        <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 lg:px-6">
          <ChartDonutBreakdown />
          <ChartBarBreakdown />
        </div>
        <div className="px-4 lg:px-6">
          <h2 className="text-xl font-semibold tracking-tight">{t('recent-shipments')}</h2>
          <DataTable data={data} />
        </div>
      </div>
    </SiteLayout>
  )
}