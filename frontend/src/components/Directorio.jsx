import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import { FiLoader } from 'react-icons/fi';

// Lazy load heavy components
const EmprendimientoCard = lazy(() => import('./EmprendimientoCard'));

const Directorio = () => {
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [filteredEmprendimientos, setFilteredEmprendimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const API_BASE_URL = import.meta.env.PROD 
    ? 'https://linktreecelider.onrender.com'
    : 'http://localhost:3001';
  
  const API_URL = `${API_BASE_URL}/api/emprendimientos`;

  const fetchEmprendimientos = async (forceRefresh = false) => {
    try {
      if (emprendimientos.length === 0) setLoading(true);
      
      // Intentar recuperar de caché local
      const cachedData = localStorage.getItem('celider_data_v1');
      const lastFetch = localStorage.getItem('celider_timestamp');
      const now = Date.now();
      const EXPIRE_TIME = 10 * 60 * 1000; // 10 minutos

      if (!forceRefresh && cachedData && lastFetch && (now - lastFetch < EXPIRE_TIME)) {
        const data = JSON.parse(cachedData);
        setEmprendimientos(data);
        setFilteredEmprendimientos(data);
        setLoading(false);
        return;
      }

      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`Error ${response.status}: Servidor fuera de línea`);
      
      const data = await response.json();
      setEmprendimientos(data);
      setFilteredEmprendimientos(data);
      localStorage.setItem('celider_data_v1', JSON.stringify(data));
      localStorage.setItem('celider_timestamp', Date.now().toString());
      setError(null);
    } catch (err) {
      const backupData = localStorage.getItem('celider_data_v1');
      if (backupData) {
        const data = JSON.parse(backupData);
        setEmprendimientos(data);
        setFilteredEmprendimientos(data);
        console.warn("Conexión fallida. Mostrando datos de respaldo.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmprendimientos();
  }, []);

  const categories = useMemo(() => {
    return ['all', ...new Set(emprendimientos.map(emp => emp.categoria))];
  }, [emprendimientos]);

  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();
    const filtered = emprendimientos.filter(emp => {
      const matchesSearch = 
        emp.nombre.toLowerCase().includes(term) || 
        emp.descripcion?.toLowerCase().includes(term);
      const matchesCategory = selectedCategory === 'all' || emp.categoria === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredEmprendimientos(filtered);
  }, [searchTerm, selectedCategory, emprendimientos]);

  if (loading && emprendimientos.length === 0) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-8 w-64 bg-white/10 rounded-lg mb-2 animate-pulse"></div>
            <div className="h-4 w-72 bg-white/5 rounded"></div>
          </div>
          <div className="h-10 w-24 bg-white/10 rounded-full animate-pulse"></div>
        </div>
        
        {/* Skeleton de filtros */}
        <div className="max-w-5xl mx-auto glassmorphism-dark p-6 md:p-8 rounded-[2rem] space-y-6">
          <div className="h-14 w-full bg-white/10 rounded-2xl animate-pulse"></div>
          <div className="h-px bg-white/10 w-full"></div>
          <div className="space-y-4">
            <div className="h-4 w-32 bg-white/10 rounded"></div>
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 w-24 bg-white/10 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Skeleton de cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2.5rem] p-6 animate-pulse">
              <div className="flex flex-col items-center text-center">
                <div className="mb-5 relative">
                  <div className="w-24 h-24 rounded-full bg-white/10"></div>
                </div>
                <div className="h-4 w-20 bg-white/10 rounded-full mb-2"></div>
                <div className="h-6 w-40 bg-white/10 rounded-full mb-3"></div>
                <div className="h-3 w-60 bg-white/10 rounded-full mb-8"></div>
                <div className="flex gap-4">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="w-11 h-11 rounded-full bg-white/10"></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error && emprendimientos.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="bg-white/[0.03] backdrop-blur-xl border border-red-500/20 p-10 rounded-[2.5rem] max-w-sm w-full text-center shadow-2xl">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">⚠️</div>
          <h2 className="text-xl font-bold text-white mb-2">Sin conexión</h2>
          <p className="text-gray-500 mb-8 text-sm">{error}</p>
          <button 
            onClick={() => fetchEmprendimientos(true)} 
            className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-600 text-white font-black rounded-2xl shadow-lg transition-all active:scale-95"
          >
            REINTENTAR
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Directorio de Emprendimientos</h2>
          <p className="text-gray-400">Conecta con negocios locales de Pasto</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.05] rounded-full">
          <span className="text-sm font-bold text-white">{filteredEmprendimientos.length}</span>
          <span className="text-gray-500 text-sm">emprendimientos</span>
        </div>
      </div>

      {/* Panel de Control: Buscador y Filtros */}
      <div className="max-w-5xl mx-auto glassmorphism-dark p-6 md:p-8 rounded-[2rem] space-y-6">
        <div className="w-full">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full"></div>
        <div className="w-full">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </div>

      {/* Resultados */}
      <div className="mt-12">
        {filteredEmprendimientos.length === 0 ? (
          <div className="text-center py-32 rounded-[3rem] bg-white/[0.01] border border-dashed border-white/10">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🏜️</div>
            <p className="text-gray-400 text-lg">No hay coincidencias.</p>
            <button 
              onClick={() => {setSearchTerm(''); setSelectedCategory('all')}} 
              className="mt-4 text-primary-400 font-bold hover:text-primary-300"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2.5rem] p-6 animate-pulse">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-5 relative">
                    <div className="w-24 h-24 rounded-full bg-white/10"></div>
                  </div>
                  <div className="h-4 w-20 bg-white/10 rounded-full mb-2"></div>
                  <div className="h-6 w-40 bg-white/10 rounded-full mb-3"></div>
                  <div className="h-3 w-60 bg-white/10 rounded-full mb-8"></div>
                  <div className="flex gap-4">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="w-11 h-11 rounded-full bg-white/10"></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEmprendimientos.map((emp, index) => (
                <EmprendimientoCard key={emp.id} emprendimiento={emp} index={index} />
              ))}
            </div>
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default Directorio;