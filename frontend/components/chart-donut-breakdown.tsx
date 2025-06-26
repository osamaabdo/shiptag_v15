"use client"

import * as React from "react"
import { useTranslations } from 'next-intl'
import { Pie, PieChart } from "recharts"

import {
  Card,  
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function ChartDonutBreakdown() {
  const t = useTranslations('charts')

  const chartData = [
    { name: t('domestic'), value: 250, fill: "var(--color-domestic)" },
    { name: t('international'), value: 150, fill: "var(--color-international)" },
    { name: t('express'), value: 100, fill: "var(--color-express)" },
    { name: t('economy'), value: 200, fill: "var(--color-economy)" },
  ]

  const chartConfig = {
    domestic: {
      label: t('domestic'),
      color: "hsl(var(--chart-1))",
    },
    international: {
      label: t('international'),
      color: "hsl(var(--chart-2))",
    },
    express: {
      label: t('express'),
      color: "hsl(var(--chart-3))",
    },
    economy: {
      label: t('economy'),
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('shipment-breakdown')}</CardTitle>
        <CardDescription>{t('by-type')}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} />
            <ChartLegend
              content={({ payload }) => (
                <ChartLegendContent
                  payload={payload as Array<{ dataKey?: string; value?: string; color?: string }>}
                  nameKey="name"
                  className="flex-wrap gap-2 [&>*]:basis-auto [&>*]:justify-center"
                />
              )}
              className="-translate-y-[2rem]"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
