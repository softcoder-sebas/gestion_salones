"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Calendar, Home, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigationItems = [
  { href: '/dashboard', label: 'Inicio', icon: Home },
  { href: '/my-reservations', label: 'Reservas', icon: Calendar },
  { href: '/profile', label: 'Perfil', icon: User },
]

export function BottomNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="grid grid-cols-3 h-16">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors',
                isActive ? 'text-red-600' : 'text-gray-400 hover:text-red-500',
              )}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
