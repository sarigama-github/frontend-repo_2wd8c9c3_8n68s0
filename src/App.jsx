import { useMemo } from 'react';
import Hero from './components/Hero';
import ParkingList from './components/ParkingList';

function App() {
  // Mock lots for demo; replace with API-backed data later
  const lots = useMemo(() => ([
    { id: 'l1', name: 'Downtown Plaza', spaces: 12, price: '$3', lat: 37.7749, lon: -122.4194 },
    { id: 'l2', name: 'Harbor Front', spaces: 5, price: '$4', lat: 37.8044, lon: -122.2711 },
    { id: 'l3', name: 'City Center Garage', spaces: 20, price: '$2.5', lat: 37.8715, lon: -122.2730 },
    { id: 'l4', name: 'Riverside Lot', spaces: 7, price: '$3.5', lat: 37.7600, lon: -122.4477 },
  ]), []);

  return (
    <div className="min-h-screen bg-slate-950 text-blue-100">
      <Hero />

      <main className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-white">Near you</h2>
          <p className="text-sm text-blue-300/80">Live distance will appear once location permission is granted.</p>
        </div>

        <ParkingList lots={lots} />
      </main>
    </div>
  );
}

export default App;