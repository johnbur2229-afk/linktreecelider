import { useState, useEffect } from 'react';
import { Users, Heart, Target, Calendar, Volume2, Award } from 'lucide-react';

const Tribus = () => {
  const [tribus, setTribus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGrito, setSelectedGrito] = useState(null);

  const API_BASE_URL = import.meta.env.PROD 
    ? 'https://linktreecelider.onrender.com'
    : 'http://localhost:3001';

  const fetchTribus = async () => {
    try {
      setLoading(true);
      const url = `${API_BASE_URL}/api/tribus`;
      console.log(`🔄 Fetching tribus from: ${url}`);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${response.statusText}. ${errorText}`);
      }
      
      const data = await response.json();
      console.log(`✅ Received ${data.length} tribus from API`);
      
      setTribus(data);
      setError(null);
    } catch (err) {
      console.error('❌ Error fetching tribus:', err);
      setError(`No se pudieron cargar las tribus. Detalles: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTribus();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleShowGrito = (grito) => {
    setSelectedGrito(grito);
  };

  const closeGritoModal = () => {
    setSelectedGrito(null);
  };

  const getEstadoColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'graduada':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'activa':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'en formación':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-8 w-48 bg-white/10 rounded-lg mb-2 animate-pulse"></div>
            <div className="h-4 w-64 bg-white/5 rounded"></div>
          </div>
          <div className="h-10 w-20 bg-white/10 rounded-full animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-[1.5rem] p-6 animate-pulse">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-white/10"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 w-32 bg-white/10 rounded"></div>
                  <div className="h-4 w-24 bg-white/5 rounded"></div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 bg-white/10 rounded"></div>
                  <div className="h-4 w-20 bg-white/10 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-white/5 rounded"></div>
                  <div className="h-3 w-4/5 bg-white/5 rounded"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                  <div className="h-4 w-16 bg-white/10 rounded mx-auto mb-2"></div>
                  <div className="h-8 w-12 bg-white/10 rounded mx-auto"></div>
                </div>
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                  <div className="h-4 w-20 bg-white/10 rounded mx-auto mb-2"></div>
                  <div className="h-8 w-24 bg-white/10 rounded mx-auto"></div>
                </div>
              </div>
              
              <div className="h-12 w-full bg-white/10 rounded-xl mb-4"></div>
              
              <div className="h-4 w-16 bg-white/5 rounded mx-auto"></div>
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
          <Award className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Error al cargar tribus</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <div className="space-y-3">
            <button
              onClick={fetchTribus}
              className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white font-bold rounded-xl hover:opacity-90 transition-all"
            >
              Reintentar conexión
            </button>
            <div className="text-center">
              <p className="text-xs text-gray-500">
                URL de API: {API_BASE_URL}/api/tribus
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

  if (tribus.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-12 rounded-[2rem] max-w-md mx-auto">
          <Users className="w-16 h-16 text-gray-500 mx-auto mb-6" />
          <h3 className="text-xl font-bold text-white mb-2">No hay tribus registradas</h3>
          <p className="text-gray-400">Pronto se crearán las primeras tribus de la comunidad.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Tribus de la Comunidad</h2>
          <p className="text-gray-400">Agrupaciones que marcan la diferencia</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.05] rounded-full">
          <Users className="w-4 h-4 text-primary-500" />
          <span className="text-sm font-bold text-white">{tribus.length}</span>
        </div>
      </div>

      {/* Modal para mostrar el grito */}
      {selectedGrito && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-white/20 rounded-[2rem] p-8 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Volume2 className="w-6 h-6 text-primary-500" />
                <h3 className="text-xl font-bold text-white">¡Grito de la Tribu!</h3>
              </div>
              <button
                onClick={closeGritoModal}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <span className="text-2xl text-gray-400">×</span>
              </button>
            </div>
            <div className="bg-white/[0.05] border border-white/10 rounded-xl p-6 mb-6">
              <p className="text-gray-200 text-lg leading-relaxed whitespace-pre-line text-center font-medium italic">
                "{selectedGrito}"
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeGritoModal}
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-cyan-600 text-white font-bold rounded-xl hover:opacity-90 transition-all"
              >
                ¡Vamos!
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tribus.map((tribu) => (
            <div
              key={tribu.id}
              className="bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-[1.5rem] p-6 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 group relative"
            >

              {/* Header con foto y nombre */}
              <div className="flex items-center gap-4 mb-6">
                {tribu.url_foto ? (
                  <img
                    src={tribu.url_foto}
                    alt={tribu.nombre}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-600 to-cyan-600 flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary-300 transition-colors">
                    {tribu.nombre}
                  </h3>
                  <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border mt-2 inline-block ${getEstadoColor(tribu.estado)}`}>
                    {tribu.estado || 'Sin estado'}
                  </span>
                </div>
              </div>

              {/* Visión */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-primary-500" />
                  <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Visión</h4>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {tribu.vision || 'Sin visión definida'}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-xs text-gray-400 uppercase font-bold">Vidas</span>
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {tribu.vidas || 0}
                  </div>
                </div>
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-primary-500" />
                    <span className="text-xs text-gray-400 uppercase font-bold">Aniversario</span>
                  </div>
                  <div className="text-xl font-black text-white tracking-tighter">
                    {formatDate(tribu.aniversario)}
                  </div>
                </div>
              </div>

              {/* Botón del grito */}
              {tribu.grito && (
                <button
                  onClick={() => handleShowGrito(tribu.grito)}
                  className="w-full py-3 bg-gradient-to-r from-primary-500/20 to-cyan-500/20 border border-primary-500/30 text-primary-300 font-bold rounded-xl hover:from-primary-500/30 hover:to-cyan-500/30 hover:border-primary-500/50 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                  <Volume2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                  <span>¡Escuchar Grito!</span>
                </button>
              )}

              {/* Footer (comentario) */}
              {/* <div className="mt-6 pt-4 border-t border-white/5 text-center">
                <span className="text-xs text-gray-500 font-mono">
                  ID: #{tribu.id.toString().padStart(3, '0')}
                </span>
              </div> */}
            </div>
        ))}
      </div>
    </div>
  );
};

export default Tribus;