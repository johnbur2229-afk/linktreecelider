import { useState, lazy, Suspense } from 'react';
import Tabs from './components/Tabs';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Lazy load heavy components
const TablonAnuncios = lazy(() => import('./components/TablonAnuncios'));
const Tribus = lazy(() => import('./components/Tribus'));
const Directorio = lazy(() => import('./components/Directorio'));

function App() {
  const [activeTab, setActiveTab] = useState('anuncios'); // 'anuncios', 'tribus', 'directorio'

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-slate-200 selection:bg-primary-500 selection:text-white">
      {/* Luces de fondo decorativas optimizadas */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary-600/5 blur-[120px] rounded-full animate-float"></div>
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] bg-purple-600/5 blur-[120px] rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[10%] left-[20%] w-[30%] h-[30%] bg-cyan-600/5 blur-[100px] rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <header className="relative z-10 pt-12 md:pt-20 pb-8 md:pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 md:mb-6 tracking-tighter">
            <span className="text-gradient">Celider</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-cyan-300">Community</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            La plataforma digital de la comunidad en <span className="text-white font-medium border-b border-primary-500/50">Pasto</span>. Anuncios, tribus y emprendimientos.
          </p>
        </div>
      </header>

      {/* Navegación por pestañas */}
      <section className="relative z-10 container mx-auto px-4 mb-8 md:mb-12">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </section>

      {/* Contenido principal */}
      <main className="relative z-10 container mx-auto px-4 pb-24 md:pb-32">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
            <p className="mt-6 text-gray-400">Cargando contenido...</p>
          </div>
        }>
          {activeTab === 'anuncios' && <TablonAnuncios />}
          {activeTab === 'tribus' && <Tribus />}
          {activeTab === 'directorio' && <Directorio />}
        </Suspense>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App;