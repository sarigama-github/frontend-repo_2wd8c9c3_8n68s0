import { MapPin, Navigation } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

// Haversine distance in kilometers
function haversineDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function ParkingList({ lots = [] }) {
  const [coords, setCoords] = useState(null);
  const [geoError, setGeoError] = useState(null);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setGeoError('Geolocation not supported');
      return;
    }
    const id = navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => setGeoError(err.message),
      { enableHighAccuracy: true, timeout: 8000 }
    );
    return () => id && navigator.geolocation.clearWatch?.(id);
  }, []);

  const enriched = useMemo(() => {
    if (!coords) return lots.map((l) => ({ ...l, distanceKm: null }));
    return lots.map((l) => {
      if (typeof l.lat !== 'number' || typeof l.lon !== 'number') return { ...l, distanceKm: null };
      const d = haversineDistanceKm(coords.lat, coords.lon, l.lat, l.lon);
      return { ...l, distanceKm: d };
    }).sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity));
  }, [coords, lots]);

  return (
    <div className="space-y-4">
      {geoError && (
        <div className="text-sm text-amber-300/80">Location error: {geoError}</div>
      )}
      {enriched.map((lot) => (
        <div key={lot.id}
             className="flex items-center justify-between rounded-xl border border-slate-700/60 bg-slate-800/40 p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-blue-300"><MapPin size={20} /></div>
            <div>
              <div className="text-white font-medium">{lot.name}</div>
              <div className="text-sm text-blue-200/80">{lot.spaces} spaces • {lot.price}/hr</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-blue-200">
            <Navigation size={18} className="text-sky-300" />
            <span className="text-sm">
              {lot.distanceKm == null ? '—' : `${lot.distanceKm.toFixed(2)} km`}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
