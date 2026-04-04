import { useState, useEffect, useMemo } from 'react'
import EmprendimientoCard from './components/EmprendimientoCard'
import SearchBar from './components/SearchBar'
import CategoryFilter from './components/CategoryFilter'
import Footer from './components/Footer'
import { FiLoader } from 'react-icons/fi'

// Configuración de Estrategia de Caché
const CACHE_KEY = 'celider_data_v1';
const CACHE_TIME_KEY = 'celider_timestamp';
const EXPIRE_TIME = 10 * 60 * 1000; // 10 minutos (ajustable)

function App() {
  const [emprendimientos, setEmprendimientos] = useState([])
  const [filteredEmprendimientos, setFilteredEmprendimientos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const API_BASE_URL = import.meta.env.PROD 
    ? 'https://linktreecelider.onrender.com'
    : 'http://localhost:3001'
  
  const API_URL = `${API_BASE_URL}/api/emprendimientos`
  
  const fetchEmprendimientos = async (forceRefresh = false) => {
    try {
      if (emprendimientos.length === 0) setLoading(true);
      
      // 1. Intentar recuperar de caché local
      const cachedData = localStorage.getItem(CACHE_KEY);
      const lastFetch = localStorage.getItem(CACHE_TIME_KEY);
      const now = Date.now();

      // Si tenemos caché válido y no forzamos actualización, lo usamos de una vez
      if (!forceRefresh && cachedData && lastFetch && (now - lastFetch < EXPIRE_TIME)) {
        const data = JSON.parse(cachedData);
        setEmprendimientos(data);
        setFilteredEmprendimientos(data);
        setLoading(false);
        return; 
      }

      // 2. Si no hay caché o expiró, vamos a la API
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`Error ${response.status}: Servidor fuera de línea`);
      
      const data = await response.json();
      
      // 3. Guardar en estado y persistir en localStorage
      setEmprendimientos(data);
      setFilteredEmprendimientos(data);
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
      setError(null); // Limpiamos errores si la conexión volvió
      
    } catch (err) {
      // 4. MODO RESILIENCIA: Si falla la red pero hay algo en caché (aunque sea viejo), mostrarlo
      const backupData = localStorage.getItem(CACHE_KEY);
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
  }

  useEffect(() => {
    fetchEmprendimientos();
  }, []);

  // Memorizar categorías para que no se recalculen en cada tipeo del buscador
  const categories = useMemo(() => {
    return ['all', ...new Set(emprendimientos.map(emp => emp.categoria))];
  }, [emprendimientos]);

  // Lógica de filtrado en tiempo real
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

  // Pantalla de carga inteligente: Solo si no hay datos previos para mostrar
  if (loading && emprendimientos.length === 0) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-24 h-24 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          <FiLoader className="w-10 h-10 text-blue-400 animate-pulse" />
        </div>
        <p className="mt-8 text-blue-200/50 font-medium tracking-widest uppercase text-xs">Cargando Directorio</p>
      </div>
    );
  }

  // Pantalla de error (solo si no pudimos recuperar ni el caché)
  if (error && emprendimientos.length === 0) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
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
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500 selection:text-white">
      {/* Luces de fondo decorativas */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full"></div>
      </div>

      <header className="relative z-10 pt-16 pb-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            LinkTree <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Celider</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed">
            La vitrina digital para los negocios con propósito en <span className="text-white font-medium border-b border-blue-500/50">Pasto</span>.
          </p>
        </div>
      </header>

      {/* Panel de Control: Buscador y Filtros */}
      <section className="relative z-10 container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto bg-white/[0.02] backdrop-blur-3xl p-6 md:p-10 rounded-[3rem] border border-white/5 shadow-2xl space-y-8">
          <div className="w-full">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div className="h-px bg-white/5 w-full"></div>
          <div className="w-full">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        </div>
      </section>

      <main className="relative z-10 container mx-auto px-4 pb-24">
        <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-6">
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-gray-500 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
            Resultados
          </h2>
          <span className="text-white font-mono text-xl">{filteredEmprendimientos.length}</span>
        </div>

        {filteredEmprendimientos.length === 0 ? (
          <div className="text-center py-32 rounded-[3rem] bg-white/[0.01] border border-dashed border-white/10">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🏜️</div>
            <p className="text-gray-400 text-lg">No hay coincidencias.</p>
            <button 
              onClick={() => {setSearchTerm(''); setSelectedCategory('all')}} 
              className="mt-4 text-blue-400 font-bold hover:text-blue-300"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredEmprendimientos.map((emp, index) => (
              <EmprendimientoCard key={emp.id} emprendimiento={emp} index={index} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App;