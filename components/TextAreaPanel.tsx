
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface TextAreaPanelProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  isLoading?: boolean;
}

const TextAreaPanel: React.FC<TextAreaPanelProps> = ({
  id,
  label,
  value,
  placeholder,
  onChange,
  readOnly = false,
  isLoading = false,
}) => {
  return (
    <div className="flex flex-col h-full">
      <label htmlFor={id} className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </label>
      <div className="relative flex-grow min-h-[180px]">
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`w-full h-full min-h-[180px] p-4 bg-slate-800/80 border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:outline-none transition-all duration-200 resize-none text-slate-200 placeholder:text-slate-600 ${readOnly ? 'cursor-default' : 'cursor-text'}`}
          disabled={isLoading && !readOnly}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-[1px] rounded-xl animate-pulse">
            <div className="flex flex-col items-center gap-2">
              <LoadingSpinner />
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-tighter">Formatando...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextAreaPanel;
