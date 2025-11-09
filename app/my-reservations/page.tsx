"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Bell, Calendar, Loader2, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { BottomNavigation } from '@/components/navigation/bottom-navigation'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import type { Reservation } from '@/lib/types'

const statusLabel: Record<string, { label: string; className: string }> = {
  APPROVED: { label: 'Aprobada', className: 'bg-green-100 text-green-800' },
  PENDING: { label: 'Pendiente', className: 'bg-yellow-100 text-yellow-800' },
  REJECTED: { label: 'Rechazada', className: 'bg-red-100 text-red-700' },
  CANCELLED: { label: 'Cancelada', className: 'bg-gray-200 text-gray-600' },
}

export default function MyReservationsPage() {
  const { user, loading } = useAuthGuard(['ADMIN', 'TEACHER'])
  const router = useRouter()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cancellingId, setCancellingId] = useState<number | null>(null)

  const loadReservations = async () => {
    try {
      setLoadingData(true)
      setError(null)
      const response = await fetch('/api/reservations', { credentials: 'include' })
      if (!response.ok) {
        const payload = await response.json()
        setError(payload?.error ?? 'No fue posible obtener las reservas')
        return
      }
      const payload = await response.json()
      setReservations(payload?.data ?? [])
    } catch (err) {
      console.error('Reservations load error', err)
      setError('Ocurrió un error al cargar tus reservas')
    } finally {
      setLoadingData(false)
    }
  }

  useEffect(() => {
    if (!loading && user) {
      loadReservations()
    }
  }, [user, loading])

  const handleCancel = async (reservationId: number) => {
    setCancellingId(reservationId)
    try {
      const response = await fetch(`/api/reservations/${reservationId}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (!response.ok) {
        const payload = await response.json()
        setError(payload?.error ?? 'No fue posible cancelar la reserva')
        return
      }
      await loadReservations()
    } catch (err) {
      console.error('Cancel reservation error', err)
      setError('Ocurrió un error al cancelar la reserva')
    } finally {
      setCancellingId(null)
    }
  }

  const handleEdit = (reservationId: number) => {
    router.push(`/reserve?reservationId=${reservationId}`)
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Skeleton className="h-48 w-48" />
      </div>
    )
  }

  const showCancelButton = user.role === 'TEACHER'

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-red-600 text-white p-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:bg-red-700">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Mis reservas</h1>
          <Link href="/notifications">
            <Button variant="ghost" size="icon" className="text-white hover:bg-red-700">
              <Bell className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="p-4 space-y-4">
        {error && <p className="text-sm text-red-600">{error}</p>}

        {loadingData ? (
          <Skeleton className="h-32 w-full" />
        ) : reservations.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-gray-600">
              No tienes reservas registradas.
            </CardContent>
          </Card>
        ) : (
          reservations.map((reservation) => (
            <Card key={reservation.id}>
              <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <CardTitle className="text-lg">{reservation.roomName}</CardTitle>
                  <p className="text-sm text-gray-600">{reservation.teacherName}</p>
                </div>
                <Badge className={statusLabel[reservation.status]?.className ?? 'bg-gray-200 text-gray-700'}>
                  {statusLabel[reservation.status]?.label ?? reservation.status}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-gray-600 gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(reservation.startTime).toLocaleString('es-CO', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                  <span className="text-gray-400">→</span>
                  {new Date(reservation.endTime).toLocaleTimeString('es-CO', { timeStyle: 'short' })}
                </div>
                {reservation.subjectName && <p className="text-sm text-gray-600">Materia: {reservation.subjectName}</p>}
                {reservation.notes && <p className="text-sm text-gray-500">Notas: {reservation.notes}</p>}
                {reservation.approvedByName && reservation.status === 'APPROVED' && (
                  <p className="text-xs text-green-700">Aprobado por {reservation.approvedByName}</p>
                )}
                {showCancelButton && reservation.status === 'PENDING' && (
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full sm:w-auto"
                      onClick={() => handleEdit(reservation.id)}
                    >
                      <span className="flex items-center gap-2">
                        <Pencil className="h-4 w-4" /> Editar
                      </span>
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full sm:w-auto"
                      onClick={() => handleCancel(reservation.id)}
                      disabled={cancellingId === reservation.id}
                    >
                      {cancellingId === reservation.id ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" /> Cancelando...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Trash2 className="h-4 w-4" /> Cancelar
                        </span>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </main>

      <BottomNavigation />
    </div>
  )
}
