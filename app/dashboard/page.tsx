"use client"

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Bell, Calendar, CheckCircle2, Clock3, Home, ListChecks, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import type { Reservation, Room } from '@/lib/types'
import { BottomNavigation } from '@/components/navigation/bottom-navigation'
import { cn } from '@/lib/utils'

const statusStyles: Record<string, string> = {
  APPROVED: 'bg-green-100 text-green-800',
  PENDING: 'bg-yellow-100 text-yellow-800',
  REJECTED: 'bg-red-100 text-red-700',
  CANCELLED: 'bg-gray-200 text-gray-600',
}

export default function Dashboard() {
  const { user, loading } = useAuthGuard()
  const [rooms, setRooms] = useState<Room[]>([])
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      if (!user) {
        return
      }
      setLoadingData(true)
      setError(null)
      try {
        const roomsResponse = await fetch('/api/rooms', { credentials: 'include' })
        if (roomsResponse.ok) {
          const payload = await roomsResponse.json()
          setRooms(payload?.data ?? [])
        } else {
          setError('No fue posible cargar los salones')
        }

        if (user.role !== 'GUEST') {
          const reservationsResponse = await fetch('/api/reservations', { credentials: 'include' })
          if (reservationsResponse.ok) {
            const payload = await reservationsResponse.json()
            setReservations(payload?.data ?? [])
          } else if (!error) {
            setError('No fue posible cargar las reservas')
          }
        } else {
          setReservations([])
        }
      } catch (err) {
        console.error('Dashboard load error', err)
        setError('Ocurrió un error al consultar la información')
      } finally {
        setLoadingData(false)
      }
    }

    if (!loading && user) {
      loadData()
    }
  }, [user, loading])

  const upcomingReservations = useMemo(() => {
    if (user?.role === 'ADMIN') {
      return reservations.filter((reservation) => reservation.status === 'PENDING').slice(0, 5)
    }
    return reservations
      .filter((reservation) => new Date(reservation.startTime) >= new Date())
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
      .slice(0, 5)
  }, [reservations, user?.role])

  const formatReservationWindow = (startTime: string, endTime: string) => {
    const start = new Date(startTime)
    const end = new Date(endTime)
    const sameDay = start.toDateString() === end.toDateString()

    const startLabel = start.toLocaleString('es-CO', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })

    if (sameDay) {
      const endLabel = end.toLocaleTimeString('es-CO', { timeStyle: 'short' })
      return `${startLabel} - ${endLabel}`
    }

    const endLabel = end.toLocaleString('es-CO', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })

    return `${startLabel} - ${endLabel}`
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Skeleton className="h-48 w-48" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <header className="bg-red-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Hola, {user.fullName.split(' ')[0]}</h1>
            <p className="text-sm text-red-100">Rol: {user.role === 'ADMIN' ? 'Administrador' : user.role === 'TEACHER' ? 'Profesor' : 'Invitado'}</p>
          </div>
          <Link href="/notifications">
            <Button variant="ghost" size="icon" className="text-white hover:bg-red-700">
              <Bell className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {error && <p className="text-sm text-red-600">{error}</p>}

        {user.role !== 'GUEST' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Plus className="h-5 w-5 text-red-600" /> Reservar salón
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Solicita un espacio para tus clases, asesorías o eventos académicos.</p>
                <Link href="/reserve">
                  <Button className="w-full bg-red-600 hover:bg-red-700">Nueva reserva</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ListChecks className="h-5 w-5 text-red-600" /> Mis reservas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Consulta el estado de tus solicitudes y gestiona cambios.</p>
                <Link href="/my-reservations">
                  <Button variant="outline" className="w-full">
                    Ver historial
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bienvenido invitado</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Puedes consultar los salones disponibles y conocer a qué docente y materia están asignados. Solicita acceso a
                un administrador si necesitas permisos adicionales.
              </p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Home className="h-5 w-5 text-red-600" /> Salones disponibles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {loadingData ? (
              <Skeleton className="h-24 w-full" />
            ) : rooms.length === 0 ? (
              <p className="text-sm text-gray-600">No hay salones registrados aún.</p>
            ) : (
              rooms.map((room) => {
                const isOccupied = Boolean(room.currentReservation)
                return (
                  <div key={room.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-gray-900">{room.name}</h3>
                        <span
                          className={cn(
                            'inline-flex items-center rounded-full px-3 py-0.5 text-xs font-semibold',
                            isOccupied ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700',
                          )}
                        >
                          {isOccupied ? 'Ocupado' : 'Disponible'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{room.location} • Capacidad {room.capacity} personas</p>
                      {room.resources && <p className="text-xs text-gray-500">{room.resources}</p>}
                    </div>
                    <div className="text-sm text-gray-700 space-y-1 md:text-right">
                      {room.currentReservation ? (
                        <>
                          <p>
                            Profesor:{' '}
                            <span className="font-medium">{room.currentReservation.teacherName}</span>
                          </p>
                          <p>
                            Materia:{' '}
                            <span className="font-medium">{room.currentReservation.subjectName ?? 'Por confirmar'}</span>
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatReservationWindow(room.currentReservation.startTime, room.currentReservation.endTime)}
                          </p>
                        </>
                      ) : (
                        <>
                          <p>
                            Profesor asignado:{' '}
                            <span className="font-medium">{room.defaultTeacherName ?? 'Sin asignar'}</span>
                          </p>
                          <p>
                            Materia:{' '}
                            <span className="font-medium">{room.defaultSubjectName ?? 'Sin asignar'}</span>
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </CardContent>
        </Card>

        {user.role !== 'GUEST' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-red-600" /> Próximas reservas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {loadingData ? (
                <Skeleton className="h-24 w-full" />
              ) : upcomingReservations.length === 0 ? (
                <p className="text-sm text-gray-600">No tienes reservas próximas.</p>
              ) : (
                upcomingReservations.map((reservation) => (
                  <div key={reservation.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">{reservation.roomName}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(reservation.startTime).toLocaleString('es-CO', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </p>
                      {reservation.subjectName && <p className="text-xs text-gray-500">Materia: {reservation.subjectName}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={statusStyles[reservation.status] ?? 'bg-gray-200 text-gray-700'}>{reservation.status}</Badge>
                      <Clock3 className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        )}

        {user.role === 'ADMIN' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-red-600" /> Tareas del administrador
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">
                Gestiona las solicitudes pendientes, asigna profesores a los salones y crea nuevas materias desde el panel de
                administración.
              </p>
              <div className="flex flex-col md:flex-row gap-3">
                <Link href="/admin">
                  <Button className="w-full bg-red-600 hover:bg-red-700">Ir al panel administrativo</Button>
                </Link>
                <Link href="/reserve">
                  <Button variant="outline" className="w-full">Crear reserva manual</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <BottomNavigation />
    </div>
  )
}
