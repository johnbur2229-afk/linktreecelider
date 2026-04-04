# 🚀 Celider Directorio - FullStack LinkTree para Emprendimientos

![Celider Banner](https://img.shields.io/badge/Celider-Directorio-blueviolet)
![React](https://img.shields.io/badge/React-18.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-18-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC)

Una aplicación fullstack moderna para crear un directorio de emprendimientos con búsqueda en tiempo real, filtros por categoría y visualización de redes sociales.

## ✨ Características Principales

### 🎨 Frontend (React + Vite + Tailwind CSS)
- ✅ Diseño moderno mobile-first con gradientes azul-púrpura
- ✅ Buscador funcional en tiempo real por nombre
- ✅ Filtros por categoría con botones de colores personalizados
- ✅ Componente `EmprendimientoCard` con foto circular
- ✅ Iconos de redes sociales que solo se muestran si existen en DB
- ✅ Animaciones fade-in y efectos hover
- ✅ Footer personalizado con enlaces a creadores
- ✅ Totalmente responsive (mobile, tablet, desktop)

### ⚙️ Backend (Node.js + Express + PostgreSQL Neon)
- ✅ API REST con Express
- ✅ Conexión a PostgreSQL en Neon
- ✅ Configuración de CORS dinámica
- ✅ Manejo de errores con logs detallados
- ✅ Optimizado para Render.com
- ✅ Endpoints para búsqueda, filtrado y categorías

## 🏗️ Estructura del Proyecto

```
celider-directorio/
├── frontend/                 # Aplicación React
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   │   ├── SearchBar.jsx
│   │   │   ├── CategoryFilter.jsx
│   │   │   ├── EmprendimientoCard.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── utils/           # Utilidades
│   │   │   └── categoryColors.js
│   │   ├── App.jsx          # Componente principal
│   │   ├── main.jsx         # Punto de entrada
│   │   └── index.css        # Estilos globales
│   ├── public/              # Archivos estáticos
│   ├── index.html           # HTML principal
│   ├── package.json         # Dependencias
│   ├── vite.config.js       # Configuración Vite
│   ├── tailwind.config.js   # Configuración Tailwind
│   └── postcss.config.js    # Configuración PostCSS
├── backend/                 # API Node.js
│   ├── server.js            # Servidor principal
│   └── package.json         # Dependencias
├── .gitignore              # Archivos ignorados
├── DEVELOPMENT.md          # Instrucciones de desarrollo
├── env-config-example.md   # Configuración de variables
├── SOLUCION_PROBLEMAS.md   # Guía de solución de problemas
├── test-connection.html    # Página para probar conexión
└── README.md              # Este archivo
```

## 🚀 Comenzando

### Prerrequisitos
- Node.js 18 o superior
- npm, yarn o pnpm
- Cuenta en [Neon.tech](https://neon.tech) (PostgreSQL serverless)
- Git

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repo-url>
   cd celider-directorio
   ```

2. **Configurar Backend**
   ```bash
   cd backend
   npm install
   cp env-config-example.md .env
   # Editar .env con tus credenciales de Neon
   ```

3. **Configurar Frontend**
   ```bash
   cd ../frontend
   npm install
   echo "VITE_API_URL=http://localhost:3001/api" > .env
   ```

4. **Ejecutar en Desarrollo**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

5. **Abrir en el navegador**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001/api/health
   - Test de conexión: http://localhost:5173/test-connection.html

## 🌐 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/health` | Verifica el estado del servidor |
| GET | `/api/emprendimientos` | Obtiene todos los emprendimientos |
| GET | `/api/emprendimientos/:id` | Obtiene un emprendimiento por ID |
| GET | `/api/emprendimientos/categoria/:categoria` | Filtra por categoría |
| GET | `/api/emprendimientos/search?q=texto` | Busca emprendimientos |
| GET | `/api/categorias` | Obtiene todas las categorías |

## 🎨 Paleta de Colores

| Color | Uso | Código |
|-------|-----|--------|
| Azul Primario | Gradientes, botones | `#3b82f6` → `#1e3a8a` |
| Púrpura | Gradientes, acentos | `#8b5cf6` → `#7c3aed` |
| Gris Claro | Fondos, textos secundarios | `#64748b` → `#0f172a` |
| Categorías | Badges personalizados por categoría | Ver `categoryColors.js` |

## 📱 Categorías Soportadas

- Tecnología 💻
- Moda 👗
- Comida 🍕
- Servicios 💼
- Educación 🎓
- Salud 🏥
- Arte 🎨
- Deportes ⚽

## 🔧 Características Técnicas

### Frontend
- **React 18** con Hooks y Functional Components
- **Vite** para build rápido y hot reload
- **Tailwind CSS 3** para estilos utilitarios
- **Lucide React** para iconos
- **Glassmorphism** y efectos modernos
- **Responsive Design** mobile-first
- **Accessibility** (ARIA labels, contraste)

### Backend
- **Express.js** con middleware moderno
- **PostgreSQL Neon** serverless
- **CORS dinámico** por entorno
- **Logging** con Morgan
- **Seguridad** con Helmet
- **Error handling** estructurado

## 🗄️ Base de Datos

La aplicación utiliza una tabla `emprendimientos` con los siguientes campos:

```sql
id SERIAL PRIMARY KEY
nombre VARCHAR(255)
descripcion TEXT
categoria VARCHAR(100)
imagen_url TEXT
whatsapp VARCHAR(20)
instagram VARCHAR(255)
facebook VARCHAR(255)
twitter VARCHAR(255)
linkedin VARCHAR(255)
youtube VARCHAR(255)
sitio_web TEXT
email VARCHAR(255)
telefono VARCHAR(20)
ubicacion VARCHAR(255)
activo BOOLEAN DEFAULT true
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

## 🚀 Despliegue

### Backend en Render.com
1. Crear nuevo Web Service
2. Conectar repositorio de GitHub
3. Configurar variables de entorno
4. Usar `npm start` como comando de inicio
5. Configurar PostgreSQL add-on o Neon

### Frontend en Vercel
1. Importar proyecto desde GitHub
2. Configurar build command: `npm run build`
3. Output directory: `dist`
4. Configurar `VITE_API_URL` con la URL del backend

### Base de Datos en Neon.tech
1. Crear nuevo proyecto en Neon
2. Obtener connection string
3. Configurar en variables de entorno del backend

## 🐛 Solución de Problemas

Consulta el archivo [SOLUCION_PROBLEMAS.md](SOLUCION_PROBLEMAS.md) para soluciones a problemas comunes como:

- Error de conexión a PostgreSQL
- Problemas de CORS
- Imágenes no cargan
- WhatsApp links no funcionan
- Aplicación lenta

## 🤝 Contribuir

1. Fork el repositorio
2. Crear una rama feature (`git checkout -b feature/amazing-feature`)
3. Commit cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abrir Pull Request

## 📞 Soporte

- **Comunidad Celider**: [Discord/Telegram]
- **Issues**: [GitHub Issues](https://github.com/tu-repo/issues)
- **Email**: soporte@celider.com

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Creadores

- **Marito Senior** - [TikTok](https://www.tiktok.com/@marioconcejo2)
- **Uno Senior** - [Portfolio](https://jburgosb.netlify.app/)

---

**Hecho con ❤️ para la comunidad emprendedora de Celider**