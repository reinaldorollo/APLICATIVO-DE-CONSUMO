
export interface FuelEntry {
  id: string;
  date: string;
  currentKm: number;
  distance: number;
  liters: number;
  totalCost: number;
  kmPerLiter: number;
  costPerKm: number;
}

export interface SummaryStats {
  totalDistance: number;
  totalCost: number;
  totalLiters: number;
  avgKmPerLiter: number;
  avgCostPerKm: number;
}
