"use client"

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
  showQuickCreate = false,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
  showQuickCreate?: boolean
}) {
  const t = useTranslations('nav')
  const tAccessibility = useTranslations('accessibility')

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {showQuickCreate && (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={tAccessibility('quick-create-tooltip')}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
              >
                <IconCirclePlusFilled />
                <span>{t('quick-create')}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
