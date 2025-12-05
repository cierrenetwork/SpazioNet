import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader: React.FC = () => {
  return (
    <div className="col-span-full h-96 flex flex-col items-center justify-center text-slate-500 animate-in fade-in duration-700">
      <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
      <p className="text-lg font-medium text-slate-300">Scanning editorial trends...</p>
      <p className="text-sm">Analyzing Google Search data for latest updates.</p>
    </div>
  );
};

export default Loader;