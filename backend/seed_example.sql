-- Ejemplo de datos para las tablas anuncios y tribus
-- Ejecutar en tu base de datos Neon (pgAdmin, psql, o herramienta web)

-- 1. Insertar anuncios de prueba
INSERT INTO anuncios (tipo, titulo, contenido, estado, fecha_publicacion) VALUES
('noticia', '¡Nueva plataforma Celider!', 'Estrenamos nuestro dashboard comunitario. Conéctate y descubre todas las funcionalidades.', true, '2024-01-15 10:00:00'),
('logro', 'Meta de miembros alcanzada', 'La comunidad Celider superó los 500 miembros activos. ¡Gracias a todos!', true, '2024-01-14 15:30:00'),
('ayuda', 'Necesitamos voluntarios', 'Buscamos líderes para el evento de integración del próximo mes. Interesados contactar.', true, '2024-01-13 09:15:00'),
('cumpleaños', 'Felicidades María González', 'Celebramos el cumpleaños de nuestra líder comunitaria. ¡Muchas bendiciones!', true, '2024-01-12 14:20:00'),
('noticia', 'Taller de emprendimiento', 'Próximo taller gratuito: "Marketing digital para negocios locales". Inscripciones abiertas.', false, '2024-01-11 11:00:00'); -- Este no aparecerá (estado false)

-- 2. Insertar tribus de prueba (usando aniversario en lugar de fecha_creacion para visualización)
INSERT INTO tribus (nombre, estado, vision, vidas, grito, url_foto, aniversario, fecha_creacion) VALUES
('102 Ikimunay', 'Graduada', 'Ser la tribu más unida y emprendedora de Pasto, dejando huella en cada proyecto que emprendemos.', 42, '¡Ikimunay, fuerza y unión! Juntos llegamos más lejos.', 'https://images.unsplash.com/photo-1551836026-d5c2a2c49c41?w=400&h=400&fit=crop', '2023-06-15', NOW()),
('Águilas Doradas', 'Activa', 'Volamos alto para alcanzar nuestras metas, apoyándonos mutuamente en cada desafío.', 28, '¡Con las alas extendidas, tocamos el cielo!', 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop', '2023-08-22', NOW()),
('Guerreros del Sol', 'En formación', 'Aprovechamos cada rayo de luz para crecer y brillar en nuestra comunidad.', 15, '¡Calor, fuerza y perseverancia!', NULL, '2023-11-10', NOW()),
('Semillas del Futuro', 'Activa', 'Plantamos hoy lo que cosecharemos mañana, con paciencia y dedicación constante.', 33, '¡De pequeñas semillas crecen grandes bosques!', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w-400&h=400&fit=crop', '2023-09-05', NOW());

-- 3. Verificar datos
SELECT 'anuncios' as tabla, COUNT(*) as total FROM anuncios
UNION ALL
SELECT 'tribus' as tabla, COUNT(*) as total FROM tribus;

-- Nota: Los anuncios con estado = false no se mostrarán en el frontend
-- La tribu "102 Ikimunay" aparecerá con el badge especial "Mi Tribu"