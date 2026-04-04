/**
 * Returns Tailwind CSS classes for category badges
 * @param {string} category - Category name
 * @returns {string} Tailwind CSS classes
 */
export const getCategoryColor = (category) => {
  const colors = {
    'tecnologia': 'bg-blue-100 text-blue-800 border-blue-200',
    'moda': 'bg-pink-100 text-pink-800 border-pink-200',
    'comida': 'bg-orange-100 text-orange-800 border-orange-200',
    'servicios': 'bg-green-100 text-green-800 border-green-200',
    'educacion': 'bg-purple-100 text-purple-800 border-purple-200',
    'salud': 'bg-red-100 text-red-800 border-red-200',
    'arte': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'deportes': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'tecnología': 'bg-blue-100 text-blue-800 border-blue-200',
    'belleza': 'bg-pink-100 text-pink-800 border-pink-200',
    'restaurante': 'bg-orange-100 text-orange-800 border-orange-200',
    'consultoría': 'bg-green-100 text-green-800 border-green-200',
    'coaching': 'bg-purple-100 text-purple-800 border-purple-200',
    'fitness': 'bg-red-100 text-red-800 border-red-200',
    'música': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'entretenimiento': 'bg-indigo-100 text-indigo-800 border-indigo-200'
  }
  
  return colors[category.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200'
}

/**
 * Returns a gradient background based on category
 * @param {string} category - Category name
 * @returns {string} Tailwind CSS gradient classes
 */
export const getCategoryGradient = (category) => {
  const gradients = {
    'tecnologia': 'from-blue-500 to-blue-700',
    'moda': 'from-pink-500 to-pink-700',
    'comida': 'from-orange-500 to-orange-700',
    'servicios': 'from-green-500 to-green-700',
    'educacion': 'from-purple-500 to-purple-700',
    'salud': 'from-red-500 to-red-700',
    'arte': 'from-yellow-500 to-yellow-700',
    'deportes': 'from-indigo-500 to-indigo-700'
  }
  
  return gradients[category.toLowerCase()] || 'from-gray-500 to-gray-700'
}

/**
 * Returns an icon for the category
 * @param {string} category - Category name
 * @returns {string} Lucide React icon name (as string for dynamic import)
 */
export const getCategoryIcon = (category) => {
  const icons = {
    'tecnologia': 'Cpu',
    'moda': 'Shirt',
    'comida': 'Utensils',
    'servicios': 'Briefcase',
    'educacion': 'GraduationCap',
    'salud': 'Heart',
    'arte': 'Palette',
    'deportes': 'Trophy'
  }
  
  return icons[category.toLowerCase()] || 'Globe'
}