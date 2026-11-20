import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Component, type ErrorInfo, type ReactNode, useEffect, lazy, Suspense } from 'react';
import Home from '@/pages/Home';

// Resilient dynamic imports with single auto-reload on stale bundle hashes
function lazyWithRetry<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    try {
      return await factory();
    } catch (error) {
      const hasReloaded = window.sessionStorage.getItem('impulse_chunk_reload');
      if (!hasReloaded) {
        window.sessionStorage.setItem('impulse_chunk_reload', 'true');
        window.location.reload();
        return new Promise<{ default: T }>(() => {});
      }
      throw error;
    }
  });
}

const Events = lazyWithRetry(() => import('@/pages/Events'));
const CommunityPage = lazyWithRetry(() => import('@/pages/Community'));
const SharkHack = lazyWithRetry(() => import('@/pages/SharkHack'));
const Cohort = lazyWithRetry(() => import('@/pages/Cohort'));

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class RootErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('RootErrorBoundary caught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-space-950 flex flex-col items-center justify-center p-6 text-center select-none text-white">
          <div className="w-12 h-12 rounded-full border border-pink-500/30 flex items-center justify-center mb-4 text-pink-400 font-bold font-mono">
            !
          </div>
          <h2 className="text-xl font-bold font-sans mb-2">Something went wrong</h2>
          <p className="text-sm font-mono text-gray-400 max-w-md mb-6">
            The page encountered an unexpected issue while loading assets.
          </p>
          <button
            type="button"
            onClick={() => {
              window.sessionStorage.removeItem('impulse_chunk_reload');
              window.location.reload();
            }}
            className="px-5 py-2.5 rounded-xl bg-white text-space-950 font-bold text-xs uppercase tracking-wider hover:bg-gray-100 transition-colors shadow-lg"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function RouteLoadingFallback() {
  return (
    <div className="min-h-screen w-full bg-space-950 flex flex-col items-center justify-center p-6 select-none" aria-busy="true" aria-label="Loading page">
      <div className="relative flex items-center justify-center mb-6">
        <div className="w-12 h-12 rounded-full border border-impulse-blue/20 border-t-impulse-blue animate-spin" />
        <div className="absolute w-2 h-2 rounded-full bg-impulse-blue animate-pulse" />
      </div>
      <p className="font-mono-label text-xs tracking-[0.25em] text-impulse-blue-bright/70 animate-pulse">
        INITIALIZING IMPULSE ·
      </p>
    </div>
  );
}
import ScrollToTop from '@/components/ScrollToTop';
import SmoothScrollProvider from '@/providers/SmoothScrollProvider';

function PageTitle() {
  const location = useLocation();
  useEffect(() => {
    window.sessionStorage.removeItem('impulse_chunk_reload');
    const titles: Record<string, string> = {
      '/': 'IMPULSE: Ideas in Motion',
      '/events': 'Events | IMPULSE: Ideas in Motion',
      '/cohort': 'Builder Cohort | IMPULSE: Ideas in Motion',
      '/shark-hack': 'Shark Hack 2027 | IMPULSE: Ideas in Motion',
      '/events/shark-hack': 'Shark Hack 2027 | IMPULSE: Ideas in Motion',
      '/community': 'Community | IMPULSE: Ideas in Motion',
    };
    document.title = titles[location.pathname] || 'IMPULSE: Ideas in Motion';
  }, [location.pathname]);
  return null;
}

export default function App() {
  return (
    <RootErrorBoundary>
      <BrowserRouter>
        <SmoothScrollProvider>
          <ScrollToTop />
          <PageTitle />
          <Suspense fallback={<RouteLoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shark-hack" element={<SharkHack />} />
              <Route path="/events/shark-hack" element={<SharkHack />} />
              <Route path="/events" element={<Events />} />
              <Route path="/cohort" element={<Cohort />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </SmoothScrollProvider>
      </BrowserRouter>
    </RootErrorBoundary>
  );
}
