
import React from 'react';
import { SummaryStats } from '../types';

interface StatsCardsProps {
  stats: SummaryStats;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <i className="fas fa-road text-xl"></i>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase">Total Rodado</p>
            <p className="text-xl font-bold text-slate-800">{stats.totalDistance.toLocaleString()} km</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <i className="fas fa-leaf text-xl"></i>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase">Média Geral</p>
            <p className="text-xl font-bold text-slate-800">{stats.avgKmPerLiter.toFixed(2)} km/L</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
            <i className="fas fa-wallet text-xl"></i>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase">Total Gasto</p>
            <p className="text-xl font-bold text-slate-800">R$ {stats.totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
            <i className="fas fa-tag text-xl"></i>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase">Custo Médio/KM</p>
            <p className="text-xl font-bold text-slate-800">R$ {stats.avgCostPerKm.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
