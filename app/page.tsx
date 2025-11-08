"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("usuario@academia.umb.edu.co")
  const [password, setPassword] = useState("••••••••")

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">UMB</span>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">Bienvenido a UMB</CardTitle>
            <CardDescription className="text-lg text-red-600 font-semibold">
              Préstamo de Salones
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
              />
            </div>
          </div>
          
          <Link href="/dashboard">
            <Button className="w-full h-12 bg-red-600 hover:bg-red-700">
              Iniciar Sesión
            </Button>
          </Link>
          
          <div className="text-center">
            <Link href="/forgot-password" className="text-sm text-red-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          
          <div className="text-center">
            <span className="text-sm text-gray-600">¿No tienes cuenta? </span>
            <Link href="/register" className="text-sm text-red-600 hover:underline">
              Regístrate
            </Link>
          </div>
          
          <div className="relative">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-2 text-sm text-gray-500">O continúa con</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12">
              Google
            </Button>
            <Button variant="outline" className="h-12">
              Microsoft
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
