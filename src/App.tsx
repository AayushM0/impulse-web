import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Home from '@/pages/Home';
const Join = lazy(() => import('@/pages/Join'));
const Events = lazy(() => import('@/pages/Events'));
const Projects = lazy(() => import('@/pages/Projects'));
const CommunityPage = lazy(() => import('@/pages/Community'));
const About = lazy(() => import('@/pages/About'));
const SharkHack = lazy(() => import('@/pages/SharkHack'));

function RouteLoadingFallback() {
  return (
    <div className="min-h-screen w-full bg-space-950 flex flex-col items-center justify-center p-6 select-none" aria-busy="true" aria-label="Loading page">
      <div className="relative flex items-center justify-center mb-6">
        <div className="w-12 h-12 rounded-full border border-impulse-blue/20 border-t-impulse-blue animate-spin" />
        <div className="absolute w-2 h-2 rounded-full bg-impulse-blue animate-pulse" />
      </div>
      <p className="font-mono-label text-xs tracking-[0.25em] text-impulse-blue-bright/70 animate-pulse">
        INITIALIZING IMPULSE //
      </p>
    </div>
  );
}
import ScrollToTop from '@/components/ScrollToTop';
import SmoothScrollProvider from '@/providers/SmoothScrollProvider';

function PageTitle() {
  const location = useLocation();
  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'IMPULSE — Ideas in Motion',
      '/join': 'Join IMPULSE — Ideas in Motion',
      '/events': 'Events — IMPULSE',
      '/shark-hack': 'SHARK HACK 2027 — Impulse Flagship Hackathon',
      '/events/shark-hack': 'SHARK HACK 2027 — Impulse Flagship Hackathon',
      '/projects': 'Projects — IMPULSE',
      '/community': 'Community — IMPULSE',
      '/about': 'About — IMPULSE',
    };
    document.title = titles[location.pathname] || 'IMPULSE — Ideas in Motion';
  }, [location.pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <ScrollToTop />
        <PageTitle />
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shark-hack" element={<SharkHack />} />
        <Route path="/events/shark-hack" element={<SharkHack />} />
        <Route path="/join" element={<Join />} />
        <Route path="/events" element={<Events />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </SmoothScrollProvider>
    </BrowserRouter>
  );
}
