# Solución de Errores en Netlify - Tablón de Anuncios y Tribus

## 🚨 Problema
Las pestañas "Tablón de Anuncios" y "Tribus" muestran errores en Netlify, pero "Linktree" (antes Directorio) funciona correctamente.

## 🔍 Posibles Causas

### 1. **Base de Datos (Neon) - Tablas Faltantes**
Los endpoints `/api/anuncios` y `/api/tribus` requieren que las tablas existan en PostgreSQL.

#### Verificación:
```sql
-- Conéctate a tu base de datos Neon y ejecuta:
SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'anuncios');
SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'tribus');
```

#### Solución:
Ejecuta el script de creación de tablas:
```sql
-- Tabla anuncios
CREATE TABLE anuncios (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) CHECK (tipo IN ('logro', 'ayuda', 'cumpleaños', 'noticia')),
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT,
    estado BOOLEAN DEFAULT false,
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla tribus
CREATE TABLE tribus (
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
```

### 2. **Backend (Render) - Variables de Entorno**
Verifica que el backend en Render tenga configuradas:

#### Variables REQUERIDAS:
1. `DATABASE_URL` - URL de conexión a Neon PostgreSQL
2. `NODE_ENV` - Debe ser `production`
3. `FRONTEND_URL` - URL de tu sitio en Netlify (ej: `https://tu-sitio.netlify.app`)

#### Cómo verificar en Render:
1. Ve a tu dashboard de Render
2. Selecciona el servicio "celider-backend"
3. Haz click en "Environment"
4. Verifica que todas las variables estén configuradas

### 3. **Frontend (Netlify) - Variables de Entorno**
Verifica que Netlify tenga la variable correcta:

#### Variable REQUERIDA:
- `VITE_API_BASE_URL` - URL de tu backend en Render (ej: `https://linktreecelider.onrender.com`)

#### Cómo configurar en Netlify:
1. Ve a tu sitio en Netlify Dashboard
2. Click en "Site settings"
3. Click en "Environment variables"
4. Agrega: `VITE_API_BASE_URL` = `https://linktreecelider.onrender.com`

### 4. **CORS Configuration (Backend)**
El backend debe permitir tu dominio de Netlify.

#### Verifica en `backend/server.js`:
```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://celider-directorio.vercel.app',
  'https://celider.com',
  process.env.FRONTEND_URL // ← Debe incluir tu URL de Netlify
];
```

### 5. **Logs de Error - Cómo Depurar**

#### Backend (Render):
1. Ve a tu servicio en Render
2. Click en "Logs"
3. Busca errores relacionados con:
   - Conexión a PostgreSQL
   - Queries SQL
   - CORS errors

#### Frontend (Netlify):
1. Ve a tu sitio en Netlify
2. Click en "Deploys"
3. Selecciona el último deploy
4. Click en "Preview" y abre la consola del navegador (F12)
5. Verifica errores en la pestaña "Console" y "Network"

### 6. **Prueba Directa de los Endpoints**

#### Endpoints a probar:
1. **Health Check**: `https://linktreecelider.onrender.com/api/health`
2. **Anuncios**: `https://linktreecelider.onrender.com/api/anuncios`
3. **Tribus**: `https://linktreecelider.onrender.com/api/tribus`
4. **Emprendimientos**: `https://linktreecelider.onrender.com/api/emprendimientos`

#### Cómo probar:
```bash
# Con curl o en el navegador
curl https://linktreecelider.onrender.com/api/anuncios
curl https://linktreecelider.onrender.com/api/tribus
```

### 7. **Cache Issues**

#### Limpia caché:
1. **Netlify**: Ve a "Deploys" y haz un nuevo deploy
2. **Navegador**: Ctrl+F5 (hard reload)
3. **LocalStorage**: Los datos cacheados podrían estar corruptos

### 8. **Código de Estado HTTP**

#### Errores comunes:
- **404**: Endpoint no existe
- **500**: Error interno del servidor
- **503**: Servicio no disponible
- **CORS errors**: Problemas de origen

## 🛠️ Pasos de Solución Rápidos

### Paso 1: Verifica las tablas en Neon
```sql
-- Ejecuta en Neon
\dt
-- Deberías ver: anuncios, tribus, emprendimientos
```

### Paso 2: Inserta datos de prueba
```sql
-- Usa el archivo backend/seed_example.sql
-- O ejecuta:
INSERT INTO anuncios (tipo, titulo, contenido, estado) VALUES 
('noticia', 'Test', 'Contenido de prueba', true);
```

### Paso 3: Revisa logs en Render
```
# Busca estos mensajes:
✅ Found X anuncios
✅ Found X tribus
❌ Error fetching anuncios
```

### Paso 4: Actualiza variables de entorno
- **Render**: Asegúrate de que `FRONTEND_URL` tenga tu dominio Netlify
- **Netlify**: Asegúrate de que `VITE_API_BASE_URL` tenga la URL de Render

### Paso 5: Re-deploy
1. Haz commit y push de cualquier cambio
2. Espera a que Render y Netlify hagan deploy automático
3. Verifica nuevamente

## 📞 Soporte Adicional

### Si los errores persisten:
1. **Comparte los logs** de Render y Netlify
2. **Proporciona las URLs** de tu backend y frontend
3. **Menciona los mensajes de error** exactos de la consola del navegador

### Recursos:
- **Backend**: `https://linktreecelider.onrender.com`
- **Frontend**: `https://tu-sitio.netlify.app`
- **Base de datos**: Neon PostgreSQL

## ✅ Cambios Realizados Recientemente

1. **Renombrado**: "Directorio" → "Linktree" en la interfaz
2. **Orden**: Emprendimientos ahora se ordenan por `id ASC` (orden de inserción)
3. **Skeletons**: Implementados para mejor UX de carga
4. **Tribu especial**: Eliminado el badge "Mi Tribu" para "102 Ikimunay"

## 🔄 Flujo de Datos Verificado

```
Netlify (Frontend) → Render (Backend) → Neon (PostgreSQL)
    ↓                       ↓                    ↓
   React               Express.js           Tablas:
    ↓                       ↓              - anuncios
Componentes           Endpoints:           - tribus
- Linktree            - /api/anuncios      - emprendimientos
- TablonAnuncios      - /api/tribus
- Tribus              - /api/emprendimientos
```

¡Con estos pasos deberías resolver los errores! 🚀