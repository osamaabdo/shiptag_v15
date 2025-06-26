"use client"

import * as React from "react"
import { IconMoon, IconSun } from "@tabler/icons-react"
import { useTheme } from "next-themes"
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
  const { setTheme, theme } = useTheme()
  const t = useTranslations('dashboard')
  const tAccessibility = useTranslations('accessibility')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)
  const isRTL = locale === 'ar'

  // Avoid hydration mismatch by only rendering theme-dependent content after mount
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en'
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <header className="flex h-[var(--header-height)] shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[var(--header-height)] lg:px-6">
      <div className="flex w-full items-center gap-1">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{t('title')}</h1>
        <div className={`${isRTL ? 'mr-auto' : 'ml-auto'} flex items-center gap-2`}>
          <Button variant="ghost" size="icon" onClick={toggleLanguage}>
            <span className="text-sm font-semibold">
              {locale === "en" ? "EN" : "AR"}
            </span>
            <span className="sr-only">{tAccessibility('toggle-language')}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            suppressHydrationWarning
          >
            {mounted ? (
              <>
                <IconSun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <IconMoon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </>
            ) : (
              <IconSun className="size-5" />
            )}
            <span className="sr-only">{tAccessibility('toggle-theme')}</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
