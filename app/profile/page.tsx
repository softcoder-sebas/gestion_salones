"use client"

import { useEffect, useState } from 'react'
import { LogOut, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { BottomNavigation } from '@/components/navigation/bottom-navigation'
import { useAuth } from '@/components/auth-provider'
import { useAuthGuard } from '@/hooks/useAuthGuard'

export default function ProfilePage() {
  const { user, loading } = useAuthGuard()
  const { logout, refresh } = useAuth()
  const [fullName, setFullName] = useState('')
  const [department, setDepartment] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      setFullName(user.fullName)
      setDepartment(user.department ?? '')
    }
  }, [user])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    setError(null)
    setMessage(null)

    try {
      const response = await fetch('/api/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ fullName, department }),
      })

      const payload = await response.json()
      if (!response.ok) {
        setError(payload?.error ?? 'No fue posible actualizar el perfil')
        return
      }

      setMessage('Información actualizada correctamente')
      await refresh()
    } catch (err) {
      console.error('Profile update error', err)
      setError('Ocurrió un error al guardar los cambios')
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
    <div className="min-h-screen bg-gray-50 pb-28 pt-10 px-4">
      <div className="mx-auto max-w-3xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Perfil personal</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nombre completo</Label>
                <Input id="fullName" value={fullName} onChange={(event) => setFullName(event.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo institucional</Label>
                <Input id="email" value={user.email} readOnly className="bg-gray-100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Facultad / Departamento</Label>
                <Input
                  id="department"
                  value={department}
                  onChange={(event) => setDepartment(event.target.value)}
                  placeholder="Facultad de Ingeniería"
                />
              </div>
              {message && <p className="text-sm text-green-600">{message}</p>}
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" className="w-full md:w-auto bg-red-600 hover:bg-red-700" disabled={saving}>
                {saving ? (
                  <span className="flex items-center gap-2">
                    <Save className="h-4 w-4 animate-pulse" /> Guardando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="h-4 w-4" /> Guardar cambios
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Sesión</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600">
              Rol actual: <span className="font-semibold text-gray-900">{user.role}</span>
            </p>
            <Button variant="outline" className="w-full md:w-auto" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" /> Cerrar sesión
            </Button>
          </CardContent>
        </Card>
      </div>
      <BottomNavigation />
    </div>
  )
}
