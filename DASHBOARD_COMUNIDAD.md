# Dashboard de Comunidad Celider - Documentación

## 🚀 Evolución Completada

Has transformado exitosamente tu aplicación de un simple directorio a un **Dashboard de Comunidad completo** con navegación por pestañas.

## 📁 Estructura de Componentes

### Frontend (`frontend/src/`)
```
src/
├── components/
│   ├── Tabs.jsx              # Navegación por pestañas
│   ├── TablonAnuncios.jsx    # Tablón de anuncios (prioridad)
│   ├── Tribus.jsx            # Cards de tribus
│   ├── Directorio.jsx        # Directorio original (refactorizado)
│   ├── SearchBar.jsx         # Buscador (mantenido)
│   ├── CategoryFilter.jsx    # Filtro categorías (mantenido)
│   ├── EmprendimientoCard.jsx # Card emprendimiento (mantenido)
│   ├── Footer.jsx            # Footer (mantenido)
│   └── ScrollToTop.jsx       # Botón scroll (mantenido)
└── App.jsx                   # App principal rediseñada
```

### Backend (`backend/`)
- `server.js` - API extendida con nuevos endpoints

## 🗄️ Modelos de Datos (PostgreSQL Neon)

### Tabla `anuncios`
```sql
CREATE TABLE anuncios (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) CHECK (tipo IN ('logro', 'ayuda', 'cumpleaños', 'noticia')),
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT,
    estado BOOLEAN DEFAULT false,
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla `tribus`
```sql
CREATE TABLE tribus (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    estado VARCHAR(100) DEFAULT 'Activa',
    vision TEXT,
    vidas INTEGER DEFAULT 0,
    grito TEXT,
    url_foto TEXT,
    aniversario DATE, -- Fecha que se muestra a los usuarios (ej: fecha de fundación)
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Solo para registro interno
);
```

**Nota**: El campo `aniversario` es la fecha que se muestra a los usuarios, mientras que `fecha_creacion` es solo para registro interno.

## 🌐 Endpoints de la API

### GET `/api/anuncios`
- **Descripción**: Obtiene todos los anuncios
- **Respuesta**: Array de objetos anuncio
- **Cache**: 5 minutos
- **Filtro frontend**: Solo muestra `estado === true`

### GET `/api/tribus`
- **Descripción**: Obtiene todas las tribus
- **Respuesta**: Array de objetos tribu
- **Cache**: 5 minutos
- **Característica especial**: Badge "Mi Tribu" para "102 Ikimunay"

### Mantenidos (existentes):
- `GET /api/emprendimientos`
- `GET /api/emprendimientos/categoria/:categoria`
- `GET /api/emprendimientos/search?q=`
- `GET /api/emprendimientos/:id`
- `GET /api/categorias`
- `POST /api/emprendimientos` (nuevo para formularios futuros)

## 🎨 Características de UI Implementadas

### 1. **Sistema de Pestañas (Tabs)**
- Estado React con `useState`
- Diseño responsivo (mobile-first)
- Iconos diferenciados por sección
- Efectos visuales al activar

### 2. **Tablón de Anuncios**
- Íconos según tipo:
  - 🏆 `logro` → Trophy (amarillo)
  - ❤️ `ayuda` → Heart (rojo)
  - 🎂 `cumpleaños` → Cake (rosa)
  - 📢 `noticia` → Megaphone (azul)
- Badges coloridos por categoría
- Fechas formateadas (es-ES)
- Solo muestra anuncios activos (`estado = true`)

### 3. **Tribus**
- Cards con foto de perfil
- Badge de estado (Graduada/Activa/En formación)
- Contador de "vidas" destacado
- Botón "¡Escuchar Grito!" con modal
- **Característica especial**: 
  - Tribu "102 Ikimunay" tiene borde brillante
  - Badge "Mi Tribu" con estrella

### 4. **Directorio (Original)**
- Refactorizado como componente independiente
- Mantiene búsqueda, filtros y caché
- Integrado en el sistema de pestañas

### 5. **Skeletons de Carga**
- **Tablón de Anuncios**: Grid de cards esqueleto con animación pulse
- **Tribus**: Cards con foto, visión, vidas y aniversario en skeleton
- **Directorio**: Filtros, buscador y cards de emprendimientos con skeleton
- **Animaciones**: Efecto pulse suave con opacidades graduadas
- **Responsive**: Skeletons adaptados a todos los breakpoints

### 6. **Diseño Responsivo**
- Mobile-first con Tailwind
- Grid adaptable (1 col mobile, 2 tablet, 3 desktop)
- Textos y paddings ajustables por breakpoint
- Touch-friendly buttons

## 🔧 Configuración Técnica

### Frontend (Netlify)
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS 3.3
- **Icons**: Lucide React
- **Build**: Code splitting, lazy loading
- **Cache**: localStorage (10 minutos)

### Backend (Render)
- **Runtime**: Node.js + Express
- **Database**: PostgreSQL (Neon)
- **CORS**: Configurado para producción/desarrollo
- **Cache**: Headers HTTP (5 minutos)
- **Security**: Helmet, morgan logs

## 🚀 Instrucciones de Despliegue

### 1. **Base de Datos (Neon)**
- Verificar que las tablas `anuncios` y `tribus` existan
- Estructura exacta como se definió arriba
- Insertar datos de prueba si es necesario

### 2. **Backend (Render)**
```bash
cd backend
npm install
npm start
```
- Variables de entorno requeridas:
  - `DATABASE_URL` (URL de conexión Neon)
  - `NODE_ENV` (production/development)
  - `FRONTEND_URL` (URL del frontend en Netlify)

### 3. **Frontend (Netlify)**
```bash
cd frontend
npm install
npm run build
```
- Build command: `npm run build`
- Publish directory: `dist`
- Variables de entorno:
  - `VITE_API_BASE_URL` (URL del backend en Render)

## 📱 Vista Móvil Optimizada

### Breakpoints:
- **< 640px**: 1 columna, paddings reducidos
- **640px-1024px**: 2 columnas
- **> 1024px**: 3 columnas

### Elementos táctiles:
- Botones grandes (>44px)
- Espaciado adecuado entre elementos
- Gestos suaves (scroll, tap)

## 🎯 Características Especiales Implementadas

### Prioridad de Anuncios
- La pestaña "Tablón de Anuncios" es la predeterminada
- Solo anuncios con `estado = true` son visibles
- Ordenados por fecha más reciente primero

### Tribu Especial "102 Ikimunay"
- Borde brillante con gradiente
- Badge "Mi Tribu" con estrella
- Destacado visualmente

### Gestión de Estados
- Loading skeletons
- Mensajes de error amigables
- Estados vacíos con CTAs
- Reintento automático

## 🔄 Flujo de Datos

```
Base de Datos Neon (PostgreSQL)
        ↓
