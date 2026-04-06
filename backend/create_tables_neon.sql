-- Script para crear las tablas necesarias en Neon PostgreSQL
-- Ejecuta este script en tu base de datos Neon (usando pgAdmin, psql, o la herramienta web)

-- 1. Tabla de anuncios (si no existe)
CREATE TABLE IF NOT EXISTS anuncios (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) CHECK (tipo IN ('logro', 'ayuda', 'cumpleaños', 'noticia')),
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT,
    estado BOOLEAN DEFAULT false,
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de tribus (si no existe)
CREATE TABLE IF NOT EXISTS tribus (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    estado VARCHAR(100) DEFAULT 'Activa',
    vision TEXT,
    vidas INTEGER DEFAULT 0,
    grito TEXT,
    url_foto TEXT,
    aniversario DATE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Verificar que la tabla emprendimientos existe (ya debería existir)
-- Si no existe, créala (solo si es necesario)
CREATE TABLE IF NOT EXISTS emprendimientos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(100),
    estado BOOLEAN DEFAULT false,
    url_foto TEXT,
    whatsapp VARCHAR(50),
    instagram VARCHAR(255),
    facebook VARCHAR(255),
    tiktok VARCHAR(255),
    telegram VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Insertar datos de prueba (opcional)
-- Anuncios de prueba
INSERT INTO anuncios (tipo, titulo, contenido, estado) VALUES 
('noticia', '¡Bienvenidos a Celider Community!', 'Estrenamos nuestra plataforma digital para conectar a la comunidad de Pasto.', true),
('logro', 'Meta alcanzada: 500 miembros', 'La comunidad Celider superó los 500 miembros activos. ¡Gracias a todos!', true),
('ayuda', 'Necesitamos voluntarios', 'Buscamos líderes para el evento de integración del próximo mes.', true),
('cumpleaños', 'Felicidades Ana Pérez', 'Celebramos el cumpleaños de nuestra líder comunitaria.', true)
ON CONFLICT DO NOTHING;

-- Tribus de prueba
INSERT INTO tribus (nombre, estado, vision, vidas, grito, aniversario) VALUES 
('102 Ikimunay', 'Graduada', 'Ser la tribu más unida y emprendedora de Pasto, dejando huella en cada proyecto que emprendemos.', 42, '¡Ikimunay, fuerza y unión! Juntos llegamos más lejos.', '2023-06-15'),
('Águilas Doradas', 'Activa', 'Volamos alto para alcanzar nuestras metas, apoyándonos mutuamente en cada desafío.', 28, '¡Con las alas extendidas, tocamos el cielo!', '2023-08-22'),
('Guerreros del Sol', 'En formación', 'Aprovechamos cada rayo de luz para crecer y brillar en nuestra comunidad.', 15, '¡Calor, fuerza y perseverancia!', '2023-11-10')
ON CONFLICT DO NOTHING;

-- 5. Verificar las tablas creadas
SELECT 
    table_name,
    EXISTS (SELECT FROM information_schema.tables WHERE table_name = table_name) as exists
FROM (VALUES ('emprendimientos'), ('anuncios'), ('tribus')) as tables(table_name);

-- 6. Contar registros en cada tabla
SELECT 'emprendimientos' as tabla, COUNT(*) as total FROM emprendimientos
UNION ALL
SELECT 'anuncios' as tabla, COUNT(*) as total FROM anuncios
UNION ALL
SELECT 'tribus' as tabla, COUNT(*) as total FROM tribus;

-- 7. Ver estructura de las tablas
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name IN ('emprendimientos', 'anuncios', 'tribus')
ORDER BY table_name, ordinal_position;