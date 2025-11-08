"use client"

import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import type { Role } from '@/lib/types'
import { useAuth } from '@/components/auth-provider'

export function useAuthGuard(roles?: Role[]) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const rolesKey = useMemo(() => (roles ? [...roles].sort().join('|') : ''), [roles])

  useEffect(() => {
    if (loading) {
      return
    }
    if (!user) {
      router.replace('/')
      return
    }
    if (roles && roles.length > 0 && !roles.includes(user.role)) {
      router.replace('/dashboard')
    }
  }, [loading, user, rolesKey, roles, router])

  return { user, loading }
}
