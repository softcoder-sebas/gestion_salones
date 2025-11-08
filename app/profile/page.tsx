"use client"

import { ArrowLeft, User, Settings, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function ProfilePage() {
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
          <h1 className="text-xl font-bold">Perfil</h1>
          <Button variant="ghost" size="icon" className="text-white hover:bg-red-700">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder-user.jpg" alt="Usuario" />
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">Usuario Academia</h2>
                <p className="text-gray-600">usuario@academia.umb.edu.co</p>
                <p className="text-sm text-gray-500">Profesor</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Card>
            <CardContent className="p-4">
              <Link href="/my-reservations" className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <span>Mis Reservas</span>
                </div>
                <span className="text-gray-400">→</span>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Link href="/notifications" className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Settings className="h-5 w-5 text-green-600" />
                  </div>
                  <span>Configuración</span>
                </div>
                <span className="text-gray-400">→</span>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Link href="/" className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <LogOut className="h-5 w-5 text-red-600" />
                  </div>
                  <span className="text-red-600">Cerrar Sesión</span>
                </div>
                <span className="text-gray-400">→</span>
              </Link>
            </CardContent>
          </Card>
        </div>
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
          <Link href="/profile" className="flex items-center justify-center text-red-600">
            <div className="w-6 h-6 bg-red-600 rounded"></div>
          </Link>
        </div>
      </nav>
    </div>
  )
}
