import React from 'react';
import { VERTICALS } from '../constants';
import { Vertical, VerticalId } from '../types';
import { LayoutDashboard, Newspaper, Settings, Activity } from 'lucide-react';

interface SidebarProps {
  currentVertical: VerticalId;
  onSelectVertical: (id: VerticalId) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentVertical, onSelectVertical }) => {
  return (
    <div className="w-20 md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0 z-50 transition-all duration-300">
      <div className="p-6 flex items-center justify-center md:justify-start gap-3 border-b border-slate-800">
        <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0"></div>
        <span className="text-xl font-bold text-slate-100 hidden md:block tracking-tight">Spazio<span className="text-blue-500">Net</span></span>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 space-y-2 px-3">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 hidden md:block px-3">
          Network
        </div>
        
        {VERTICALS.map((v) => {
          const isActive = currentVertical === v.id;
          // Determine color class dynamically
          const activeBorder = isActive 
            ? v.id === 'napoli' ? 'border-l-4 border-l-[#009DDC] bg-slate-800'
            : v.id === 'milan' ? 'border-l-4 border-l-[#FB090B] bg-slate-800'
            : v.id === 'inter' ? 'border-l-4 border-l-[#010E80] bg-slate-800'
            : v.id === 'juve' ? 'border-l-4 border-l-gray-400 bg-slate-800'
            : 'border-l-4 border-l-orange-500 bg-slate-800'
            : 'border-l-4 border-l-transparent hover:bg-slate-800/50';

          const textColor = isActive ? 'text-white' : 'text-slate-400';

          return (
            <button
              key={v.id}
              onClick={() => onSelectVertical(v.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-r-lg transition-all ${activeBorder} ${textColor} group`}
            >
              <div className={`w-3 h-3 rounded-full flex-shrink-0 
                ${v.id === 'napoli' ? 'bg-[#009DDC]' : ''}
                ${v.id === 'milan' ? 'bg-[#FB090B]' : ''}
                ${v.id === 'inter' ? 'bg-[#010E80]' : ''}
                ${v.id === 'juve' ? 'bg-white' : ''}
                ${v.id === 'rompipallone' ? 'bg-orange-500' : ''}
              `}></div>
              <span className="font-medium hidden md:block truncate">{v.name}</span>
            </button>
          );
        })}

        <div className="my-6 border-t border-slate-800"></div>

        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 hidden md:block px-3">
          Tools
        </div>
        
        <button className="w-full flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors px-3">
            <LayoutDashboard size={20} />
            <span className="hidden md:block">Dashboard</span>
        </button>
        <button className="w-full flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors px-3">
            <Activity size={20} />
            <span className="hidden md:block">Analytics</span>
        </button>
        <button className="w-full flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors px-3">
            <Settings size={20} />
            <span className="hidden md:block">Settings</span>
        </button>

      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 text-slate-400">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                <span className="text-xs font-bold">ED</span>
            </div>
            <div className="hidden md:block">
                <p className="text-sm font-medium text-white">Editor</p>
                <p className="text-xs">Senior Staff</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;