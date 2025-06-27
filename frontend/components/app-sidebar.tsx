"use client"

import * as React from "react"
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import {
  IconAdjustments,
  IconBox,
  IconDashboard,
  IconFileInvoice,
  IconHelp,
  IconReport,
  IconSearch,
  IconSettings,
  IconShoppingCart,
  IconTruckDelivery,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Placeholder for a real logo component
const ShipTagLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-6"
  >
    <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v2" />
    <path d="m7 10 5 3 5-3" />
    <path d="M22 19H2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2Z" />
    <path d="M17 19v-4.2a.8.8 0 0 0-.4-.7l-4.2-2.1a.8.8 0 0 0-.8 0l-4.2 2.1a.8.8 0 0 0-.4.7V19" />
  </svg>
)

const userData = {
  name: "Osama Abdo",
  email: "osama@shiptag.com",
  avatar: "/avatars/01.png",
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations('nav')
  const tCommon = useTranslations('common')
  const locale = useLocale()
  const isRTL = locale === 'ar'

  const navItems = [
    { title: t('dashboard'), url: `/${locale}/dashboard`, icon: IconDashboard },
    { title: t('orders'), url: "#", icon: IconShoppingCart },
    { title: t('operations'), url: "#", icon: IconAdjustments },
    { title: t('e-invoice'), url: "#", icon: IconFileInvoice },
    { title: t('products'), url: "#", icon: IconBox },
    { title: t('shipments'), url: `/${locale}/shipments`, icon: IconTruckDelivery },
    { title: t('reports'), url: "#", icon: IconReport },
    { title: t('search'), url: "#", icon: IconSearch },
  ]

  const navFooterItems = [
    { title: t('get-help'), url: "#", icon: IconHelp },
    { title: t('settings'), url: "#", icon: IconSettings },
  ]

  return (
    <Sidebar side={isRTL ? "right" : "left"} {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href={`/${locale}/dashboard`} className="flex items-center gap-2">
                <ShipTagLogo />
                <span className="text-lg font-semibold">{tCommon('shiptag')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} showQuickCreate={true} />
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-y-3 p-4">
        <NavMain items={navFooterItems} />
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}
