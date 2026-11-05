import { useEffect, useRef } from 'react';
import { Github, Instagram, Linkedin } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import './ConnectWithUs.css';

const channels = [
  { name: 'GitHub', href: 'https://github.com/impulse-community', Icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/impulse/', Icon: Linkedin },
  { name: 'Instagram', href: 'https://www.instagram.com/the_impuls.e/', Icon: Instagram },
];

interface Particle {
  x: number;
  speed: number;
  size: number;
  track: 0 | 1;
  phase: number;
  color: string;
  alpha: number;
}

interface Comet {
  progress: number;
  speed: number;
  track: 0 | 1;
  color: string;
  size: number;
  history: Array<{ x: number; y: number }>;
}

export default function ConnectWithUs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: sectionRef, isVisible } = useReveal<HTMLElement>({
    threshold: 0.12,
    rootMargin: '0px 0px -18% 0px',

  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const mouse = { x: -1000, y: -1000, active: false };

    // Wave formulas centered in the canvas
    const getWaveY = (x: number, time: number, track: 0 | 1) => {
      const cy = height * 0.52;
      if (track === 0) {
        // Cyan-blue wave
        return (
          cy +
          Math.sin(x * 0.009 + time * 1.8) * 16 +
          Math.cos(x * 0.018 - time * 1.2) * 8
        );
      } else {
        // Magenta-pink counter-wave
        return (
          cy +
          Math.sin(x * 0.011 - time * 1.5 + 1.2) * 15 +
          Math.sin(x * 0.02 + time * 0.9) * 7
        );
      }
    };

    // Initialize stream particles
    const particleColors = [
      'rgba(96, 165, 250, ',
      'rgba(56, 189, 248, ',
      'rgba(244, 114, 182, ',
      'rgba(232, 121, 249, ',
      'rgba(255, 255, 255, ',
    ];

    const particles: Particle[] = Array.from({ length: 42 }, () => ({
      x: Math.random() * 800,
      speed: 0.8 + Math.random() * 1.4,
      size: 1.2 + Math.random() * 1.8,
      track: Math.random() > 0.5 ? 0 : 1,
      phase: Math.random() * Math.PI * 2,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      alpha: 0.35 + Math.random() * 0.65,
    }));

    // Initialize fast-moving impulse comets
    const comets: Comet[] = [
      {
        progress: 0,
        speed: 0.0035,
        track: 0,
        color: '#60A5FA',
        size: 3.5,
        history: [],
      },
      {
        progress: 0.5,
        speed: 0.003,
        track: 1,
        color: '#F472B6',
        size: 3.5,
        history: [],
      },
      {
        progress: 0.25,
        speed: 0.0042,
        track: 0,
        color: '#FFFFFF',
        size: 2.2,
        history: [],
      },
    ];

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(rect.width, 320);
      height = 96;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    let startTime = performance.now();

    const render = (now: number) => {
      const time = (now - startTime) * 0.001;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw glowing wave ribbons (smooth bezier paths)
      for (const track of [0, 1] as const) {
        ctx.beginPath();
        const step = 8;
        for (let x = -20; x <= width + 20; x += step) {
          let y = getWaveY(x, time, track);
          // Mouse gentle attraction
          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 110) {
              const pull = (1 - dist / 110) * 12;
              y += (mouse.y - y) * 0.15 * (pull / 12);
            }
          }
          if (x === -20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const waveGrad = ctx.createLinearGradient(0, 0, width, 0);
        if (track === 0) {
          waveGrad.addColorStop(0, 'rgba(59, 130, 246, 0)');
          waveGrad.addColorStop(0.2, 'rgba(96, 165, 250, 0.45)');
          waveGrad.addColorStop(0.5, 'rgba(147, 197, 253, 0.65)');
          waveGrad.addColorStop(0.8, 'rgba(232, 121, 249, 0.45)');
          waveGrad.addColorStop(1, 'rgba(59, 130, 246, 0)');
          ctx.strokeStyle = waveGrad;
          ctx.lineWidth = 1.8;
          ctx.shadowColor = '#60a5fa';
          ctx.shadowBlur = 9;
        } else {
          waveGrad.addColorStop(0, 'rgba(219, 39, 119, 0)');
          waveGrad.addColorStop(0.25, 'rgba(244, 114, 182, 0.4)');
          waveGrad.addColorStop(0.55, 'rgba(244, 63, 94, 0.55)');
          waveGrad.addColorStop(0.85, 'rgba(168, 85, 247, 0.4)');
          waveGrad.addColorStop(1, 'rgba(219, 39, 119, 0)');
          ctx.strokeStyle = waveGrad;
          ctx.lineWidth = 1.4;
          ctx.shadowColor = '#f472b6';
          ctx.shadowBlur = 8;
        }

        ctx.stroke();
      }

      ctx.shadowBlur = 0;

      // 2. Draw dynamic constellation links between nearby particles
      const activePositions: Array<{ x: number; y: number; color: string; alpha: number }> = [];

      for (const p of particles) {
        p.x += p.speed;
        if (p.x > width + 30) {
          p.x = -30;
          p.track = Math.random() > 0.5 ? 0 : 1;
        }

        let y = getWaveY(p.x, time, p.track);
        if (mouse.active) {
          const dist = Math.hypot(p.x - mouse.x, y - mouse.y);
          if (dist < 100) {
            y += (mouse.y - y) * 0.18 * (1 - dist / 100);
          }
        }

        activePositions.push({ x: p.x, y, color: p.color, alpha: p.alpha });
      }

      // Connect nearby particles with subtle filaments
      ctx.lineWidth = 0.75;
      for (let i = 0; i < activePositions.length; i++) {
        for (let j = i + 1; j < activePositions.length; j++) {
          const p1 = activePositions[i];
          const p2 = activePositions[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 48) {
            const linkAlpha = (1 - dist / 48) * 0.28;
            ctx.strokeStyle = `rgba(147, 197, 253, ${linkAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 3. Draw stream particles
      for (const p of activePositions) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      }

      // 4. Draw energetic impulse comets with glowing gradient tails
      for (const comet of comets) {
        comet.progress += comet.speed;
        if (comet.progress > 1) {
          comet.progress = 0;
          comet.history = [];
        }

        const cx = comet.progress * (width + 120) - 60;
        const cy = getWaveY(cx, time, comet.track);

        comet.history.unshift({ x: cx, y: cy });
        if (comet.history.length > 16) {
          comet.history.pop();
        }

        // Draw comet tail
        for (let i = 0; i < comet.history.length - 1; i++) {
          const pt1 = comet.history[i];
          const pt2 = comet.history[i + 1];
          const tAlpha = (1 - i / comet.history.length) * 0.65;
          const tWidth = (1 - i / comet.history.length) * (comet.size * 0.9);

          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.strokeStyle = comet.color;
          ctx.lineWidth = tWidth;
          ctx.globalAlpha = tAlpha;
          ctx.stroke();
        }

        ctx.globalAlpha = 1;

        // Draw comet head
        ctx.beginPath();
        ctx.arc(cx, cy, comet.size, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = comet.color;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="community-connect-title"
      className={`community-connect-section${isVisible ? ' is-visible' : ''}`}
      aria-labelledby="community-connect-heading"
    >
      <div className="community-connect-backdrop" aria-hidden="true" />

      <div className="community-connect-content">
        <div ref={containerRef} className="community-connect-hero-unit">
          {/* Interactive Neural Energy Canvas floating gracefully above the heading */}
          <div className="community-connect-canvas-frame" aria-hidden="true">
            <div className="community-connect-canvas-glow" />
            <canvas ref={canvasRef} className="community-connect-canvas" />
          </div>

          <h2 id="community-connect-heading" className="community-connect-title">
            <span className="community-connect-gradient">Connect with Us</span>
            <span className="community-connect-underline-beam" aria-hidden="true" />
            <i className="community-connect-title-dot community-connect-title-dot-left" />
            <i className="community-connect-title-dot community-connect-title-dot-right" />
          </h2>
        </div>

        <p className="community-connect-kicker">
          <span className="community-connect-kicker-dot" aria-hidden="true" />
          <span className="community-connect-label">Find Your People</span>
        </p>
        <p className="community-connect-copy">
          Follow the ideas, projects and people shaping our community.
        </p>

        <nav className="community-connect-links" aria-label="Community social channels">
          {channels.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="community-connect-link"
            >
              <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
              <span>{name}</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
