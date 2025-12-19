
import React, { useState } from 'react';
import { FuelEntry } from '../types';

interface FuelFormProps {
  onAddEntry: (entry: FuelEntry) => void;
}

const FuelForm: React.FC<FuelFormProps> = ({ onAddEntry }) => {
  const [currentKm, setCurrentKm] = useState('');
  const [distance, setDistance] = useState('');
  const [liters, setLiters] = useState('');
  const [totalCost, setTotalCost] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const d = parseFloat(distance);
    const l = parseFloat(liters);
    const cost = parseFloat(totalCost);
    const cKm = parseFloat(currentKm);

    if (d > 0 && l > 0 && cost > 0) {
      const kmPerLiter = d / l;
      const costPerKm = cost / d;

      const newEntry: FuelEntry = {
        id: crypto.randomUUID(),
        date: new Date().toLocaleDateString('pt-BR'),
        currentKm: cKm,
        distance: d,
        liters: l,
        totalCost: cost,
        kmPerLiter,
        costPerKm
      };

      onAddEntry(newEntry);
      
      // Clear fields
      setDistance('');
      setLiters('');
      setTotalCost('');
      setCurrentKm('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
        <i className="fas fa-gas-pump text-emerald-500"></i>
        Novo Abastecimento
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">KM Atual do Veículo</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-sm">km</span>
              <input
                type="number"
                required
                value={currentKm}
                onChange={(e) => setCurrentKm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                placeholder="Ex: 45000"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Distância Percorrida</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-sm">km</span>
              <input
                type="number"
                required
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                placeholder="Ex: 450"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Litros Abastecidos</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-sm">L</span>
              <input
                type="number"
                step="0.01"
                required
                value={liters}
                onChange={(e) => setLiters(e.target.value)}
                className="w-full pl-8 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                placeholder="Ex: 40.5"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Valor Gasto (Total)</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-sm">R$</span>
              <input
                type="number"
                step="0.01"
                required
                value={totalCost}
                onChange={(e) => setTotalCost(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                placeholder="Ex: 215.50"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <i className="fas fa-plus"></i>
          Registrar Consumo
        </button>
      </form>
    </div>
  );
};

export default FuelForm;
