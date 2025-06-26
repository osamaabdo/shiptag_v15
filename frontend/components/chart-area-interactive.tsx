"use client"

import * as React from "react"
import { useTranslations } from 'next-intl'
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

const chartData = Array.from({ length: 90 }, (_, i) => {
  const d = new Date()
  d.setDate(d.getDate() - i)
  return {
    date: d.toISOString().split("T")[0],
    shipments: Math.floor(Math.random() * (500 - 100 + 1)) + 100,
  }
}).reverse()

type TimeRange = "7d" | "30d" | "90d"

export function ChartAreaInteractive() {
  const t = useTranslations('charts')
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState<TimeRange>("90d")
  
  const chartConfig = {
    shipments: {
      label: t('shipments'),
      color: "var(--primary)",
    },
  } satisfies ChartConfig

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.slice(
    -{
      "7d": 7,
      "30d": 30,
      "90d": 90,
    }[timeRange]
  )

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>{t('total-shipments')}</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            {t('showing-total-shipments')}
          </span>
          <span className="@[540px]/card:hidden">{t('shipments')}</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value) => {
              if (value) setTimeRange(value as TimeRange)
            }}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">{t('last-3-months')}</ToggleGroupItem>
            <ToggleGroupItem value="30d">{t('last-30-days')}</ToggleGroupItem>
            <ToggleGroupItem value="7d">{t('last-7-days')}</ToggleGroupItem>
          </ToggleGroup>
          <Select
            value={timeRange}
            onValueChange={(value) => setTimeRange(value as TimeRange)}
          >
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder={t('last-3-months')} />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                {t('last-3-months')}
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                {t('last-30-days')}
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                {t('last-7-days')}
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillShipments" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-shipments)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-shipments)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="shipments"
              type="natural"
              fill="url(#fillShipments)"
              stroke="var(--color-shipments)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
