import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/g5OaHmrKTDxRI7Ig/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* gradient vignette overlay - don't block interactions with Spline */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-950" />

      {/* Headline overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-3xl md:text-5xl font-semibold tracking-tight text-white drop-shadow"
          >
            KeraAI Urban Parking
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.08 }}
            className="mt-3 md:mt-4 max-w-2xl text-blue-200/90"
          >
            Real-time availability, dynamic pricing, and seamless bookings — optimized for the city at night.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
