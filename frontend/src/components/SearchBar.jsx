import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const inputRef = useRef(null)

  // Auto-focus opcional al cargar
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleClear = () => {
    setSearchTerm('')
    inputRef.current?.focus()
  }

  return (
    <div className="relative group">
      {/* Icono de búsqueda a la izquierda */}
      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
      </div>

      {/* Input con estilo de cristal oscuro */}
      <input
        ref={inputRef}
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar por nombre o descripción..."
        className="w-full pl-14 pr-12 py-4 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:bg-white/[0.07] transition-all duration-300 shadow-inner"
        aria-label="Buscar emprendimientos"
        aria-describedby="search-description"
        enterKeyHint="search"
      />
      <div id="search-description" className="sr-only">
        Escribe para filtrar emprendimientos por nombre o descripción.
      </div>

      {/* Botón de limpiar a la derecha */}
      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-5 flex items-center group/btn"
          aria-label="Limpiar búsqueda"
        >
          <div className="p-1 rounded-full hover:bg-white/10 transition-colors">
            <X className="h-4 w-4 text-gray-500 group-hover/btn:text-white" />
          </div>
        </button>
      )}

      {/* Efecto de brillo sutil en el borde cuando hay foco */}
      <div className="absolute -inset-px bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-2xl opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-500" />
    </div>
  )
}

export default SearchBar