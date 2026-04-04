import { Loader2 } from 'lucide-react'

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8" role="status" aria-label="Cargando emprendimientos">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-24 h-24 rounded-full border-4 border-gray-200"></div>
        
        {/* Animated spinner */}
        <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin"></div>
        
        {/* Inner icon */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loader2 className="w-12 h-12 text-blue-500 animate-pulse" />
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-lg font-semibold text-gray-700 mb-2">Cargando emprendimientos</p>
        <p className="text-gray-500">Estamos preparando todo para ti...</p>
        
        {/* Progress dots animation */}
        <div className="flex justify-center gap-2 mt-4">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        
        {/* Stats placeholder */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full mx-auto mb-2 animate-pulse"></div>
            <div className="h-3 w-12 bg-gray-200 rounded mx-auto animate-pulse"></div>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-purple-100 rounded-full mx-auto mb-2 animate-pulse"></div>
            <div className="h-3 w-12 bg-gray-200 rounded mx-auto animate-pulse"></div>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-pink-100 rounded-full mx-auto mb-2 animate-pulse"></div>
            <div className="h-3 w-12 bg-gray-200 rounded mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner