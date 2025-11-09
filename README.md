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
- [Guía de Uso](#-guía-de-uso)
- [Solución de Problemas](#-solución-de-problemas)
- [Contribución](#-contribución)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

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

### Notas de Seguridad

⚠️ **IMPORTANTE**: Estas credenciales son solo para desarrollo y pruebas. En producción:

1. Elimina o deshabilita estos usuarios
2. Cambia todas las contraseñas predeterminadas
3. Implementa políticas de contraseñas fuertes
4. Habilita autenticación de dos factores (2FA)
5. Configura registro de intentos de acceso

---

## 📘 Guía de Uso

### Para Administradores

#### 1. Primer Inicio de Sesión
```
1. Asegúrate de que XAMPP esté corriendo (Apache + MySQL)
2. Accede a http://localhost:3000/login
3. Usa: admin@academia.umb.edu.co / admin123
4. Serás redirigido al panel de administración
```

#### 2. Crear un Nuevo Salón
```
1. Ve a Dashboard > Salones > Nuevo Salón
2. Completa el formulario:
   - Código: Ej. B-505
   - Nombre: Ej. Laboratorio de Programación
   - Ubicación: Ej. Bloque B - Piso 5
   - Capacidad: Ej. 35
   - Recursos: Ej. 30 computadores, Proyector
3. Haz clic en "Guardar"
```

#### 3. Aprobar una Reserva
```
1. Ve a Dashboard > Reservas > Pendientes
2. Revisa los detalles de la solicitud
3. Verifica que no haya conflictos de horario
4. Haz clic en "Aprobar" o "Rechazar"
5. Opcionalmente agrega comentarios
```

### Para Docentes

#### 1. Crear una Reserva
```
1. Accede con tus credenciales de docente
2. Ve a Dashboard > Nueva Reserva
3. Selecciona:
   - Salón deseado
   - Fecha y hora (inicio y fin)
   - Materia
   - Notas adicionales (opcional)
4. Haz clic en "Solicitar Reserva"
5. Espera la aprobación del administrador
```

#### 2. Consultar Disponibilidad
```
1. Ve a Dashboard > Disponibilidad
2. Selecciona fecha
3. Filtra por:
   - Capacidad mínima
   - Recursos necesarios
   - Ubicación
4. Verás salones disponibles con horarios libres
```

---

## 🛠 Solución de Problemas

### Problemas con XAMPP y MySQL

#### Error: "Cannot connect to database"

**Causa**: MySQL no está corriendo en XAMPP

**Solución**:
```bash
1. Abre el Panel de Control de XAMPP
2. Verifica que el módulo "MySQL" tenga luz verde
3. Si está en rojo, haz clic en "Start" junto a MySQL
4. Si no inicia, verifica que el puerto 3306 no esté ocupado:
   
   # En Windows (CMD como Administrador)
   netstat -ano | findstr :3306
   
   # Si está ocupado, puedes:
   # a) Cerrar la aplicación que usa el puerto
   # b) Cambiar el puerto de MySQL en XAMPP (Config > my.ini)
```

#### Error: "Access denied for user 'root'@'localhost'"

**Causa**: Contraseña incorrecta o cambio en la configuración

**Solución**:
```bash
1. La instalación por defecto de XAMPP no tiene contraseña
2. Verifica en .env.local que DATABASE_PASSWORD esté vacío
3. Si configuraste una contraseña, asegúrate de usar la correcta
4. Probar acceso manual desde phpMyAdmin
```

#### Error: "phpMyAdmin no carga (404 Not Found)"

**Causa**: Apache no está corriendo

**Solución**:
```bash
1. En el Panel de Control de XAMPP, inicia "Apache"
2. Verifica que tenga luz verde
3. Accede a: http://localhost/phpmyadmin
4. Si persiste el error, reinicia XAMPP completamente
```

#### Error: "Puerto 80 ya está en uso" (Apache)

**Causa**: Otro programa está usando el puerto 80

**Solución**:
```bash
# Encontrar qué aplicación usa el puerto 80
netstat -ano | findstr :80

# Opciones:
# 1. Cerrar la aplicación (comúnmente Skype, IIS, o servicios de Windows)
# 2. Cambiar el puerto de Apache:
#    - En XAMPP: Config > httpd.conf
#    - Cambiar "Listen 80" por "Listen 8080"
#    - Reiniciar Apache
#    - Acceder a: http://localhost:8080/phpmyadmin
```

#### Error: "MySQL no inicia - Puerto 3306 ocupado"

**Causa**: Otra instancia de MySQL está corriendo

**Solución**:
```bash
# Ver qué usa el puerto 3306
netstat -ano | findstr :3306

# Detener otras instancias de MySQL:
# 1. Abre "Servicios" de Windows (services.msc)
# 2. Busca servicios MySQL (MySQL, MySQL80, etc.)
# 3. Detén el servicio
# 4. Reinicia MySQL desde XAMPP
```

### Error: "Port 3000 is already in use"

**Causa**: El puerto 3000 está ocupado

**Solución**:
```bash
# Opción 1: Cambiar puerto
PORT=3001 pnpm dev

# Opción 2: Matar proceso en puerto 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Error: "Module not found"

**Causa**: Dependencias no instaladas correctamente

**Solución**:
```bash
# Limpiar caché y reinstalar
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Error: Foreign Key Constraint en la BD

**Causa**: Problema con las relaciones de la base de datos

**Solución**:
```sql
-- Eliminar base de datos existente
DROP DATABASE IF EXISTS gestion_salones;

-- Re-importar el schema.sql corregido
SOURCE database/schema.sql;
```

### Error: "NEXT_PUBLIC_APP_URL is not defined"

**Causa**: Variables de entorno no configuradas

**Solución**:
```bash
# Verificar que .env.local existe
ls -la .env.local

# Copiar desde ejemplo si no existe
cp .env.example .env.local

# Reiniciar servidor
pnpm dev
```

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Sigue estos pasos:

### 1. Fork del Proyecto
```bash
# Haz fork desde GitHub y clona tu fork
git clone https://github.com/TU-USUARIO/gestion-salones-umb.git
```

### 2. Crea una Rama
```bash
git checkout -b feature/nueva-funcionalidad
```

### 3. Realiza tus Cambios
```bash
# Haz tus modificaciones
# Asegúrate de seguir las convenciones de código
pnpm lint
```

### 4. Commit y Push
```bash
git add .
git commit -m "feat: agrega nueva funcionalidad X"
git push origin feature/nueva-funcionalidad
```

### 5. Abre un Pull Request
- Ve a GitHub
- Abre un PR desde tu rama hacia `main`
- Describe tus cambios claramente

### Convenciones de Código

- **TypeScript**: Usa tipos estrictos
- **Nombres**: camelCase para variables, PascalCase para componentes
- **Commits**: Sigue [Conventional Commits](https://www.conventionalcommits.org/)
  - `feat:` nueva funcionalidad
  - `fix:` corrección de bug
  - `docs:` cambios en documentación
  - `style:` formato de código
  - `refactor:` refactorización
  - `test:` agregar tests

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

```
MIT License

Copyright (c) 2025 Universidad Manuela Beltrán

Se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia
de este software y archivos de documentación asociados (el "Software"), para
utilizar el Software sin restricciones...
```

---

## 📞 Contacto

### Equipo de Desarrollo

- **Coordinación Académica UMB**
- Email: admin@academia.umb.edu.co
- Sitio Web: [https://umb.edu.co](https://umb.edu.co)

### Soporte Técnico

- 📧 Email: soporte.ti@umb.edu.co
- 📞 Teléfono: +57 (1) 123-4567
- 💬 Slack: #gestion-salones

### Enlaces Útiles

- 📚 [Documentación Completa](https://docs.gestion-salones.umb.edu.co)
- 🐛 [Reportar Bug](https://github.com/tu-usuario/gestion-salones-umb/issues)
- 💡 [Solicitar Funcionalidad](https://github.com/tu-usuario/gestion-salones-umb/issues/new)
- 📹 [Video Tutoriales](https://youtube.com/playlist/...)

---

## 🎓 Créditos

Desarrollado con ❤️ por el equipo de Tecnología de la Universidad Manuela Beltrán

**Agradecimientos especiales a**:
- Coordinación Académica
- Departamento de TI
- Comunidad de código abierto
- Todos los docentes que probaron el sistema

---

## 📊 Estado del Proyecto

![Estado](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow)
![Versión](https://img.shields.io/badge/Versi%C3%B3n-1.0.0-blue)
![Licencia](https://img.shields.io/badge/Licencia-MIT-green)
![Node](https://img.shields.io/badge/Node-%3E%3D18.0.0-brightgreen)

### Roadmap

- [x] Sistema de autenticación
- [x] Gestión de usuarios
- [x] CRUD de salones y materias
- [x] Sistema de reservas
- [x] Aprobación de reservas
- [ ] Notificaciones por email
- [ ] Exportar reportes PDF
- [ ] App móvil
- [ ] Integración con calendario institucional
- [ ] Sistema de códigos QR para check-in

---

**Última actualización**: Noviembre 2025
