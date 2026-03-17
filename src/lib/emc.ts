export type GrainType = 'ohra' | 'kaura' | 'vehnä' | 'rapsi' | 'ruis';

const EMC_CONSTANTS: Record<GrainType, { K1: number; K2: number; K3: number }> = {
  ohra:  { K1: 2.2857e-5, K2: 1.559, K3: 2.284 },
  kaura: { K1: 1.9187e-5, K2: 1.559, K3: 2.284 },
  vehnä: { K1: 2.5738e-5, K2: 1.559, K3: 2.284 },
  rapsi: { K1: 3.0e-5,    K2: 1.559, K3: 2.100 },
  ruis:  { K1: 2.4e-5,    K2: 1.559, K3: 2.284 },
};

export function calculateEMC(T: number, RH: number, grain: GrainType): number {
  const T_K = T + 273.15;
  const rh = Math.max(0.01, Math.min(0.99, RH / 100));
  const { K1, K2, K3 } = EMC_CONSTANTS[grain];
  const emc = Math.pow((-Math.log(1 - rh)) / (K1 * Math.pow(T_K, K2)), 1 / K3);
  return Math.round(emc * 10) / 10;
}

export function rateWindow(rh: number, precipProb: number): 'best' | 'good' | 'poor' | 'avoid' {
  if (precipProb > 60) return 'avoid';
  if (rh < 45 && precipProb < 20) return 'best';
  if (rh < 65 && precipProb < 40) return 'good';
  return 'poor';
}
