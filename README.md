# 🏫 Sistema de Gestión de Salones - Universidad Manuela Beltrán

Sistema web completo para la gestión y reserva de salones académicos, desarrollado con tecnologías modernas y enfocado en la eficiencia operativa de instituciones educativas.

---

## 📑 Tabla de Contenido

- [Descripción General](#-descripción-general)
- [Características Principales](#-características-principales)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
  - [1. Clonar el Repositorio](#1-clonar-el-repositorio)
  - [2. Configurar la Base de Datos](#2-configurar-la-base-de-datos)
  - [3. Configurar Variables de Entorno](#3-configurar-variables-de-entorno)
  - [4. Instalar Dependencias](#4-instalar-dependencias)
  - [5. Iniciar el Servidor](#5-iniciar-el-servidor)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Roles y Permisos](#-roles-y-permisos)
- [Funcionalidades por Rol](#-funcionalidades-por-rol)
- [Base de Datos](#-base-de-datos)
- [API Endpoints](#-api-endpoints)
- [Usuarios de Prueba](#-usuarios-de-prueba)

---

## 📖 Descripción General

El **Sistema de Gestión de Salones UMB** es una plataforma web diseñada para optimizar la administración de espacios académicos en instituciones educativas. Permite a docentes reservar salones, a administradores gestionar recursos y visualizar la ocupación en tiempo real.

### Objetivos del Sistema

- ✅ Centralizar la gestión de reservas de salones
- ✅ Evitar conflictos de horarios y duplicación de reservas
- ✅ Proporcionar visibilidad en tiempo real de la disponibilidad
- ✅ Facilitar la asignación de recursos académicos
- ✅ Generar reportes y auditorías de uso

---

## ✨ Características Principales

### Para Administradores
- 🔐 **Gestión Completa de Usuarios**: Crear, editar y eliminar cuentas
- 🏢 **Administración de Salones**: CRUD completo de espacios académicos
- 📚 **Gestión de Materias**: Catálogo de asignaturas
- ✅ **Aprobación de Reservas**: Revisar y aprobar/rechazar solicitudes
- 📊 **Dashboard Administrativo**: Métricas y estadísticas en tiempo real
- 📋 **Auditoría**: Registro completo de todas las acciones

### Para Docentes
- 📅 **Reservar Salones**: Interfaz intuitiva para solicitar espacios
- 👀 **Ver Disponibilidad**: Consultar salones disponibles por fecha/hora
- 📝 **Historial de Reservas**: Acceso a reservas pasadas y futuras
- 🔔 **Notificaciones**: Alertas sobre cambios en el estado de reservas

### Para Invitados
- 🔍 **Consultar Disponibilidad**: Ver horarios disponibles sin autenticación
- 📊 **Ver Ocupación**: Visualizar calendario de reservas públicas

---

## 🛠 Tecnologías Utilizadas

### Frontend
- **Next.js 14+**: Framework React con App Router
- **React 18+**: Biblioteca de interfaces de usuario
- **TypeScript**: Tipado estático para JavaScript
- **Tailwind CSS**: Framework de estilos utility-first
- **Shadcn/ui**: Componentes de UI accesibles y personalizables
- **React Hook Form**: Gestión de formularios
- **Zod**: Validación de esquemas

### Backend
- **Next.js API Routes**: Endpoints del servidor
- **MySQL/MariaDB**: Base de datos relacional (vía XAMPP)
- **InnoDB**: Motor de almacenamiento con soporte transaccional
- **Scrypt**: Algoritmo de hashing para contraseñas

### Entorno de Desarrollo
- **XAMPP**: Paquete de servidor local (Apache + MySQL + PHP + phpMyAdmin)
- **phpMyAdmin**: Interfaz web para gestión de MySQL
- **pnpm**: Gestor de paquetes eficiente
- **ESLint**: Linter para código JavaScript/TypeScript
- **Prettier**: Formateador de código

> 💡 **Nota**: Este proyecto usa **XAMPP** como solución todo-en-uno para el servidor de base de datos, eliminando la necesidad de configuraciones complejas.

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** v18.0.0 o superior ([Descargar](https://nodejs.org/))
- **pnpm** v8.0.0 o superior ([Instalación](https://pnpm.io/installation))
- **XAMPP** (incluye MySQL/MariaDB + phpMyAdmin) ([Descargar](https://www.apachefriends.org/))
- **Git** para control de versiones

> 💡 **Nota**: Este proyecto utiliza **XAMPP** como servidor local, que incluye MySQL y phpMyAdmin integrados. No necesitas instalar MySQL por separado.

### Verificar Instalaciones

```bash
# Verificar Node.js
node --version    # Debe mostrar v18.0.0 o superior

# Verificar pnpm
pnpm --version    # Debe mostrar v8.0.0 o superior
```

### Configurar XAMPP

1. **Instalar XAMPP** desde [apachefriends.org](https://www.apachefriends.org/)
2. **Abrir el Panel de Control de XAMPP**
3. **Iniciar los siguientes servicios**:
   - ✅ **Apache** (servidor web para phpMyAdmin)
   - ✅ **MySQL** (base de datos)

![XAMPP Control Panel](https://via.placeholder.com/600x200/1a1a1a/00ff00?text=XAMPP+Control+Panel)

4. **Verificar que los servicios estén activos** (luz verde en el panel)

---

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
# Clonar el proyecto
git clone https://github.com/softcoder-sebas/gestion_salones

# Acceder al directorio
cd gestion-salones-umb
```

### 2. Configurar la Base de Datos

#### ⚡ Usando XAMPP y phpMyAdmin (Método Recomendado)

**Este proyecto utiliza XAMPP con MySQL y phpMyAdmin para gestionar la base de datos de forma visual y sencilla.**

##### Paso 1: Iniciar XAMPP

```bash
1. Abre el Panel de Control de XAMPP
2. Inicia el servicio "Apache"
3. Inicia el servicio "MySQL"
4. Espera a que ambos servicios muestren luz verde
```

##### Paso 2: Acceder a phpMyAdmin

```bash
1. Abre tu navegador web
2. Ve a: http://localhost/phpmyadmin
3. Deberías ver la interfaz de phpMyAdmin
```

> 💡 **Usuario por defecto en XAMPP**: `root` sin contraseña

##### Paso 3: Importar la Base de Datos

```bash
1. En phpMyAdmin, haz clic en la pestaña "Importar" en el menú superior
2. Haz clic en "Seleccionar archivo" o "Choose File"
3. Navega hasta la carpeta del proyecto y selecciona: database/schema.sql
4. Verifica que el formato esté configurado como "SQL"
5. Desplázate hacia abajo y haz clic en el botón "Continuar" o "Go"
6. Espera a que la importación se complete
7. Verás el mensaje: "Importación finalizada con éxito"
```

##### Paso 4: Verificar la Importación

```bash
1. En el panel izquierdo de phpMyAdmin, busca la base de datos "gestion_salones"
2. Haz clic en ella para expandir las tablas
3. Deberías ver las siguientes tablas:
   ✅ users
   ✅ rooms
   ✅ subjects
   ✅ reservations
   ✅ room_assignments
   ✅ reservation_audit
```

##### Paso 5: Verificar Datos de Prueba

```sql
-- Haz clic en la pestaña "SQL" en phpMyAdmin y ejecuta:
SELECT COUNT(*) as total_usuarios FROM users;
SELECT COUNT(*) as total_salones FROM rooms;
SELECT COUNT(*) as total_materias FROM subjects;

-- Deberías obtener:
-- total_usuarios: 5 (1 admin + 4 profesores)
-- total_salones: 30
-- total_materias: 20
```

#### 📌 Solución de Problemas en phpMyAdmin

**Error: "No se puede conectar al servidor MySQL"**
```bash
Solución:
1. Verifica que MySQL esté corriendo en XAMPP (luz verde)
2. Reinicia el servicio MySQL desde el panel de XAMPP
3. Si persiste, reinicia XAMPP completamente
```

**Error: "Archivo demasiado grande para importar"**
```bash
Solución:
1. En phpMyAdmin, ve a la pestaña "Importar"
2. Busca el mensaje: "Tamaño máximo: XXX MB"
3. Si el archivo es mayor, usa la opción de línea de comandos:

# Abre la terminal de Windows (CMD) o PowerShell
cd C:\xampp\mysql\bin
mysql -u root -p gestion_salones < "C:\ruta\al\proyecto\database\schema.sql"
```

**Error: "La base de datos ya existe"**
```bash
Solución:
1. En phpMyAdmin, selecciona la base de datos "gestion_salones"
2. Haz clic en "Operaciones" en el menú superior
3. Desplázate hasta "Eliminar la base de datos (DROP)"
4. Haz clic en "DROP" y confirma
5. Vuelve a importar el archivo schema.sql
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# Copiar el archivo de ejemplo
cp .env.example .env.local
```

Edita `.env.local` con tus configuraciones de XAMPP:

```env
# Base de Datos MySQL (Configuración por defecto de XAMPP)
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=          # Dejar vacío (XAMPP no tiene contraseña por defecto)
DATABASE_NAME=gestion_salones

# Aplicación
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Seguridad (generar con: openssl rand -base64 32)
JWT_SECRET=tu_clave_secreta_muy_segura_aqui
SESSION_SECRET=otra_clave_secreta_diferente

# Email (Opcional - para notificaciones)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_contraseña_app
```

> ⚠️ **Importante para XAMPP**: La configuración por defecto de MySQL en XAMPP es:
> - Usuario: `root`
> - Contraseña: **vacía** (sin contraseña)
> - Puerto: `3306`

### 4. Instalar Dependencias

```bash
# Instalar todos los paquetes necesarios
pnpm install
```

Este comando instalará todas las dependencias listadas en `package.json`.

### 5. Iniciar el Servidor

```bash
# Modo desarrollo (con hot-reload)
pnpm dev
```

El servidor estará disponible en: **http://localhost:3000**

#### Otros Comandos Útiles

```bash
# Compilar para producción
pnpm build

# Iniciar en modo producción
pnpm start

# Ejecutar linter
pnpm lint

# Ejecutar tests
pnpm test
```

---

## 📁 Estructura del Proyecto

```
gestion-salones-umb/
├── app/                          # Directorio principal de Next.js 14+
│   ├── (auth)/                   # Grupo de rutas de autenticación
│   │   ├── login/               # Página de inicio de sesión
│   │   └── register/            # Página de registro
│   ├── (dashboard)/             # Grupo de rutas protegidas
│   │   ├── admin/               # Panel de administración
│   │   ├── teacher/             # Panel de docentes
│   │   └── layout.tsx           # Layout del dashboard
│   ├── api/                     # API Routes de Next.js
│   │   ├── auth/                # Endpoints de autenticación
│   │   ├── rooms/               # Endpoints de salones
│   │   ├── reservations/        # Endpoints de reservas
│   │   └── users/               # Endpoints de usuarios
│   ├── layout.tsx               # Layout raíz
│   └── page.tsx                 # Página de inicio
├── components/                   # Componentes reutilizables
│   ├── ui/                      # Componentes base de Shadcn
│   ├── forms/                   # Formularios
│   ├── layouts/                 # Layouts compartidos
│   └── shared/                  # Componentes compartidos
├── lib/                         # Utilidades y configuraciones
│   ├── db/                      # Configuración de base de datos
│   ├── auth/                    # Lógica de autenticación
│   ├── utils.ts                 # Funciones auxiliares
│   └── validations/             # Esquemas de validación Zod
├── database/                    # Scripts de base de datos
│   ├── schema.sql               # Schema completo de MySQL
│   └── migrations/              # Migraciones (opcional)
├── public/                      # Archivos estáticos
│   ├── images/                  # Imágenes
│   └── icons/                   # Iconos
├── styles/                      # Estilos globales
│   └── globals.css              # CSS global con Tailwind
├── types/                       # Definiciones de TypeScript
│   └── index.ts                 # Tipos globales
├── .env.example                 # Ejemplo de variables de entorno
├── .env.local                   # Variables de entorno (no versionado)
├── next.config.js               # Configuración de Next.js
├── package.json                 # Dependencias del proyecto
├── pnpm-lock.yaml              # Lock file de pnpm
├── tsconfig.json               # Configuración de TypeScript
├── tailwind.config.ts          # Configuración de Tailwind
└── README.md                   # Documentación
```

---

## 👥 Roles y Permisos

El sistema implementa tres niveles de acceso:

### 🔴 ADMIN (Administrador)
**Acceso completo al sistema**

- ✅ Gestionar usuarios (crear, editar, eliminar, cambiar roles)
- ✅ Gestionar salones (CRUD completo)
- ✅ Gestionar materias (CRUD completo)
- ✅ Aprobar/rechazar reservas
- ✅ Ver todas las reservas del sistema
- ✅ Acceder a reportes y estadísticas
- ✅ Ver logs de auditoría
- ✅ Configurar parámetros del sistema

### 🟡 TEACHER (Docente)
**Acceso para gestionar sus propias reservas**

- ✅ Crear solicitudes de reserva
- ✅ Ver sus propias reservas
- ✅ Editar reservas pendientes
- ✅ Cancelar reservas propias
- ✅ Ver disponibilidad de salones
- ✅ Consultar catálogo de materias
- ❌ No puede aprobar reservas
- ❌ No puede gestionar usuarios

### 🟢 GUEST (Invitado)
**Acceso de solo lectura**

- ✅ Ver disponibilidad de salones
- ✅ Consultar calendario de ocupación
- ✅ Ver información pública de salones
- ❌ No puede crear reservas
- ❌ No puede acceder a información de usuarios
- ❌ Acceso limitado sin autenticación

---

## 🎯 Funcionalidades por Rol

### Dashboard del Administrador

```
/admin/dashboard
├── Resumen General
│   ├── Total de reservas activas
│   ├── Salones más utilizados
│   ├── Materias más demandadas
│   └── Ocupación promedio
├── Gestión de Usuarios
│   ├── Listar usuarios
│   ├── Crear nuevo usuario
│   ├── Editar información
│   └── Cambiar roles
├── Gestión de Salones
│   ├── Ver todos los salones
│   ├── Agregar nuevo salón
│   ├── Editar capacidad y recursos
│   └── Asignar docente/materia por defecto
├── Gestión de Reservas
│   ├── Ver todas las reservas
│   ├── Filtrar por estado
│   ├── Aprobar/rechazar solicitudes
│   └── Ver historial completo
└── Reportes
    ├── Uso por salón
    ├── Reservas por docente
    └── Exportar a CSV/PDF
```

### Dashboard del Docente

```
/teacher/dashboard
├── Mis Reservas
│   ├── Reservas pendientes
│   ├── Reservas aprobadas
│   ├── Historial
│   └── Reservas canceladas
├── Nueva Reserva
│   ├── Seleccionar salón
│   ├── Elegir fecha y hora
│   ├── Asignar materia
│   └── Agregar notas
├── Disponibilidad
│   ├── Calendario de salones
│   ├── Filtrar por capacidad
│   └── Ver recursos disponibles
└── Mi Perfil
    ├── Información personal
    ├── Departamento
    └── Cambiar contraseña
```

---

## 🗄 Base de Datos

### Diagrama de Entidad-Relación

```
┌─────────────┐       ┌──────────────┐       ┌─────────────┐
│   users     │       │ reservations │       │    rooms    │
├─────────────┤       ├──────────────┤       ├─────────────┤
│ id (PK)     │───┐   │ id (PK)      │   ┌───│ id (PK)     │
│ full_name   │   │   │ room_id (FK) │───┘   │ code        │
│ email       │   └───│ teacher_id   │       │ name        │
│ password    │   ┌───│ subject_id   │───┐   │ location    │
│ role        │   │   │ start_time   │   │   │ capacity    │
│ department  │   │   │ end_time     │   │   │ resources   │
│ created_at  │   │   │ status       │   │   │ created_at  │
└─────────────┘   │   │ approved_by  │   │   └─────────────┘
                  │   │ notes        │   │
                  │   │ created_at   │   │   ┌─────────────┐
                  │   └──────────────┘   └───│  subjects   │
                  │                          ├─────────────┤
                  │   ┌──────────────┐       │ id (PK)     │
                  │   │ room_assign  │       │ code        │
                  │   ├──────────────┤       │ name        │
                  └───│ room_id (FK) │       │ description │
                      │ teacher_id   │       │ created_at  │
                      │ subject_id   │       └─────────────┘
                      │ day_of_week  │
                      │ start_time   │
                      │ end_time     │
                      └──────────────┘
```

### Tablas Principales

#### `users` - Usuarios del sistema
- **id**: Identificador único
- **full_name**: Nombre completo
- **email**: Correo electrónico (único)
- **password**: Contraseña hasheada con scrypt
- **role**: ADMIN | TEACHER | GUEST
- **department**: Departamento académico
- **created_at**: Fecha de creación

#### `rooms` - Salones disponibles
- **id**: Identificador único
- **code**: Código único del salón (ej: A-301)
- **name**: Nombre descriptivo
- **location**: Ubicación física
- **capacity**: Capacidad de personas
- **resources**: Recursos disponibles (JSON)
- **default_subject_id**: Materia asignada por defecto
- **default_teacher_id**: Docente asignado por defecto

#### `subjects` - Materias académicas
- **id**: Identificador único
- **code**: Código de la materia
- **name**: Nombre de la materia
- **description**: Descripción detallada

#### `reservations` - Reservas de salones
- **id**: Identificador único
- **room_id**: Referencia al salón
- **teacher_id**: Referencia al docente
- **subject_id**: Referencia a la materia
- **start_time**: Hora de inicio
- **end_time**: Hora de finalización
- **status**: PENDING | APPROVED | REJECTED | CANCELLED
- **notes**: Notas adicionales
- **approved_by**: Usuario que aprobó/rechazó

#### `reservation_audit` - Auditoría de cambios
- **id**: Identificador único
- **reservation_id**: Referencia a la reserva
- **action**: CREATED | UPDATED | STATUS_CHANGED | CANCELLED
- **performed_by**: Usuario que realizó la acción
- **old_status**: Estado anterior
- **new_status**: Estado nuevo
- **created_at**: Fecha de la acción

---

## 🔌 API Endpoints

### Autenticación

```http
POST   /api/auth/login           # Iniciar sesión
POST   /api/auth/register        # Registrar usuario
POST   /api/auth/logout          # Cerrar sesión
GET    /api/auth/session         # Obtener sesión actual
```

### Usuarios

```http
GET    /api/users                # Listar usuarios (ADMIN)
GET    /api/users/:id            # Obtener usuario
POST   /api/users                # Crear usuario (ADMIN)
PUT    /api/users/:id            # Actualizar usuario
DELETE /api/users/:id            # Eliminar usuario (ADMIN)
```

### Salones

```http
GET    /api/rooms                # Listar salones
GET    /api/rooms/:id            # Obtener salón
POST   /api/rooms                # Crear salón (ADMIN)
PUT    /api/rooms/:id            # Actualizar salón (ADMIN)
DELETE /api/rooms/:id            # Eliminar salón (ADMIN)
GET    /api/rooms/available      # Consultar disponibilidad
```

### Reservas

```http
GET    /api/reservations         # Listar reservas
GET    /api/reservations/:id     # Obtener reserva
POST   /api/reservations         # Crear reserva
PUT    /api/reservations/:id     # Actualizar reserva
DELETE /api/reservations/:id     # Cancelar reserva
POST   /api/reservations/:id/approve    # Aprobar (ADMIN)
POST   /api/reservations/:id/reject     # Rechazar (ADMIN)
```

### Materias

```http
GET    /api/subjects             # Listar materias
GET    /api/subjects/:id         # Obtener materia
POST   /api/subjects             # Crear materia (ADMIN)
PUT    /api/subjects/:id         # Actualizar materia (ADMIN)
DELETE /api/subjects/:id         # Eliminar materia (ADMIN)
```

---

## 🔑 Usuarios de Prueba

El sistema incluye usuarios preconfigurados para pruebas:

| Rol          | Correo                          | Contraseña    | Permisos                    |
|--------------|---------------------------------|---------------|-----------------------------|
| **Admin**    | admin@academia.umb.edu.co       | admin123      | Acceso completo al sistema  |
| **Docente**  | profesor1@academia.umb.edu.co   | profesor123   | Crear y gestionar reservas  |
| **Docente**  | profesor2@academia.umb.edu.co   | profesor123   | Crear y gestionar reservas  |
| **Docente**  | profesor3@academia.umb.edu.co   | profesor123   | Crear y gestionar reservas  |
| **Docente**  | profesor4@academia.umb.edu.co   | profesor123   | Crear y gestionar reservas  |


