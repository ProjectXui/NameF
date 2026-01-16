
import React, { useState, useEffect, useCallback } from 'react';
import { formatTextWithGemini, FormattedResult } from './services/geminiService';
import Header from './components/Header';
import TextAreaPanel from './components/TextAreaPanel';
import ActionButtons from './components/ActionButtons';
import { XCircle, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [formattedText, setFormattedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleFormatting = useCallback(async (text: string) => {
    if (text.trim() === '') {
      setFormattedText('');
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result: FormattedResult = await formatTextWithGemini(text);
      setFormattedText(result.text);
    } catch (e) {
      setError('Erro ao formatar. Verifique sua conexão.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleFormatting(inputText);
    }, 600);

    return () => clearTimeout(debounceTimer);
  }, [inputText, handleFormatting]);

  const handleClear = () => {
    setInputText('');
    setFormattedText('');
    setError(null);
    setIsCopied(false);
  };

  const handleCopy = () => {
    if (formattedText) {
      navigator.clipboard.writeText(formattedText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-2 sm:p-4 md:p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-slate-800/30 p-4 sm:p-6 rounded-2xl border border-slate-700/50 shadow-2xl">
        <Header />
        
        {error && (
            <div className="bg-red-900/30 border border-red-700/50 text-red-200 px-4 py-3 rounded-xl mb-6 flex items-center text-sm" role="alert">
                <XCircle className="w-4 h-4 mr-3 flex-shrink-0" />
                <span>{error}</span>
            </div>
        )}

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="flex flex-col h-full">
            <TextAreaPanel
              id="input-text"
              label="Texto Original"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Cole aqui: JOSE SILVA 123 ou RUA DEZ 50"
            />
          </div>
          <div className="flex flex-col h-full">
            <TextAreaPanel
              id="output-text"
              label="Texto Formatado"
              value={formattedText}
              placeholder="O resultado aparecerá aqui..."
              readOnly
              isLoading={isLoading}
            />
          </div>
        </main>
        
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-700/50 pt-6">
          <div className="flex items-center text-xs text-slate-500 italic">
            <AlertCircle className="w-3 h-3 mr-1" />
            Números são preservados automaticamente.
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <ActionButtons onClear={handleClear} onCopy={handleCopy} isCopied={isCopied} isOutputEmpty={!formattedText} />
          </div>
        </div>
      </div>
      
      <footer className="mt-8 text-slate-600 text-[10px] uppercase tracking-widest">
        Powered by Gemini 3 Flash
      </footer>
    </div>
  );
};

export default App;
