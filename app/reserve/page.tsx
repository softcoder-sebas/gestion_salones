"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Calendar as CalendarIcon, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import type { Reservation, ReservationStatus, Room, Subject, User } from '@/lib/types'

export default function ReservePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, loading } = useAuthGuard(['ADMIN', 'TEACHER'])
  const [rooms, setRooms] = useState<Room[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [teachers, setTeachers] = useState<User[]>([])
  const [roomId, setRoomId] = useState('')
  const [subjectId, setSubjectId] = useState('')
  const [teacherId, setTeacherId] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [notes, setNotes] = useState('')
  const [reservationId, setReservationId] = useState<number | null>(null)
  const [loadingReservation, setLoadingReservation] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{ type: ReservationStatus | 'INFO'; message: string } | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const reservationIdParam = searchParams.get('reservationId')

  const formatDateTimeForInput = (value: string) => {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) {
      return ''
    }
    const timezoneOffset = date.getTimezoneOffset() * 60000
    return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 16)
  }

  useEffect(() => {
    const loadFormData = async () => {
      if (!user) {
        return
      }
      try {
        const [roomsResponse, subjectsResponse] = await Promise.all([
          fetch('/api/rooms', { credentials: 'include' }),
          fetch('/api/subjects', { credentials: 'include' }),
        ])

        if (roomsResponse.ok) {
          const payload = await roomsResponse.json()
          setRooms(payload?.data ?? [])
        }
        if (subjectsResponse.ok) {
          const payload = await subjectsResponse.json()
          setSubjects(payload?.data ?? [])
        }
        if (user.role === 'ADMIN') {
          const teachersResponse = await fetch('/api/teachers', { credentials: 'include' })
          if (teachersResponse.ok) {
            const payload = await teachersResponse.json()
            setTeachers(payload?.data ?? [])
          }
        }
      } catch (err) {
        console.error('Reserve form data error', err)
      }
    }

    if (!loading && user) {
      loadFormData()
    }
  }, [loading, user])

  useEffect(() => {
    if (!user || loading) {
      return
    }

    if (!reservationIdParam) {
      setReservationId(null)
      setLoadingReservation(false)
      setRoomId('')
      setSubjectId('')
      setTeacherId('')
      setStartTime('')
      setEndTime('')
      setNotes('')
      setStatusMessage(null)
      return
    }

    const parsedId = Number(reservationIdParam)
    if (Number.isNaN(parsedId)) {
      setStatusMessage({ type: 'REJECTED', message: 'La reserva seleccionada no es válida.' })
      setReservationId(null)
      setLoadingReservation(false)
      return
    }

    setReservationId(parsedId)
    setLoadingReservation(true)
    setStatusMessage(null)

    const loadReservation = async () => {
      try {
        const response = await fetch(`/api/reservations/${parsedId}`, { credentials: 'include' })
        if (!response.ok) {
          const payload = await response.json().catch(() => null)
          setStatusMessage({
            type: 'REJECTED',
            message: payload?.error ?? 'No fue posible cargar la reserva seleccionada.',
          })
          setReservationId(null)
          router.push('/my-reservations')
          return
        }

        const payload = await response.json()
        const data: Reservation | undefined = payload?.data
        if (!data) {
          setStatusMessage({ type: 'REJECTED', message: 'No fue posible cargar la reserva seleccionada.' })
          setReservationId(null)
          router.push('/my-reservations')
          return
        }

        setRoomId(String(data.roomId))
        setSubjectId(data.subjectId ? String(data.subjectId) : '')
        if (user.role === 'ADMIN') {
          setTeacherId(String(data.teacherId))
        }
        setStartTime(formatDateTimeForInput(data.startTime))
        setEndTime(formatDateTimeForInput(data.endTime))
        setNotes(data.notes ?? '')
      } catch (error) {
        console.error('Load reservation error', error)
        setStatusMessage({ type: 'REJECTED', message: 'Ocurrió un error al cargar la reserva.' })
        setReservationId(null)
        router.push('/my-reservations')
      } finally {
        setLoadingReservation(false)
      }
    }

    loadReservation()
  }, [loading, reservationIdParam, router, user])

  const isEditing = Boolean(reservationId)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!user) {
      return
    }
    setSubmitting(true)
    setStatusMessage(null)

    try {
      const response = await fetch(isEditing ? `/api/reservations/${reservationId}` : '/api/reservations', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          roomId: Number(roomId),
          subjectId: subjectId ? Number(subjectId) : null,
          teacherId: user.role === 'ADMIN' && teacherId ? Number(teacherId) : undefined,
          startTime,
          endTime,
          notes,
        }),
      })

      const payload = await response.json()
      if (!response.ok) {
        const defaultErrorMessage = isEditing
          ? 'No fue posible actualizar la reserva'
          : 'No fue posible registrar la reserva'
        setStatusMessage({ type: 'REJECTED', message: payload?.error ?? defaultErrorMessage })
        return
      }

      if (isEditing) {
        setStatusMessage({ type: 'APPROVED', message: 'Reserva actualizada correctamente.' })
        router.push('/my-reservations')
      } else {
        setStatusMessage({ type: 'APPROVED', message: 'Solicitud enviada. Recibirás la confirmación por correo institucional.' })
        setRoomId('')
        setSubjectId('')
        setTeacherId('')
        setStartTime('')
        setEndTime('')
        setNotes('')
        router.push('/my-reservations')
      }
    } catch (err) {
      console.error('Reserve submit error', err)
      setStatusMessage({ type: 'REJECTED', message: 'Ocurrió un error. Intenta nuevamente.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading || !user) {
    return null
  }

  const isBusy = submitting || loadingReservation

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-red-600 text-white p-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:bg-red-700">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">{isEditing ? 'Editar reserva' : 'Reservar salón'}</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-red-600" /> Datos de la reserva
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="room">Salón</Label>
                  <select
                    id="room"
                    value={roomId}
                    onChange={(event) => setRoomId(event.target.value)}
                    required
                    disabled={isBusy}
                    className="h-12 w-full rounded-md border border-gray-300 px-3 text-sm"
                  >
                    <option value="" disabled>
                      Selecciona un salón
                    </option>
                    {rooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name} • {room.location}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Materia</Label>
                  <select
                    id="subject"
                    value={subjectId}
                    onChange={(event) => setSubjectId(event.target.value)}
                    className="h-12 w-full rounded-md border border-gray-300 px-3 text-sm"
                    disabled={isBusy}
                  >
                    <option value="">Sin asignar</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.code} • {subject.name}
                      </option>
                    ))}
                  </select>
                </div>

                {user.role === 'ADMIN' && (
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="teacher">Profesor responsable</Label>
                    <select
                      id="teacher"
                      value={teacherId}
                      onChange={(event) => setTeacherId(event.target.value)}
                      className="h-12 w-full rounded-md border border-gray-300 px-3 text-sm"
                      disabled={isBusy}
                    >
                      <option value="">Selecciona un profesor (opcional)</option>
                      {teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.fullName} • {teacher.email}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="start">Fecha y hora de inicio</Label>
                  <Input
                    id="start"
                    type="datetime-local"
                    value={startTime}
                    onChange={(event) => setStartTime(event.target.value)}
                    required
                    disabled={isBusy}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end">Fecha y hora de finalización</Label>
                  <Input
                    id="end"
                    type="datetime-local"
                    value={endTime}
                    onChange={(event) => setEndTime(event.target.value)}
                    required
                    disabled={isBusy}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observaciones</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Ej. Clase magistral de Ingeniería de Software"
                  maxLength={200}
                  disabled={isBusy}
                />
              </div>

              {statusMessage && (
                <div
                  className={`rounded-md border px-4 py-3 text-sm ${
                    statusMessage.type === 'APPROVED'
                      ? 'border-green-200 bg-green-50 text-green-700'
                      : statusMessage.type === 'INFO'
                        ? 'border-blue-200 bg-blue-50 text-blue-700'
                        : 'border-red-200 bg-red-50 text-red-700'
                  }`}
                >
                  {statusMessage.type === 'APPROVED' ? <Check className="mr-2 inline h-4 w-4" /> : null}
                  {statusMessage.message}
                </div>
              )}

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isBusy}>
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> {isEditing ? 'Guardando cambios' : 'Guardando'}
                  </span>
                ) : loadingReservation ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Cargando
                  </span>
                ) : (
                  (isEditing ? 'Guardar cambios' : 'Confirmar reserva')
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
