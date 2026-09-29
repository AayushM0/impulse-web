import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from '@/pages/Home';
import Join from '@/pages/Join';
import Events from '@/pages/Events';
import Projects from '@/pages/Projects';
import CommunityPage from '@/pages/Community';
import About from '@/pages/About';
import SharkHack from '@/pages/SharkHack';
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
      </SmoothScrollProvider>
    </BrowserRouter>
  );
}
