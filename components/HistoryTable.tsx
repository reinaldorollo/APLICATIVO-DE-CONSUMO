
import React from 'react';
import { FuelEntry } from '../types';

interface HistoryTableProps {
  entries: FuelEntry[];
  onDelete: (id: string) => void;
}

const HistoryTable: React.FC<HistoryTableProps> = ({ entries, onDelete }) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
        <i className="fas fa-receipt text-4xl text-slate-300 mb-4"></i>
        <p className="text-slate-500">Nenhum registro encontrado.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-100">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Data / KM</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Distância</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Consumo</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Custo/KM</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {entries.map((entry) => (
            <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                <div className="font-medium text-slate-800">{entry.date}</div>
                <div className="text-xs text-slate-400">{entry.currentKm.toLocaleString()} km</div>
              </td>
              <td className="px-6 py-4 text-slate-600 font-medium">
                {entry.distance} km
                <div className="text-xs text-slate-400">{entry.liters.toFixed(2)} L</div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${entry.kmPerLiter > 12 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                  {entry.kmPerLiter.toFixed(2)} km/L
                </span>
              </td>
              <td className="px-6 py-4 text-slate-600">
                R$ {entry.costPerKm.toFixed(2)}
              </td>
              <td className="px-6 py-4 font-bold text-slate-800">
                R$ {entry.totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onDelete(entry.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
