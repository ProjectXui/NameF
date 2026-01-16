
import React from 'react';
import { Trash2, Copy, Check } from 'lucide-react';

interface ActionButtonsProps {
  onClear: () => void;
  onCopy: () => void;
  isCopied: boolean;
  isOutputEmpty: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onClear, onCopy, isCopied, isOutputEmpty }) => {
  return (
    <div className="flex gap-2 w-full sm:w-auto">
      <button
        onClick={onClear}
        className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 text-sm font-semibold bg-slate-700/50 hover:bg-slate-700 text-slate-300 border border-slate-600 rounded-lg transition-all duration-200 active:scale-95"
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Limpar
      </button>
      <button
        onClick={onCopy}
        disabled={isOutputEmpty}
        className={`flex-1 sm:flex-none flex items-center justify-center px-6 py-2 text-sm font-bold rounded-lg transition-all duration-200 active:scale-95 shadow-lg shadow-cyan-500/10 ${
          isCopied 
            ? 'bg-emerald-500 text-white border border-emerald-400' 
            : 'bg-cyan-500 hover:bg-cyan-400 text-slate-900 border border-cyan-300 disabled:bg-slate-700 disabled:text-slate-500 disabled:border-transparent disabled:shadow-none disabled:cursor-not-allowed'
        }`}
      >
        {isCopied ? (
          <>
            <Check className="w-4 h-4 mr-2" />
            Copiado!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 mr-2" />
            Copiar Resultado
          </>
        )}
      </button>
    </div>
  );
};

export default ActionButtons;
