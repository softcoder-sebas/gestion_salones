"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check, Loader2, Shield, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import type { Reservation, Room, Subject, User } from '@/lib/types'

interface NewRoomForm {
  code: string
  name: string
  location: string
  capacity: number
  resources: string
  defaultTeacherId?: string
  defaultSubjectId?: string
}

interface NewSubjectForm {
  code: string
  name: string
  description: string
}

export default function AdminPage() {
  const { user, loading } = useAuthGuard(['ADMIN'])
  const [rooms, setRooms] = useState<Room[]>([])
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [teachers, setTeachers] = useState<User[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const [newRoom, setNewRoom] = useState<NewRoomForm>({
    code: '',
    name: '',
    location: '',
    capacity: 20,
    resources: '',
  })

  const [newSubject, setNewSubject] = useState<NewSubjectForm>({ code: '', name: '', description: '' })

  const loadAdminData = async () => {
    try {
      setLoadingData(true)
      setError(null)
      const [roomsResponse, reservationsResponse, subjectsResponse, usersResponse, teachersResponse] = await Promise.all([
        fetch('/api/rooms', { credentials: 'include' }),
        fetch('/api/reservations?status=PENDING', { credentials: 'include' }),
        fetch('/api/subjects', { credentials: 'include' }),
        fetch('/api/users', { credentials: 'include' }),
        fetch('/api/teachers', { credentials: 'include' }),
      ])

      if (roomsResponse.ok) {
        const payload = await roomsResponse.json()
        setRooms(payload?.data ?? [])
      }
      if (reservationsResponse.ok) {
        const payload = await reservationsResponse.json()
        setReservations(payload?.data ?? [])
      }
      if (subjectsResponse.ok) {
        const payload = await subjectsResponse.json()
        setSubjects(payload?.data ?? [])
      }
      if (usersResponse.ok) {
        const payload = await usersResponse.json()
        setUsers(payload?.data ?? [])
      }
      if (teachersResponse.ok) {
        const payload = await teachersResponse.json()
        setTeachers(payload?.data ?? [])
      }
    } catch (err) {
      console.error('Admin data error', err)
      setError('No fue posible cargar la información administrativa')
    } finally {
      setLoadingData(false)
    }
  }

  useEffect(() => {
    if (!loading && user) {
      loadAdminData()
    }
  }, [loading, user])

  const updateReservationStatus = async (reservationId: number, status: 'APPROVED' | 'REJECTED') => {
    setSaving(true)
    setError(null)
    try {
      const response = await fetch(`/api/reservations/${reservationId}/status`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) {
        const payload = await response.json()
        setError(payload?.error ?? 'No fue posible actualizar la reserva')
        return
      }
      await loadAdminData()
    } catch (err) {
      console.error('Update reservation status error', err)
      setError('Ocurrió un error al actualizar la reserva')
    } finally {
      setSaving(false)
    }
  }

  const handleCreateRoom = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...newRoom,
          capacity: Number(newRoom.capacity),
          defaultSubjectId: newRoom.defaultSubjectId ? Number(newRoom.defaultSubjectId) : null,
          defaultTeacherId: newRoom.defaultTeacherId ? Number(newRoom.defaultTeacherId) : null,
        }),
      })
      if (!response.ok) {
        const payload = await response.json()
        setError(payload?.error ?? 'No fue posible crear el salón')
        return
      }
      setNewRoom({ code: '', name: '', location: '', capacity: 20, resources: '' })
      await loadAdminData()
    } catch (err) {
      console.error('Create room error', err)
      setError('Ocurrió un error al crear el salón')
    } finally {
      setSaving(false)
    }
  }

  const handleAssignRoom = async (roomId: number, teacherId?: number | null, subjectId?: number | null) => {
    setSaving(true)
    setError(null)
    try {
      const response = await fetch(`/api/rooms/${roomId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          defaultTeacherId: teacherId ?? null,
          defaultSubjectId: subjectId ?? null,
        }),
      })
      if (!response.ok) {
        const payload = await response.json()
        setError(payload?.error ?? 'No fue posible actualizar el salón')
        return
      }
      await loadAdminData()
    } catch (err) {
      console.error('Assign room error', err)
      setError('Ocurrió un error al asignar el salón')
    } finally {
      setSaving(false)
    }
  }

  const handleCreateSubject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const response = await fetch('/api/subjects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newSubject),
      })
      if (!response.ok) {
        const payload = await response.json()
        setError(payload?.error ?? 'No fue posible crear la materia')
        return
      }
      setNewSubject({ code: '', name: '', description: '' })
      await loadAdminData()
    } catch (err) {
      console.error('Create subject error', err)
      setError('Ocurrió un error al crear la materia')
    } finally {
      setSaving(false)
    }
  }

  const handleRoleChange = async (userId: number, role: string) => {
    setSaving(true)
    setError(null)
    try {
      const response = await fetch(`/api/users/${userId}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ role }),
      })
      if (!response.ok) {
        const payload = await response.json()
        setError(payload?.error ?? 'No fue posible actualizar el rol')
        return
      }
      await loadAdminData()
    } catch (err) {
      console.error('Update role error', err)
      setError('Ocurrió un error al actualizar el rol')
    } finally {
      setSaving(false)
    }
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Skeleton className="h-48 w-48" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <header className="bg-red-600 text-white p-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:bg-red-700">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Panel administrativo</h1>
          <Shield className="h-5 w-5 text-red-200" />
        </div>
      </header>

      <main className="p-4 space-y-6">
        {error && <p className="text-sm text-red-600">{error}</p>}

        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reservas pendientes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {loadingData ? (
                <Skeleton className="h-24 w-full" />
              ) : reservations.length === 0 ? (
                <p className="text-sm text-gray-600">No hay reservas pendientes por revisar.</p>
              ) : (
                reservations.map((reservation) => (
                  <div key={reservation.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{reservation.roomName}</p>
                        <p className="text-xs text-gray-600">Solicitado por {reservation.teacherName}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(reservation.startTime).toLocaleString('es-CO', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}{' '}
                          - {new Date(reservation.endTime).toLocaleTimeString('es-CO', { timeStyle: 'short' })}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          className="bg-green-600 hover:bg-green-700"
                          disabled={saving}
                          onClick={() => updateReservationStatus(reservation.id, 'APPROVED')}
                        >
                          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Aprobar
                        </Button>
                        <Button
                          variant="destructive"
                          disabled={saving}
                          onClick={() => updateReservationStatus(reservation.id, 'REJECTED')}
                        >
                          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />} Rechazar
                        </Button>
                      </div>
                    </div>
                    {reservation.notes && <p className="text-xs text-gray-500">Motivo: {reservation.notes}</p>}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Crear nuevo salón</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateRoom} className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="room-code">Código</Label>
                    <Input
                      id="room-code"
                      value={newRoom.code}
                      onChange={(event) => setNewRoom((prev) => ({ ...prev, code: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="room-name">Nombre</Label>
                    <Input
                      id="room-name"
                      value={newRoom.name}
                      onChange={(event) => setNewRoom((prev) => ({ ...prev, name: event.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room-location">Ubicación</Label>
                  <Input
                    id="room-location"
                    value={newRoom.location}
                    onChange={(event) => setNewRoom((prev) => ({ ...prev, location: event.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room-capacity">Capacidad</Label>
                  <Input
                    id="room-capacity"
                    type="number"
                    min={10}
                    value={newRoom.capacity}
                    onChange={(event) => setNewRoom((prev) => ({ ...prev, capacity: Number(event.target.value) }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room-resources">Recursos</Label>
                  <Input
                    id="room-resources"
                    value={newRoom.resources}
                    onChange={(event) => setNewRoom((prev) => ({ ...prev, resources: event.target.value }))}
                    placeholder="Televisor, aire acondicionado, laboratorio..."
                  />
                </div>
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Crear salón'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Crear nueva materia</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateSubject} className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="subject-code">Código</Label>
                  <Input
                    id="subject-code"
                    value={newSubject.code}
                    onChange={(event) => setNewSubject((prev) => ({ ...prev, code: event.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject-name">Nombre</Label>
                  <Input
                    id="subject-name"
                    value={newSubject.name}
                    onChange={(event) => setNewSubject((prev) => ({ ...prev, name: event.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject-description">Descripción</Label>
                  <Input
                    id="subject-description"
                    value={newSubject.description}
                    onChange={(event) => setNewSubject((prev) => ({ ...prev, description: event.target.value }))}
                    placeholder="Resumen de la materia"
                  />
                </div>
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Crear materia'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Asignaciones de salones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {loadingData ? (
                <Skeleton className="h-24 w-full" />
              ) : rooms.length === 0 ? (
                <p className="text-sm text-gray-600">Registra un salón para comenzar.</p>
              ) : (
                rooms.map((room) => (
                  <div key={room.id} className="border rounded-lg p-4 space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{room.name}</p>
                      <p className="text-xs text-gray-600">{room.location} • Capacidad {room.capacity}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-gray-500">Profesor asignado</Label>
                        <select
                          className="mt-1 h-10 w-full rounded border border-gray-300 px-2 text-sm"
                          value={room.defaultTeacherId ?? ''}
                          onChange={(event) => handleAssignRoom(room.id, event.target.value ? Number(event.target.value) : null, room.defaultSubjectId)}
                        >
                          <option value="">Sin asignar</option>
                          {teachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                              {teacher.fullName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Materia asignada</Label>
                        <select
                          className="mt-1 h-10 w-full rounded border border-gray-300 px-2 text-sm"
                          value={room.defaultSubjectId ?? ''}
                          onChange={(event) => handleAssignRoom(room.id, room.defaultTeacherId, event.target.value ? Number(event.target.value) : null)}
                        >
                          <option value="">Sin asignar</option>
                          {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                              {subject.code} • {subject.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Usuarios registrados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {loadingData ? (
                <Skeleton className="h-24 w-full" />
              ) : users.length === 0 ? (
                <p className="text-sm text-gray-600">Aún no hay usuarios registrados.</p>
              ) : (
                <div className="space-y-3">
                  {users.map((currentUser) => (
                    <div key={currentUser.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{currentUser.fullName}</p>
                        <p className="text-xs text-gray-600">{currentUser.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-xs text-gray-500">Rol</Label>
                        <select
                          className="h-10 rounded border border-gray-300 px-2 text-sm"
                          value={currentUser.role}
                          onChange={(event) => handleRoleChange(currentUser.id, event.target.value)}
                          disabled={saving}
                        >
                          <option value="ADMIN">Administrador</option>
                          <option value="TEACHER">Profesor</option>
                          <option value="GUEST">Invitado</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
