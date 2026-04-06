require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const { Pool } = require('pg');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Security and middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

// CORS configuration - dynamic based on environment
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173', // Vite dev server
      'http://localhost:3000', // React dev server
      'https://celider-directorio.vercel.app', // Example production frontend
      'https://celider.com', // Main domain
      'https://linktreecelider.netlify.app', // Netlify frontend
      'https://*.netlify.app', // All Netlify subdomains
      process.env.FRONTEND_URL // From environment variable
    ].filter(Boolean); // Remove undefined values
    
    // También permitir cualquier origen en desarrollo
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    // En producción, verificar contra la lista
    if (allowedOrigins.some(allowedOrigin => {
      // Si el origen permitido tiene un wildcard
      if (allowedOrigin.includes('*')) {
        const regex = new RegExp('^' + allowedOrigin.replace('*', '.*') + '$');
        return regex.test(origin);
      }
      return allowedOrigin === origin;
    })) {
      console.log(`✅ CORS allowed for origin: ${origin}`);
      callback(null, true);
    } else {
      console.warn(`❌ CORS blocked origin: ${origin}. Allowed:`, allowedOrigins);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err.message);
  } else {
    console.log('✅ Connected to PostgreSQL database');
    release();
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Celider API is running',
    timestamp: new Date().toISOString(),
    database: 'connected',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Get all emprendimientos
app.get('/api/emprendimientos', async (req, res) => {
  try {
    console.log('📥 Fetching all emprendimientos...');
    
    // SQL CORREGIDO: Usando nombres reales de tu tabla en Neon
    const query = `
      SELECT 
        id,
        nombre,
        descripcion,
        categoria,
        estado,
        url_foto,
        whatsapp,
        instagram,
        facebook,
        tiktok,
        telegram,
        created_at
      FROM emprendimientos
      WHERE estado = true
      ORDER BY id ASC
    `;
    
    const result = await pool.query(query);
    
    console.log(`✅ Found ${result.rows.length} emprendimientos`);
    
    // Add cache header for this endpoint (5 minutes)
    res.set('Cache-Control', 'public, max-age=300');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching emprendimientos:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Get emprendimientos by category
app.get('/api/emprendimientos/categoria/:categoria', async (req, res) => {
  try {
    const { categoria } = req.params;
    
    console.log(`📥 Fetching emprendimientos for category: ${categoria}`);
    
    const query = `
      SELECT 
        id,
        nombre,
        descripcion,
        categoria,
        estado,
        url_foto,
        whatsapp,
        instagram,
        facebook,
        tiktok,
        telegram,
        created_at
      FROM emprendimientos
      WHERE categoria = $1 AND estado = true
      ORDER BY id ASC
    `;
    
    const result = await pool.query(query, [categoria]);
    
    console.log(`✅ Found ${result.rows.length} emprendimientos for category ${categoria}`);
    
    res.set('Cache-Control', 'public, max-age=300');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching emprendimientos by category:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Search emprendimientos
app.get('/api/emprendimientos/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.status(400).json({
        error: 'Bad request',
        message: 'Search query is required',
        timestamp: new Date().toISOString()
      });
    }
    
    console.log(`🔍 Searching emprendimientos for: "${q}"`);
    
    // SQL CORREGIDO: Usando nombres reales de tu tabla en Neon
    const query = `
      SELECT 
        id,
        nombre,
        descripcion,
        categoria,
        estado,      
        url_foto,    
        whatsapp,
        instagram,
        facebook,
        tiktok,      
        telegram,    
        created_at
      FROM emprendimientos
      WHERE (nombre ILIKE $1 OR descripcion ILIKE $1 OR categoria ILIKE $1)
        AND estado = true
      ORDER BY id ASC
    `;
    
    const searchTerm = `%${q}%`;
    const result = await pool.query(query, [searchTerm]);
    
    console.log(`✅ Found ${result.rows.length} results for search: "${q}"`);
    
    res.set('Cache-Control', 'public, max-age=300');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('❌ Error searching emprendimientos:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Get emprendimiento by ID
app.get('/api/emprendimientos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log(`📥 Fetching emprendimiento with ID: ${id}`);
    
    // SQL CORREGIDO: Nombres de columna reales y limpieza de campos inexistentes
    const query = `
      SELECT 
        id,
        nombre,
        descripcion,
        categoria,
        estado,
        url_foto,
        whatsapp,
        instagram,
        facebook,
        tiktok,
        telegram,
        created_at
      FROM emprendimientos
      WHERE id = $1 AND estado = true
    `;
    
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Not found',
        message: `Emprendimiento with ID ${id} not found`,
        timestamp: new Date().toISOString()
      });
    }
    
    console.log(`✅ Found emprendimiento: ${result.rows[0].nombre}`);
    
    res.set('Cache-Control', 'public, max-age=300');
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error fetching emprendimiento by ID:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Get categories
app.get('/api/categorias', async (req, res) => {
  try {
    console.log('📥 Fetching categories...');
    
    const query = `
      SELECT DISTINCT categoria 
      FROM emprendimientos 
      WHERE estado = true 
      ORDER BY categoria ASC
    `;
    
    const result = await pool.query(query);
    
    const categories = result.rows.map(row => row.categoria);
    
    console.log(`✅ Found ${categories.length} categories`);
    
    res.set('Cache-Control', 'public, max-age=300');
    res.status(200).json(categories);
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Get all anuncios
app.get('/api/anuncios', async (req, res) => {
  try {
    console.log('📥 Fetching all anuncios...');
    
    const query = `
      SELECT 
        id,
        tipo,
        titulo,
        contenido,
        estado,
        fecha_publicacion
      FROM anuncios
      ORDER BY fecha_publicacion DESC
    `;
    
    const result = await pool.query(query);
    
    console.log(`✅ Found ${result.rows.length} anuncios`);
    
    res.set('Cache-Control', 'public, max-age=300');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching anuncios:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Get all tribus
app.get('/api/tribus', async (req, res) => {
  try {
    console.log('📥 Fetching all tribus...');
    
    const query = `
      SELECT 
        id,
        nombre,
        estado,
        vision,
        vidas,
        grito,
        url_foto,
        aniversario,
        fecha_creacion
      FROM tribus
      ORDER BY nombre ASC
    `;
    
    const result = await pool.query(query);
    
    console.log(`✅ Found ${result.rows.length} tribus`);
    
    res.set('Cache-Control', 'public, max-age=300');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching tribus:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});



// Create new emprendimiento (POST endpoint)
app.post('/api/emprendimientos', async (req, res) => {
  try {
    console.log('📝 Creating new emprendimiento...');
    
    const {
      nombre,
      descripcion,
      categoria,
      url_foto,
      whatsapp,
      instagram,
      facebook,
      tiktok,
      telegram
    } = req.body;
    
    // Validation: required fields
    if (!nombre || !categoria) {
      return res.status(400).json({
        error: 'Bad request',
        message: 'Nombre and categoria are required',
        timestamp: new Date().toISOString()
      });
    }
    
    // Default estado to false (pending approval)
    const estado = false;
    
    const query = `
      INSERT INTO emprendimientos 
      (nombre, descripcion, categoria, estado, url_foto, whatsapp, instagram, facebook, tiktok, telegram, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
      RETURNING id, nombre, categoria, estado, created_at
    `;
    
    const values = [
      nombre,
      descripcion || '',
      categoria,
      estado,
      url_foto || '',
      whatsapp || '',
      instagram || '',
      facebook || '',
      tiktok || '',
      telegram || ''
    ];
    
    const result = await pool.query(query, values);
    
    console.log(`✅ Created new emprendimiento: ${nombre} (ID: ${result.rows[0].id})`);
    
    res.status(201).json({
      success: true,
      message: 'Emprendimiento submitted for approval',
      data: result.rows[0],
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error creating emprendimiento:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('🔥 Global error handler:', err);
  
  res.status(err.status || 500).json({
    error: err.name || 'Internal server error',
    message: err.message || 'Something went wrong',
    timestamp: new Date().toISOString(),
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
  🚀 Celider API Server Started!
  ⚡ Port: ${PORT}
  📅 ${new Date().toLocaleString()}
  🌐 Environment: ${process.env.NODE_ENV || 'development'}
  🔗 Health check: http://localhost:${PORT}/api/health
  📊 Emprendimientos: http://localhost:${PORT}/api/emprendimientos
  `);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Closing server...');
  pool.end(() => {
    console.log('Database pool closed');
    process.exit(0);
  });
});

module.exports = app;