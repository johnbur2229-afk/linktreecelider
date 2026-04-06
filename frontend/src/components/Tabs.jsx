import { Megaphone, Users, FolderTree } from 'lucide-react';

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'anuncios', label: 'Tablón de Anuncios', icon: <Megaphone size={20} /> },
    { id: 'tribus', label: 'Tribus', icon: <Users size={20} /> },
    { id: 'directorio', label: 'Linktree', icon: <FolderTree size={20} /> },
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-300
              border backdrop-blur-sm w-full sm:w-auto
              ${activeTab === tab.id
                ? 'bg-gradient-to-r from-primary-600 to-cyan-600 border-primary-500 text-white shadow-2xl shadow-primary-500/20 scale-105'
                : 'bg-white/[0.05] border-white/10 text-gray-300 hover:bg-white/[0.1] hover:border-white/20'
              }
            `}
          >
            {tab.icon}
            <span className="whitespace-nowrap">{tab.label}</span>
          </button>
        ))}
      </div>
      
      {/* Indicador visual */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] rounded-full">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">
            {tabs.find(t => t.id === activeTab)?.label}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Tabs;