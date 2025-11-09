-- MySQL schema for UMB classroom management platform
-- Compatible with phpMyAdmin imports

CREATE DATABASE IF NOT EXISTS gestion_salones CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gestion_salones;

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(191) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('ADMIN', 'TEACHER', 'GUEST') NOT NULL DEFAULT 'GUEST',
  department VARCHAR(120) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS subjects (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(45) NOT NULL UNIQUE,
  name VARCHAR(150) NOT NULL,
  description TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS rooms (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(45) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  location VARCHAR(150) NOT NULL,
  capacity SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  resources TEXT NULL,
  default_subject_id INT UNSIGNED NULL,
  default_teacher_id INT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_rooms_default_subject FOREIGN KEY (default_subject_id) REFERENCES subjects(id) ON DELETE SET NULL,
  CONSTRAINT fk_rooms_default_teacher FOREIGN KEY (default_teacher_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS reservations (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  room_id INT UNSIGNED NOT NULL,
  teacher_id INT UNSIGNED NOT NULL,
  subject_id INT UNSIGNED NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  status ENUM('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
  notes VARCHAR(255) NULL,
  approved_by INT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_reservations_room FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
  CONSTRAINT fk_reservations_teacher FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_reservations_subject FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE SET NULL,
  CONSTRAINT fk_reservations_approver FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL,
  CONSTRAINT chk_reservations_time CHECK (start_time < end_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS room_assignments (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  room_id INT UNSIGNED NOT NULL,
  teacher_id INT UNSIGNED NOT NULL,
  subject_id INT UNSIGNED NOT NULL,
  day_of_week TINYINT UNSIGNED NULL,
  start_time TIME NULL,
  end_time TIME NULL,
  notes VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_assignments_room FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
  CONSTRAINT fk_assignments_teacher FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_assignments_subject FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS reservation_audit (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  reservation_id INT UNSIGNED NOT NULL,
  action ENUM('CREATED', 'UPDATED', 'STATUS_CHANGED', 'CANCELLED') NOT NULL,
  performed_by INT UNSIGNED NOT NULL,
  old_status ENUM('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED') NULL,
  new_status ENUM('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED') NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_audit_reservation FOREIGN KEY (reservation_id) REFERENCES reservations(id) ON DELETE CASCADE,
  CONSTRAINT fk_audit_performer FOREIGN KEY (performed_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed data ------------------------------------------------------------

INSERT INTO subjects (code, name, description) VALUES
  ('MAT101', 'Matemáticas Básicas', 'Fundamentos de álgebra y cálculo'),
  ('PRO201', 'Programación II', 'Estructuras de datos y patrones de diseño'),
  ('ARQ305', 'Arquitectura de Software', 'Modelos avanzados para sistemas empresariales'),
  ('FIS210', 'Física Aplicada', 'Conceptos de mecánica y electricidad para ingeniería'),
  ('QUI220', 'Química General', 'Principios de química orgánica e inorgánica'),
  ('BIO115', 'Biología Celular', 'Estudio de la estructura y función de la célula'),
  ('HIS130', 'Historia Contemporánea', 'Análisis de acontecimientos del siglo XX'),
  ('LIT140', 'Literatura Universal', 'Obras representativas de la literatura mundial'),
  ('ADM250', 'Administración de Proyectos', 'Herramientas para planear, ejecutar y controlar proyectos'),
  ('ING160', 'Inglés Académico', 'Habilidades de lectura y escritura para contextos universitarios')
ON DUPLICATE KEY UPDATE name = VALUES(name), description = VALUES(description);

INSERT INTO rooms (code, name, location, capacity, resources)
VALUES
  ('A-301', 'Salón 301', 'Bloque A - Piso 3', 30, 'Televisor, Sonido, Aire acondicionado'),
  ('B-210', 'Salón 210', 'Bloque B - Piso 2', 45, 'Proyector, Pizarra interactiva'),
  ('D-405', 'Laboratorio 405', 'Bloque D - Piso 4', 28, 'Computadores Core i7, Switch Cisco, Aire acondicionado'),
  ('C-112', 'Salón 112', 'Bloque C - Piso 1', 36, 'Televisor 4K, Sistema de videoconferencia'),
  ('E-201', 'Auditorio 201', 'Bloque E - Piso 2', 80, 'Iluminación profesional, Cabina de sonido, Streaming'),
  ('F-108', 'Laboratorio de Innovación', 'Bloque F - Piso 1', 24, 'Impresoras 3D, Kits de robótica, Cámaras de realidad virtual'),
  ('G-215', 'Salón Creativo', 'Bloque G - Piso 2', 32, 'Pizarras móviles, Pantalla interactiva'),
  ('H-120', 'Laboratorio de Electrónica', 'Bloque H - Piso 1', 26, 'Osciloscopios, Kits de circuitos, Herramientas de soldadura'),
  ('J-305', 'Sala de Conferencias', 'Bloque J - Piso 3', 40, 'Sistema de videoconferencia, Sonido envolvente'),
  ('K-220', 'Laboratorio de Redes', 'Bloque K - Piso 2', 22, 'Racks de servidores, Equipos de networking Cisco'),
  ('L-110', 'Aula Magna', 'Bloque L - Piso 1', 120, 'Sistema de audio profesional, Iluminación inteligente'),
  ('M-205', 'Salón de Música', 'Bloque M - Piso 2', 35, 'Instrumentos musicales, Paneles acústicos'),
  ('N-315', 'Laboratorio de Realidad Virtual', 'Bloque N - Piso 3', 20, 'Visores VR, Estaciones de alto rendimiento'),
  ('P-101', 'Sala de Innovación', 'Bloque P - Piso 1', 25, 'Mobiliario modular, Monitores táctiles'),
  ('Q-402', 'Laboratorio de Biotecnología', 'Bloque Q - Piso 4', 18, 'Cabinas de bioseguridad, Microscopios de alta precisión')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  location = VALUES(location),
  capacity = VALUES(capacity),
  resources = VALUES(resources);

-- Example administrator account
INSERT INTO users (full_name, email, password, role, department)
VALUES
  ('Coordinador UMB', 'admin@academia.umb.edu.co', 'scrypt$1ce5ed190d85d062277bb8250220d1ea$0d64187c13b23b990e4c16ef9ee9bb3ca95d1a566e7b7035b2cfdf06affa51c10852c2509473858846b5ffdafee10f4892c8afe15de52aef141ba9bb970fb15f', 'ADMIN', 'Coordinación Académica')
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name), department = VALUES(department), role = 'ADMIN';

INSERT INTO users (full_name, email, password, role, department)
VALUES
  ('Profesor de Prueba 1', 'profesor1@academia.umb.edu.co', 'scrypt$2cbf88cf38e1bac55edf66084fedd1b5$bf35169af35fd725c01a7f0a996e8bf31e3f6148616dffa119a20c1d2258f54b097ff663f0cea29b6ff875e9699bb9036061e72389866f4db110419642e4dd4d', 'TEACHER', 'Departamento de Matemáticas'),
  ('Profesor de Prueba 2', 'profesor2@academia.umb.edu.co', 'scrypt$8aedbd6d24047fd9ad0664c4e5db5fbe$7a380a6b9db37ed40b8855b47042c5fb3ffc529967fae7cdc6ef21f71e8412174f3a35f6a40cbb05803a23322b93592a0cacd89cbde02889e7a303f7e8f268d0', 'TEACHER', 'Departamento de Ingeniería'),
  ('Profesor de Prueba 3', 'profesor3@academia.umb.edu.co', 'scrypt$98b7ca580a0c44eb1e088af18706564f$edadb420a2bd09c03381cecbacd81b74d2c1cd17173172dc348b8b3e4b80ae3278f54e9b656adef5fab04a310c6224c6dae9aa4be2bea51407f231f08e875e2f', 'TEACHER', 'Departamento de Arquitectura'),
  ('Profesor de Prueba 4', 'profesor4@academia.umb.edu.co', 'scrypt$7647302a25fe18766e58c304ed551c5f$34c591854eb9171c3b55bf927fab20b8c932c51adae219ab8d6bc90867d2018e81103ecd353415b8fb3d3928f3ce1dcebbad984a7e579556344852757c2e5dee', 'TEACHER', 'Departamento de Ciencias Sociales')
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name), department = VALUES(department), role = 'TEACHER';

-- Link default teachers/subjects once users exist
-- Example linking: UPDATE rooms SET default_teacher_id = 2, default_subject_id = 1 WHERE code = 'A-301';
