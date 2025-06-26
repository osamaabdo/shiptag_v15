"use client"

import { useTranslations, useLocale } from 'next-intl'
import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const t = useTranslations('user-menu')
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className={`data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <IconDotsVertical className={`${isRTL ? 'mr-auto order-first' : 'ml-auto order-last'} size-4`} />
              <div className={`grid flex-1 ${isRTL ? 'text-right' : 'text-left'} text-sm leading-tight`}>
                <span className="truncate font-medium">{user.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>
              <Avatar className={`h-8 w-8 rounded-lg grayscale ${isRTL ? 'order-last' : 'order-first'}`}>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : (isRTL ? "left" : "right")}
            align={isRTL ? "start" : "end"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className={`flex items-center gap-2 px-1 py-1.5 ${isRTL ? 'text-right flex-row-reverse' : 'text-left'} text-sm`}>
                <div className={`grid flex-1 ${isRTL ? 'text-right' : 'text-left'} text-sm leading-tight`}>
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className={isRTL ? 'flex-row-reverse' : ''}>
                {isRTL ? (
                  <>
                    {t('account')}
                    <IconUserCircle className="ml-2" />
                  </>
                ) : (
                  <>
                    <IconUserCircle />
                    {t('account')}
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem className={isRTL ? 'flex-row-reverse' : ''}>
                {isRTL ? (
                  <>
                    {t('billing')}
                    <IconCreditCard className="ml-2" />
                  </>
                ) : (
                  <>
                    <IconCreditCard />
                    {t('billing')}
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem className={isRTL ? 'flex-row-reverse' : ''}>
                {isRTL ? (
                  <>
                    {t('notifications')}
                    <IconNotification className="ml-2" />
                  </>
                ) : (
                  <>
                    <IconNotification />
                    {t('notifications')}
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className={isRTL ? 'flex-row-reverse' : ''}>
              {isRTL ? (
                <>
                  {t('log-out')}
                  <IconLogout className="ml-2" />
                </>
              ) : (
                <>
                  <IconLogout />
                  {t('log-out')}
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
