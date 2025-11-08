"use client"

import { useState } from "react"
import { ArrowLeft, X, MapPin, Users, Calendar, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function ReservePage() {
  const [date, setDate] = useState("2025-01-01")
  const [time, setTime] = useState("09:00")
  const [reason, setReason] = useState("Ejemplo: Clase de Patrones y metodología de la construcción del software")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-600 text-white p-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:bg-red-700">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Reservar Salón</h1>
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:bg-red-700">
              <X className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Salón 310</CardTitle>
            <div className="flex items-center text-gray-600 space-x-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Bloque D - Piso 3</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>Capacidad: 30 personas</span>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Fecha
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Hora
              </Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="h-12"
              />
            </div>
          </div>

          <div className="text-center">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Disponible
            </span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Motivo de la reserva</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Ejemplo: Clase de Patrones y metodología de la construcción del software"
              className="min-h-[100px]"
              maxLength={150}
            />
            <p className="text-sm text-gray-500">Máximo 150 caracteres</p>
          </div>
        </div>

        <Link href="/dashboard">
          <Button className="w-full h-12 bg-red-600 hover:bg-red-700">
            Confirmar Reserva
          </Button>
        </Link>
      </main>
    </div>
  )
}