Backend Express (Render)
        ↓ (REST API)
Frontend React (Netlify)
        ↓ (Estado React)
UI Components (Tabs)
```

## 📊 Rendimiento Optimizado

### Frontend:
- Lazy loading de componentes
- Bundle splitting (vendor, icons, utils)
- Critical CSS inlined
- Image lazy loading
- Cache localStorage

### Backend:
- Pool de conexiones PostgreSQL
- Cache headers HTTP
- Compresión gzip (pendiente)
- Logging estructurado

## 🐛 Solución de Problemas

### Los anuncios no aparecen:
1. Verificar que `estado = true` en la BD
2. Revisar console.log del backend
3. Verificar conexión a la API

### Las tribus no cargan:
1. Verificar estructura de tabla `tribus`
2. Revisar nombres de columnas
3. Probar endpoint `/api/tribus` directamente

### Pestañas no funcionan en móvil:
1. Verificar viewport meta tag
2. Probar touch events
3. Revisar media queries

## 🔮 Próximas Mejoras Potenciales

1. **Formulario de envío** para nuevos emprendimientos
2. **Panel de administración** para aprobar anuncios
3. **Sistema de autenticación** para líderes
4. **Notificaciones push** para anuncios importantes
5. **Búsqueda global** en todas las secciones
6. **Exportar datos** (CSV/PDF)
7. **Modo offline** con Service Workers
8. **Analytics** integrado

## 📞 Soporte

- **Frontend**: React, Tailwind, Vite
- **Backend**: Node.js, Express, PostgreSQL
- **Hosting**: Netlify (frontend), Render (backend)
- **Database**: Neon (PostgreSQL serverless)

¡Tu Dashboard de Comunidad está listo para conectar a los líderes de Pasto! 🎉

**Nota**: Recuerda actualizar las variables de entorno en ambos entornos de despliegue y verificar que las tablas existan en Neon con la estructura exacta definida.