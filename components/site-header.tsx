"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Headphones, Menu, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href: string
  isExternal?: boolean
}

interface SiteHeaderProps {
  navItems?: NavItem[]
  showAuth?: boolean
  showThemeToggle?: boolean
  isLoggedIn?: boolean
}

export function SiteHeader({
  navItems = [
    { title: "Features", href: "/#features" },
    { title: "Pricing", href: "/#pricing" },
    { title: "FAQ", href: "/#faq" },
  ],
  showAuth = true,
  showThemeToggle = true,
  isLoggedIn = false,
}: SiteHeaderProps) {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
            <div className="rounded-md bg-primary p-1">
              <Headphones className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Transcribly</span>
          </Link>
        </div>

        <nav className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={cn("nav-link", pathname === item.href && "active")}>
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {showThemeToggle && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          {showAuth && !isLoggedIn && (
            <>
              <Link href="/login" className="hidden text-sm font-medium transition-colors hover:text-primary md:block">
                Login
              </Link>
              <Button asChild size="sm" className="hidden md:inline-flex">
                <Link href="/signup">Get Started</Link>
              </Button>
            </>
          )}

          {showAuth && isLoggedIn && (
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    {item.title}
                  </Link>
                ))}
                {showAuth && !isLoggedIn && (
                  <>
                    <Link href="/login" className="text-lg font-medium transition-colors hover:text-primary">
                      Login
                    </Link>
                    <Button asChild className="mt-2">
                      <Link href="/signup">Get Started</Link>
                    </Button>
                  </>
                )}
                {showAuth && isLoggedIn && (
                  <Button asChild className="mt-2">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
