"use client"

import * as React from "react"
import { useTranslations } from 'next-intl'
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function ChartBarBreakdown() {
  const t = useTranslations('charts')
  
  const chartData = [
    { carrier: t('dhl'), shipments: 186, fill: "var(--color-dhl)" },
    { carrier: t('fedex'), shipments: 305, fill: "var(--color-fedex)" },
    { carrier: t('aramex'), shipments: 237, fill: "var(--color-aramex)" },
    { carrier: t('ups'), shipments: 73, fill: "var(--color-ups)" },
    { carrier: t('other'), shipments: 209, fill: "var(--color-other)" },
  ]

  const chartConfig = {
    shipments: {
      label: t('shipments'),
    },
    dhl: {
      label: t('dhl'),
      color: "hsl(var(--chart-1))",
    },
    fedex: {
      label: t('fedex'),
      color: "hsl(var(--chart-2))",
    },
    aramex: {
      label: t('aramex'),
      color: "hsl(var(--chart-3))",
    },
    ups: {
      label: t('ups'),
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: t('other'),
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('carrier-breakdown')}</CardTitle>
        <CardDescription>{t('by-shipment-volume')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="carrier"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="shipments" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
