"use client"

import { useTranslations } from 'next-intl'
import { IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  const t = useTranslations('cards')

  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
      <Card>
        <CardHeader>
          <CardDescription>{t('total-shipments')}</CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums">
            12,345
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <IconTrendingUp />
              <span>+15%</span>
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          {t('vs-last-month')}
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>{t('new-customers')}</CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums">
            +234
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <IconTrendingUp />
              <span>+8%</span>
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          {t('vs-last-month')}
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>{t('active-accounts')}</CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums">
            4,567
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <IconTrendingUp />
              <span>+12%</span>
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          {t('vs-last-month')}
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>{t('growth-rate')}</CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums">
            +7.8%
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <IconTrendingUp />
              <span>+2.1%</span>
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          {t('vs-last-month')}
        </CardFooter>
      </Card>
    </div>
  )
}
