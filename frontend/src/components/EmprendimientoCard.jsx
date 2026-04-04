import { useState, useEffect } from 'react';
import { 
  Instagram, 
  Facebook, 
  MessageCircle, 
  Send, 
  Music, // Icono para TikTok
} from 'lucide-react';
import { getCategoryColor } from '../utils/categoryColors';

const EmprendimientoCard = ({ emprendimiento, index }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    // Preload image
    if (emprendimiento.url_foto) {
      const img = new Image();
      img.src = emprendimiento.url_foto;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageError(true);
    }
  }, [emprendimiento.url_foto]);
  
  // Extraemos las propiedades sincronizadas con tu tabla de Neon
  const {
    id,
    nombre,
    descripcion,
    categoria,
    url_foto,
    whatsapp,
    instagram,
    facebook,
    tiktok,
    telegram
  } = emprendimiento;

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : '??';
  };

  const getAvatarColor = (id) => {
    const colors = [
      'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 
      'bg-orange-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    return colors[id % colors.length];
  };

  // Formato para WhatsApp (Colombia +57)
  const formatWhatsAppLink = (number) => {
    if (!number) return null;
    const cleaned = number.replace(/\D/g, '');
    const withCountryCode = cleaned.startsWith('57') ? cleaned : `57${cleaned}`;
    return `https://wa.me/${withCountryCode}`;
  };

  // Configuración de redes sociales con el nuevo look de TikTok
  const socialLinks = [
    { 
      platform: 'whatsapp', 
      url: formatWhatsAppLink(whatsapp), 
      icon: MessageCircle, 
      color: 'bg-green-500' 
    },
    { 
      platform: 'instagram', 
      url: instagram, 
      icon: Instagram, 
      color: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600' 
    },
    { 
      platform: 'facebook', 
      url: facebook, 
      icon: Facebook, 
      color: 'bg-blue-600' 
    },
    { 
      platform: 'tiktok', 
      url: tiktok, 
      icon: Music, 
      // Color negro con sombra cian/rosa para el estilo de TikTok
      color: 'bg-black border border-white/10 shadow-[2px_2px_0px_#ff0050,-2px_-2px_0px_#00f2ea]' 
    },
    { 
      platform: 'telegram', 
      url: telegram ? `https://t.me/${telegram.replace('@', '')}` : null, 
      icon: Send, 
      color: 'bg-sky-500' 
    }
  ].filter(link => link.url && link.url !== '');

  return (
    <div 
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[2.5rem] p-6 shadow-sm hover:shadow-2xl hover:bg-white/[0.12] transition-all duration-500 animate-fadeIn relative group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col items-center text-center">
        {/* Foto Circular con Efecto de Brillo al Hover */}
        <div className="mb-5 relative">
          <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          {url_foto && !imageError ? (
            <>
              <img
                src={url_foto}
                alt={`Foto de ${nombre}`}
                className={`w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg relative z-10 transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
                decoding="async"
                width="96"
                height="96"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
              {!imageLoaded && (
                <div className={`absolute inset-0 w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg ${getAvatarColor(id)}`}>
                  {getInitials(nombre)}
                </div>
              )}
            </>
          ) : (
            <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg relative z-10 ${getAvatarColor(id)}`}>
              {getInitials(nombre)}
            </div>
          )}
        </div>

        {/* Categoría */}
        <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 px-3 py-1 rounded-full ${getCategoryColor(categoria)}`}>
          {categoria}
        </span>

        {/* Título y Descripción */}
        <h3 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-primary-400 transition-colors duration-300">
          {nombre}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-8 px-2">
          {descripcion}
        </p>

        {/* Fila Única de Contacto (Redes Sociales) */}
        <div className="flex flex-wrap justify-center gap-4">
          {socialLinks.map(({ platform, url, icon: Icon, color }) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className={`w-11 h-11 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-125 hover:-translate-y-1 active:scale-95 ${color}`}
              title={`Visitar ${platform} de ${nombre}`}
              aria-label={`Enlace a ${platform}`}
            >
              <Icon size={22} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmprendimientoCard;