"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Info, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import type { Reservation } from '@/lib/types'

export default function NotificationsPage() {
  const { user, loading } = useAuthGuard(['ADMIN', 'TEACHER'])
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        setLoadingData(true)
        const response = await fetch('/api/reservations', { credentials: 'include' })
        if (!response.ok) {
          return
        }
        const payload = await response.json()
        setReservations(payload?.data ?? [])
      } catch (err) {
        console.error('Notifications load error', err)
      } finally {
        setLoadingData(false)
      }
    }

    if (!loading && user) {
      loadNotifications()
    }
  }, [loading, user])

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Skeleton className="h-48 w-48" />
      </div>
    )
  }

  const notifications = reservations.filter((reservation) => reservation.status !== 'PENDING')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-red-600 text-white p-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:bg-red-700">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Notificaciones</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="p-4 space-y-4">
        {loadingData ? (
          <Skeleton className="h-32 w-full" />
        ) : notifications.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-gray-600">
              Aún no tienes novedades sobre tus reservas.
            </CardContent>
          </Card>
        ) : (
          notifications.map((reservation) => {
            const isApproved = reservation.status === 'APPROVED'
            const isRejected = reservation.status === 'REJECTED'
            return (
              <Card key={reservation.id} className={isApproved ? 'border-green-200 bg-green-50' : isRejected ? 'border-red-200 bg-red-50' : 'border-gray-200'}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                    {isApproved ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : isRejected ? (
                      <XCircle className="h-5 w-5 text-red-600" />
                    ) : (
                      <Info className="h-5 w-5 text-blue-600" />
                    )}
                    {reservation.roomName}
                  </CardTitle>
                  <span className="text-xs text-gray-500">
                    {new Date(reservation.updatedAt ?? reservation.createdAt).toLocaleString('es-CO', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })}
                  </span>
                </CardHeader>
                <CardContent className="text-sm text-gray-700 space-y-2">
                  <p>
                    Estado actualizado a <strong>{reservation.status}</strong>.
                  </p>
                  {reservation.approvedByName && (
                    <p>
                      Gestor: <span className="font-medium">{reservation.approvedByName}</span>
                    </p>
                  )}
                  {reservation.notes && <p className="text-gray-600">Observaciones: {reservation.notes}</p>}
                </CardContent>
              </Card>
            )
          })
        )}
      </main>
    </div>
  )
}
