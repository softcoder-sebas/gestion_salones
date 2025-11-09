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
  ('ARQ305', 'Arquitectura de Software', 'Modelos avanzados para sistemas empresariales')
ON DUPLICATE KEY UPDATE name = VALUES(name), description = VALUES(description);

INSERT INTO rooms (code, name, location, capacity, resources)
VALUES
  ('A-301', 'Salón 301', 'Bloque A - Piso 3', 30, 'Televisor, Sonido, Aire acondicionado'),
  ('B-210', 'Salón 210', 'Bloque B - Piso 2', 45, 'Proyector, Pizarra interactiva'),
  ('D-405', 'Laboratorio 405', 'Bloque D - Piso 4', 28, 'Computadores Core i7, Switch Cisco, Aire acondicionado')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  location = VALUES(location),
  capacity = VALUES(capacity),
  resources = VALUES(resources);

-- Example administrator account
INSERT INTO users (full_name, email, password, role, department)
VALUES
  ('Coordinador UMB', 'admin@academia.umb.edu.co', 'admin123', 'ADMIN', 'Coordinación Académica')
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name), department = VALUES(department), role = 'ADMIN';

INSERT INTO users (full_name, email, password, role, department)
VALUES
  ('Profesor de Prueba 1', 'profesor1@academia.umb.edu.co', 'profesor123', 'TEACHER', 'Departamento de Matemáticas'),
  ('Profesor de Prueba 2', 'profesor2@academia.umb.edu.co', 'profesor123', 'TEACHER', 'Departamento de Ingeniería'),
  ('Profesor de Prueba 3', 'profesor3@academia.umb.edu.co', 'profesor123', 'TEACHER', 'Departamento de Arquitectura'),
  ('Profesor de Prueba 4', 'profesor4@academia.umb.edu.co', 'profesor123', 'TEACHER', 'Departamento de Ciencias Sociales')
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name), department = VALUES(department), role = 'TEACHER';

-- Link default teachers/subjects once users exist
-- Example linking: UPDATE rooms SET default_teacher_id = 2, default_subject_id = 1 WHERE code = 'A-301';
