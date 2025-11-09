# Gestión de Salones UMB

Aplicación web para administrar reservas de salones académicos. Permite a administradores gestionar la oferta de aulas y a los docentes solicitar horarios según su disponibilidad.

## Roles disponibles

La base de datos incluye los siguientes roles predeterminados para fines de prueba:

- **ADMIN**
  - Usuario de coordinación académica con acceso completo a la plataforma.
  - Credenciales de ejemplo: `admin@academia.umb.edu.co`
- **TEACHER**
  - Cuatro cuentas de docentes de prueba con permisos para solicitar y consultar reservas.
  - Correos generados automáticamente: `profesor1@academia.umb.edu.co` hasta `profesor4@academia.umb.edu.co`
- **GUEST**
  - Rol reservado para futuras implementaciones con acceso limitado.

> **Nota:** Las contraseñas incluidas en `database/schema.sql` son hashes de ejemplo (bcrypt). Antes de usar las cuentas en producción, actualiza los valores desde phpMyAdmin con contraseñas seguras.

## Requisitos previos

- [XAMPP](https://www.apachefriends.org/) con Apache y MySQL habilitados.
- phpMyAdmin (incluido en XAMPP).
- Node.js 18 o superior y PNPM (para ejecutar la interfaz Next.js).

## Inicialización de la base de datos con phpMyAdmin y XAMPP

1. **Iniciar servicios**
   - Abre el panel de control de XAMPP y enciende los módulos **Apache** y **MySQL**.
2. **Acceder a phpMyAdmin**
   - En el navegador visita `http://localhost/phpmyadmin`.
3. **Crear la base de datos**
   - Haz clic en *Importar*.
   - Selecciona el archivo [`database/schema.sql`](database/schema.sql) del proyecto.
   - Ejecuta la importación para crear tablas y datos de ejemplo.
4. **Verificar usuarios y datos**
   - Abre la tabla `users` para confirmar la creación del administrador y los docentes de prueba.
   - Si necesitas actualizar contraseñas, usa la pestaña *Editar* y reemplaza `password_hash` con un nuevo hash generado desde phpMyAdmin (`PASSWORD_BCRYPT`).
5. **Configurar la conexión desde la aplicación**
   - Copia el archivo `.env.example` a `.env.local` y ajusta las credenciales de la base de datos MySQL según tu entorno XAMPP (por defecto: usuario `root` sin contraseña y host `127.0.0.1`).

## Ejecución de la aplicación Next.js

```bash
pnpm install
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`.

## Recursos adicionales

- Esquema y datos base: [`database/schema.sql`](database/schema.sql)
- Estilos compartidos y páginas estáticas: [`styles.css`](styles.css), [`index.html`](index.html)

Si encuentras algún problema o necesitas ampliar la guía, abre un issue o contacta al equipo de desarrollo.
