
import React, { useState, useEffect, useMemo } from 'react';
import FuelForm from './components/FuelForm';
import HistoryTable from './components/HistoryTable';
import StatsCards from './components/StatsCards';
import { FuelEntry, SummaryStats } from './types';
import { getFuelAnalysis } from './services/geminiService';

const App: React.FC = () => {
  const [entries, setEntries] = useState<FuelEntry[]>(() => {
    const saved = localStorage.getItem('eco_drive_entries');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState<'form' | 'history'>('form');
  const [aiTip, setAiTip] = useState<string>('Carregando análise...');
  const [isLoadingTip, setIsLoadingTip] = useState(false);

  useEffect(() => {
    localStorage.setItem('eco_drive_entries', JSON.stringify(entries));
  }, [entries]);

  const stats = useMemo<SummaryStats>(() => {
    if (entries.length === 0) {
      return { totalDistance: 0, totalCost: 0, totalLiters: 0, avgKmPerLiter: 0, avgCostPerKm: 0 };
    }
    const totalDistance = entries.reduce((acc, curr) => acc + curr.distance, 0);
    const totalCost = entries.reduce((acc, curr) => acc + curr.totalCost, 0);
    const totalLiters = entries.reduce((acc, curr) => acc + curr.liters, 0);
    
    return {
      totalDistance,
      totalCost,
      totalLiters,
      avgKmPerLiter: totalDistance / totalLiters,
      avgCostPerKm: totalCost / totalDistance
    };
  }, [entries]);

  const fetchTip = async () => {
    setIsLoadingTip(true);
    const analysis = await getFuelAnalysis(entries);
    setAiTip(analysis);
    setIsLoadingTip(false);
  };

  useEffect(() => {
    fetchTip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries.length]);

  const handleAddEntry = (entry: FuelEntry) => {
    setEntries([entry, ...entries]);
    setActiveTab('history');
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <i className="fas fa-car-side"></i>
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">EcoDrive</h1>
          </div>
          
          <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'form' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <i className="fas fa-plus-circle mr-2"></i>
              Novo
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'history' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <i className="fas fa-history mr-2"></i>
              Histórico
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 pb-24">
        {/* Quick Stats Banner */}
        <StatsCards stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {activeTab === 'form' ? (
              <FuelForm onAddEntry={handleAddEntry} />
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <h2 className="text-lg font-bold text-slate-800">Resumo de Registros</h2>
                  <span className="text-xs font-medium text-slate-400 bg-slate-200 px-2 py-1 rounded-full">
                    {entries.length} registros
                  </span>
                </div>
                <HistoryTable entries={entries} onDelete={handleDeleteEntry} />
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* AI Insights Card */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 rounded-2xl text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <i className="fas fa-bolt"></i>
                  Insights IA
                </h3>
                <p className="text-emerald-50 text-sm leading-relaxed mb-4 italic">
                  "{isLoadingTip ? "Pensando em dicas para você..." : aiTip}"
                </p>
                <button 
                  onClick={fetchTip}
                  className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors backdrop-blur-sm border border-white/20"
                >
                  Atualizar Dica
                </button>
              </div>
              <i className="fas fa-brain absolute -right-4 -bottom-4 text-7xl text-white/10 rotate-12"></i>
            </div>

            {/* Maintenance Checklist (Placeholder) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <i className="fas fa-check-double text-blue-500"></i>
                Checklist Rápido
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="w-5 h-5 rounded border border-emerald-200 bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <i className="fas fa-check text-[10px]"></i>
                  </div>
                  Calibrar pneus (semanal)
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-600">
                   <div className="w-5 h-5 rounded border border-slate-200 flex items-center justify-center"></div>
                  Troca de óleo em 4.500 km
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="w-5 h-5 rounded border border-slate-200 flex items-center justify-center"></div>
                  Filtro de ar (limpeza)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Navigation (Mobile) */}
      <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-2 flex justify-around items-center z-50">
        <button
          onClick={() => setActiveTab('form')}
          className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'form' ? 'text-emerald-600' : 'text-slate-400'}`}
        >
          <i className="fas fa-gas-pump text-xl"></i>
          <span className="text-[10px] font-bold">Novo</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'history' ? 'text-emerald-600' : 'text-slate-400'}`}
        >
          <i className="fas fa-list-ul text-xl"></i>
          <span className="text-[10px] font-bold">Histórico</span>
        </button>
      </footer>
    </div>
  );
};

export default App;
