
import React from 'react';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="mb-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-2 mb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-cyan-400" />
          <h1 className="text-2xl font-black text-white tracking-tight">
            Normalizador <span className="text-cyan-400">BR</span>
          </h1>
        </div>
        <div className="h-4 w-[1px] bg-slate-700 hidden sm:block mx-2"></div>
        <p className="text-slate-400 text-sm font-medium">
          Padronização de Nomes e Endereços
        </p>
      </div>
      <p className="text-slate-500 text-xs leading-relaxed max-w-xl">
        Converte textos para formato padrão com acentuação correta. 
        <span className="text-slate-300 font-semibold ml-1">Números são mantidos intactos.</span>
      </p>
    </header>
  );
};

export default Header;
