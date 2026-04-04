import { ExternalLink } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const whatsappUrl = "https://wa.me/573203271320?text=Hola!%20Me%20gustaría%20listar%20mi%20emprendimiento%20en%20el%20Directorio%20Celider"

  return (
    <footer className="mt-20 pb-16 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Card Única e Integrada */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 text-center shadow-2xl">
          
          {/* Copyright - Ahora en la parte superior */}
          <div className="mb-10 pb-8 border-b border-white/5">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-primary-400 font-black">
              © {currentYear} Comunidad Celider
            </p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-gray-500 mt-2 font-medium">
              Todos los derechos reservados
            </p>
          </div>

          {/* Sección de Créditos */}
          <div className="mb-10">
            <p className="text-gray-400 text-xs tracking-widest mb-6 flex items-center justify-center gap-2">
              Desarrollado con ❤️ por
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <a 
                href="https://www.tiktok.com/@marioconcejo2" 
                target="_blank" 
                rel="noreferrer nofollow" 
                className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-white hover:bg-primary-500/20 hover:border-primary-500/50 transition-all text-sm font-bold shadow-lg shadow-black/20"
              >
                Marito Senior
              </a>
              <a 
                href="https://jburgosb.netlify.app/" 
                target="_blank" 
                rel="noreferrer nofollow" 
                className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-white hover:bg-primary-500/20 hover:border-primary-500/50 transition-all text-sm font-bold shadow-lg shadow-black/20"
              >
                Uno Senior
              </a>
            </div>
          </div>

          {/* Enlace de WhatsApp Destacado al final del card */}
          <div className="mt-4">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer nofollow" 
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white rounded-2xl text-sm font-black transition-all shadow-xl shadow-primary-600/20 hover:scale-[1.02] active:scale-95"
              aria-label="Contactar por WhatsApp para listar tu emprendimiento"
            >
              ¿Quieres listar tu emprendimiento? 
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
          
        </div>
      </div>
    </footer>
  )
}

export default Footer