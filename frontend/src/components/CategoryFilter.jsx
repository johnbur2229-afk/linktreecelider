import { FiFilter } from 'react-icons/fi'

const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
  
  // Mapeo de nombres y emojis (Estructura limpia)
  const categoryConfig = {
    all: { label: 'Todos', emoji: '🌐', color: 'hover:bg-blue-500/20 text-blue-100' },
    tecnologia: { label: 'Tecnología', emoji: '💻', color: 'hover:bg-cyan-500/20 text-cyan-100' },
    moda: { label: 'Moda', emoji: '👗', color: 'hover:bg-pink-500/20 text-pink-100' },
    comida: { label: 'Comida', emoji: '🍕', color: 'hover:bg-orange-500/20 text-orange-100' },
    gastronomia: { label: 'Gastronomía', emoji: '🍳', color: 'hover:bg-orange-500/20 text-orange-100' },
    servicios: { label: 'Servicios', emoji: '💼', color: 'hover:bg-green-500/20 text-green-100' },
    educacion: { label: 'Educación', emoji: '🎓', color: 'hover:bg-purple-500/20 text-purple-100' },
    salud: { label: 'Salud', emoji: '🏥', color: 'hover:bg-red-500/20 text-red-100' },
    arte: { label: 'Arte', emoji: '🎨', color: 'hover:bg-yellow-500/20 text-yellow-100' },
    deportes: { label: 'Deportes', emoji: '⚽', color: 'hover:bg-indigo-500/20 text-indigo-100' },
    influencer: { label: 'Influencer', emoji: '🤳', color: 'hover:bg-purple-500/20 text-purple-100' }
  }

  const getCategoryData = (category) => {
    return categoryConfig[category] || { 
      label: category.charAt(0).toUpperCase() + category.slice(1), 
      emoji: '✨', 
      color: 'hover:bg-gray-500/20 text-gray-100' 
    }
  }

  return (
    <div className="space-y-4">
      {/* Título simple como el antiguo */}
      <div className="flex items-center gap-2 px-1">
        <FiFilter className="text-blue-400 w-4 h-4" />
        <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest">
          Filtrar por categoría
        </h3>
      </div>

      {/* Contenedor de botones */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const { label, emoji, color } = getCategoryData(category)
          const isSelected = selectedCategory === category

          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                flex items-center gap-2 px-5 py-2 rounded-2xl text-sm font-semibold transition-all duration-300
                border border-white/5 backdrop-blur-sm
                ${color}
                ${isSelected 
                  ? 'bg-blue-600 border-blue-400 text-white scale-105 shadow-lg shadow-blue-600/20' 
                  : 'bg-white/5 hover:border-white/20'
                }
              `}
            >
              <span>{emoji}</span>
              {label}
            </button>
          )
        })}
      </div>

      {/* Indicador de filtro activo */}
      {selectedCategory !== 'all' && (
        <div className="px-1 animate-fadeIn">
          <p className="text-[10px] text-blue-400/60 uppercase font-bold tracking-tighter">
            Filtrando por: <span className="text-blue-300">{getCategoryData(selectedCategory).label}</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default CategoryFilter