import { calculateEMC, rateWindow, type GrainType } from './emc';

export interface DryingWindow {
  time: string;
  temp: number;
  emc: number;
  rh: number;
  precipProb: number;
  rating: 'best' | 'good' | 'poor' | 'avoid';
  weatherCode: number;
}

export async function getDryingWindows(
  lat: number,
  lon: number,
  grain: GrainType
): Promise<DryingWindow[]> {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code` +
      `&forecast_days=3&timezone=Europe/Helsinki`
  );
  if (!res.ok) throw new Error('Weather API failed');
  const data = await res.json();
  return data.hourly.time.map((time: string, i: number) => ({
    time,
    temp: data.hourly.temperature_2m[i],
    emc: calculateEMC(
      data.hourly.temperature_2m[i],
      data.hourly.relative_humidity_2m[i],
      grain
    ),
    rh: data.hourly.relative_humidity_2m[i],
    precipProb: data.hourly.precipitation_probability[i],
    rating: rateWindow(
      data.hourly.relative_humidity_2m[i],
      data.hourly.precipitation_probability[i]
    ),
    weatherCode: data.hourly.weather_code[i],
  }));
}

export async function getLightningDistance(
  lat: number,
  lon: number
): Promise<number | null> {
  try {
    const bbox = `${lon - 3},${lat - 2},${lon + 3},${lat + 2}`;
    const since = new Date(Date.now() - 3600000).toISOString();
    const url =
      `https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0` +
      `&request=getFeature&storedquery_id=fmi::observations::lightning::multipointcoverage` +
      `&bbox=${bbox}&starttime=${since}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const text = await res.text();
    const matches = text.match(/<gml:pos>([^<]+)<\/gml:pos>/g);
    if (!matches || matches.length === 0) return null;
    let minDist = Infinity;
    for (const match of matches) {
      const coords = match.replace(/<\/?gml:pos>/g, '').trim().split(/\s+/);
      const sLat = parseFloat(coords[0]);
      const sLon = parseFloat(coords[1]);
      const dist = haversine(lat, lon, sLat, sLon);
      if (dist < minDist) minDist = dist;
    }
    return Math.round(minDist);
  } catch {
    return null;
  }
}

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export const FINNISH_CITIES = [
  { name: 'Tampere', lat: 61.4978, lon: 23.761 },
  { name: 'Seinäjoki', lat: 62.7903, lon: 22.8403 },
  { name: 'Jyväskylä', lat: 62.2426, lon: 25.7473 },
  { name: 'Kuopio', lat: 62.8924, lon: 27.677 },
  { name: 'Oulu', lat: 65.0121, lon: 25.4651 },
  { name: 'Turku', lat: 60.4518, lon: 22.2666 },
  { name: 'Hämeenlinna', lat: 60.9966, lon: 24.4641 },
  { name: 'Sastamala', lat: 61.3418, lon: 23.0301 },
  { name: 'Kokkola', lat: 63.8384, lon: 23.1304 },
  { name: 'Pori', lat: 61.4851, lon: 21.7974 },
];
