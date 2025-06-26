"use client"

import { useTranslations } from 'next-intl';
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { ChartBarBreakdown } from "@/components/chart-bar-breakdown"
import { ChartDonutBreakdown } from "@/components/chart-donut-breakdown"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"

export default function DashboardPage() {
  const t = useTranslations('dashboard');

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 56)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
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
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}