"use client"

import { ArrowLeft, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function AdminPage() {
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
          <h1 className="text-xl font-bold">Administración</h1>
          <Button variant="ghost" size="icon" className="text-white hover:bg-red-700">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <Tabs defaultValue="reservas" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reservas">Reservas</TabsTrigger>
            <TabsTrigger value="salones">Salones</TabsTrigger>
            <TabsTrigger value="reportes">Reportes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reservas" className="space-y-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Salón 302</h3>
                    <p className="text-sm text-gray-600">Prof. Sebastián Revelo</p>
                    <p className="text-sm text-gray-600">Mar 15, 2025 • 10:00 AM</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                    Pendiente
                  </span>
                </div>
                <div className="flex space-x-3">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    Aprobar
                  </Button>
                  <Button variant="destructive" className="flex-1">
                    Rechazar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Salón 105</h3>
                    <p className="text-sm text-gray-600">Prof. María González</p>
                    <p className="text-sm text-gray-600">Mar 16, 2025 • 2:00 PM</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Aprobada
                  </span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="salones" className="mt-6">
            <Card>
              <CardContent className="p-4">
                <p className="text-center text-gray-500">Gestión de salones disponibles</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reportes" className="mt-6">
            <Card>
              <CardContent className="p-4">
                <p className="text-center text-gray-500">Reportes y estadísticas</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-3 h-16">
          <Link href="/dashboard" className="flex items-center justify-center text-gray-400">
            <div className="w-6 h-6 bg-gray-400 rounded"></div>
          </Link>
          <Link href="/my-reservations" className="flex items-center justify-center text-gray-400">
            <div className="w-6 h-6 bg-gray-400 rounded"></div>
          </Link>
          <Link href="/profile" className="flex items-center justify-center text-gray-400">
            <div className="w-6 h-6 bg-gray-400 rounded"></div>
          </Link>
        </div>
      </nav>
    </div>
  )
}
