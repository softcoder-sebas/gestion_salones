"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/components/auth-provider'

export default function RegisterPage() {
  const router = useRouter()
  const { user, loading, refresh } = useAuth()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [department, setDepartment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard')
    }
  }, [user, loading, router])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ fullName, email, password, department }),
      })

      const payload = await response.json()
      if (!response.ok) {
        setError(payload?.error ?? 'No fue posible crear la cuenta')
        return
      }

      setSuccess('Registro exitoso. Redirigiendo al panel...')
      await refresh()
      router.push('/dashboard')
    } catch (err) {
      console.error('Register error', err)
      setError('No fue posible crear la cuenta. Intenta nuevamente')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-gray-900">Registro de Profesor</CardTitle>
          <CardDescription className="text-gray-600">
            Crea tu cuenta para agendar, gestionar reservas y acceder al historial académico.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="fullName">Nombre completo</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                required
                placeholder="Ej. María Fernanda Rodríguez"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo institucional</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                placeholder="profesor@academia.umb.edu.co"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={8}
                placeholder="Mínimo 8 caracteres"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="department">Facultad o departamento</Label>
              <Textarea
                id="department"
                value={department}
                onChange={(event) => setDepartment(event.target.value)}
                placeholder="Facultad de Ingeniería, Departamento de Sistemas, etc."
              />
            </div>
            {error && <p className="text-sm text-red-600 md:col-span-2">{error}</p>}
            {success && <p className="text-sm text-green-600 md:col-span-2">{success}</p>}
            <div className="md:col-span-2">
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={submitting}>
                {submitting ? 'Registrando...' : 'Crear cuenta'}
              </Button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/" className="text-red-600 hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
