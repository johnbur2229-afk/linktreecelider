import { useState, useEffect } from 'react';
import { Megaphone, Cake, Heart, Trophy, AlertCircle, Bell } from 'lucide-react';

const TablonAnuncios = () => {
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.PROD 
    ? 'https://linktreecelider.onrender.com'
    : 'http://localhost:3001';

  const fetchAnuncios = async () => {
    try {
      setLoading(true);
      const url = `${API_BASE_URL}/api/anuncios`;
      console.log(`🔄 Fetching anuncios from: ${url}`);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${response.statusText}. ${errorText}`);
      }
      
      const data = await response.json();
      console.log(`✅ Received ${data.length} anuncios from API`);
      
      // Filtrar solo anuncios con estado true (activos)
      const anunciosActivos = data.filter(anuncio => anuncio.estado === true);
      console.log(`✅ Showing ${anunciosActivos.length} active anuncios`);
      
      setAnuncios(anunciosActivos);
      setError(null);
    } catch (err) {
      console.error('❌ Error fetching anuncios:', err);
      setError(`No se pudieron cargar los anuncios. Detalles: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnuncios();
  }, []);

  const getIconByType = (tipo) => {
    switch (tipo?.toLowerCase()) {
      case 'logro':
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 'ayuda':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'cumpleaños':
        return <Cake className="w-5 h-5 text-pink-500" />;
      case 'noticia':
        return <Megaphone className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getBadgeColor = (tipo) => {
    switch (tipo?.toLowerCase()) {
      case 'logro':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'ayuda':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'cumpleaños':
        return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
      case 'noticia':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-8 w-56 bg-white/10 rounded-lg mb-2 animate-pulse"></div>
            <div className="h-4 w-72 bg-white/5 rounded"></div>
          </div>
          <div className="h-10 w-20 bg-white/10 rounded-full animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-[1.5rem] p-6 animate-pulse">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10"></div>
                  <div className="h-6 w-20 bg-white/10 rounded-full"></div>
                </div>
                <div className="h-4 w-16 bg-white/10 rounded"></div>
              </div>
              
              <div className="h-6 w-48 bg-white/10 rounded mb-3"></div>
              
              <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 mb-4 space-y-2">
                <div className="h-3 w-full bg-white/5 rounded"></div>
                <div className="h-3 w-5/6 bg-white/5 rounded"></div>
                <div className="h-3 w-4/6 bg-white/5 rounded"></div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white/10 rounded-full"></div>
                  <div className="h-3 w-12 bg-white/10 rounded"></div>
                </div>
                <div className="h-3 w-10 bg-white/10 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <div className="bg-white/[0.03] backdrop-blur-xl border border-red-500/20 p-8 rounded-[2rem] max-w-md mx-auto">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Error al cargar anuncios</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <div className="space-y-3">
            <button
              onClick={fetchAnuncios}
              className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white font-bold rounded-xl hover:opacity-90 transition-all"
            >
              Reintentar conexión
            </button>
            <div className="text-center">
              <p className="text-xs text-gray-500">
                URL de API: {API_BASE_URL}/api/anuncios
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Verifica que el backend esté funcionando y las tablas existan.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (anuncios.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-12 rounded-[2rem] max-w-md mx-auto">
          <Megaphone className="w-16 h-16 text-gray-500 mx-auto mb-6" />
          <h3 className="text-xl font-bold text-white mb-2">Sin anuncios por ahora</h3>
          <p className="text-gray-400">No hay anuncios activos en este momento.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Tablón de Anuncios</h2>
          <p className="text-gray-400">Últimas novedades de la comunidad</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.05] rounded-full">
          <Bell className="w-4 h-4 text-primary-500" />
          <span className="text-sm font-bold text-white">{anuncios.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {anuncios.map((anuncio) => (
          <div
            key={anuncio.id}
            className="bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-[1.5rem] p-6 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/[0.1]">
                  {getIconByType(anuncio.tipo)}
                </div>
                <div>
                  <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${getBadgeColor(anuncio.tipo)}`}>
                    {anuncio.tipo || 'General'}
                  </span>
                </div>
              </div>
              <span className="text-xs text-gray-500 font-medium">
                {formatDate(anuncio.fecha_publicacion)}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors">
              {anuncio.titulo}
            </h3>
            
            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 mb-4">
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {anuncio.contenido}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">Activo</span>
              </div>
              <span className="text-xs text-gray-500 font-mono">
                #{anuncio.id.toString().padStart(3, '0')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablonAnuncios;