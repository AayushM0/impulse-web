import { useRef, useEffect, useCallback } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  pulsePhase: number;
  orbitAngle: number;
  orbitRadius: number;
  orbitSpeed: number;
  centerX: number;
  centerY: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface ImpulseFieldProps {
  density?: 'low' | 'medium' | 'high';
  showParticles?: boolean;
  showOrbital?: boolean;
  centralImpulse?: boolean;
  className?: string;
  interactive?: boolean;
  accentColor?: 'blue' | 'magenta' | 'mixed';
}

const COLORS = {
  blue: '59, 130, 246',
  blueBright: '96, 165, 250',
  indigo: '99, 102, 241',
  violet: '139, 92, 246',
  magenta: '236, 72, 153',
  coral: '248, 113, 113',
  white: '248, 250, 252',
};

export default function ImpulseField({
  density = 'medium',
  showParticles = true,
  showOrbital = true,
  centralImpulse = true,
  className = '',
  interactive = true,
  accentColor = 'mixed',
}: ImpulseFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const reducedMotionRef = useRef(false);

  const getNodeCount = useCallback((w: number, h: number, d: string) => {
    const area = w * h;
    const factor = d === 'high' ? 12000 : d === 'medium' ? 18000 : 28000;
    return Math.min(Math.floor(area / factor), 120);
  }, []);

  const getAccentColors = useCallback((accent: string) => {
    if (accent === 'blue') return [COLORS.blue, COLORS.blueBright, COLORS.indigo];
    if (accent === 'magenta') return [COLORS.magenta, COLORS.coral, COLORS.violet];
    return [COLORS.blue, COLORS.indigo, COLORS.magenta];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNodes();
    };

    const initNodes = () => {
      const count = getNodeCount(width, height, density);
      const accentColors = getAccentColors(accentColor);
      const cx = width / 2;
      const cy = height / 2;
      const maxOrbit = Math.min(width, height) * 0.42;

      nodesRef.current = Array.from({ length: count }, (_, i) => {
        const orbitRadius = 30 + Math.random() * maxOrbit;
        const orbitAngle = Math.random() * Math.PI * 2;
        const orbitSpeed = (0.0002 + Math.random() * 0.0008) * (Math.random() > 0.5 ? 1 : -1);
        const colorIdx = Math.floor(Math.random() * accentColors.length);
        const isAccent = Math.random() > 0.75;
        const baseRadius = isAccent ? 1.5 + Math.random() * 1.5 : 1 + Math.random();

        return {
          x: cx + Math.cos(orbitAngle) * orbitRadius,
          y: cy + Math.sin(orbitAngle) * orbitRadius,
          vx: 0,
          vy: 0,
          radius: baseRadius,
          baseRadius,
          color: isAccent ? accentColors[colorIdx] : COLORS.white,
          pulsePhase: Math.random() * Math.PI * 2,
          orbitAngle,
          orbitRadius,
          orbitSpeed,
          centerX: cx,
          centerY: cy,
        };
      });
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener('mousemove', handleMouse);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const connectionDistance = 130;
    const reduced = reducedMotionRef.current;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const cx = width / 2;
      const cy = height / 2;
      const accentColors = getAccentColors(accentColor);

      // Update nodes
      for (const node of nodes) {
        if (!reduced) {
          node.orbitAngle += node.orbitSpeed;
          node.pulsePhase += 0.01;
        }

        const targetX = node.centerX + Math.cos(node.orbitAngle) * node.orbitRadius;
        const targetY = node.centerY + Math.sin(node.orbitAngle) * node.orbitRadius;

        node.x += (targetX - node.x) * 0.02;
        node.y += (targetY - node.y) * 0.02;

        if (interactive && mouse.active) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && dist > 0) {
            const force = (1 - dist / 150) * 2;
            node.x += (dx / dist) * force;
            node.y += (dy / dist) * force;
            node.radius = node.baseRadius * (1 + (1 - dist / 150) * 2);
          } else {
            node.radius += (node.baseRadius - node.radius) * 0.1;
          }
        } else {
          node.radius += (node.baseRadius - node.radius) * 0.1;
        }
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.25;
            const isNearMouse = interactive && mouse.active &&
              Math.hypot((nodes[i].x + nodes[j].x) / 2 - mouse.x, (nodes[i].y + nodes[j].y) / 2 - mouse.y) < 200;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = isNearMouse
              ? `rgba(${accentColors[0]}, ${opacity * 2.5})`
              : `rgba(${COLORS.indigo}, ${opacity})`;
            ctx.lineWidth = isNearMouse ? 0.8 : 0.4;
            ctx.stroke();
          }
        }
      }

      // Draw connections to center
      if (centralImpulse) {
        for (const node of nodes) {
          const distToCenter = Math.hypot(node.x - cx, node.y - cy);
          if (distToCenter < 200) {
            const opacity = (1 - distToCenter / 200) * 0.15;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(cx, cy);
            ctx.strokeStyle = `rgba(${COLORS.blue}, ${opacity})`;
            ctx.lineWidth = 0.3;
            ctx.stroke();
          }
        }
      }

      // Draw orbital curves
      if (showOrbital && !reduced) {
        const time = Date.now() * 0.0003;
        for (let i = 0; i < 3; i++) {
          const r = Math.min(width, height) * (0.2 + i * 0.12);
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${COLORS.indigo}, ${0.04 + Math.sin(time + i) * 0.02})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const pulse = reduced ? 1 : (0.7 + Math.sin(node.pulsePhase) * 0.3);
        const r = Math.max(0.5, node.radius * pulse);

        // Glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 4);
        gradient.addColorStop(0, `rgba(${node.color}, ${0.4 * pulse})`);
        gradient.addColorStop(1, `rgba(${node.color}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(${node.color}, ${0.8 * pulse})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw central impulse
      if (centralImpulse) {
        const time = reduced ? 0.5 : Date.now() * 0.001;
        const pulseSize = 6 + Math.sin(time * 2) * 2;

        // Outer glow
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80);
        glow.addColorStop(0, `rgba(${COLORS.white}, 0.3)`);
        glow.addColorStop(0.2, `rgba(${COLORS.blue}, 0.15)`);
        glow.addColorStop(0.5, `rgba(${COLORS.indigo}, 0.05)`);
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cx, cy, 80, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(${COLORS.white}, 0.9)`;
        ctx.beginPath();
        ctx.arc(cx, cy, pulseSize, 0, Math.PI * 2);
        ctx.fill();

        // Bright center
        ctx.fillStyle = `rgba(${COLORS.blueBright}, 0.8)`;
        ctx.beginPath();
        ctx.arc(cx, cy, pulseSize * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Starburst lines
        if (!reduced) {
          const rays = 6;
          for (let i = 0; i < rays; i++) {
            const angle = (i / rays) * Math.PI * 2 + time * 0.3;
            const len = 20 + Math.sin(time + i) * 10;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
            ctx.strokeStyle = `rgba(${COLORS.blue}, ${0.3 + Math.sin(time + i) * 0.1})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Spawn particles
      if (showParticles && !reduced && particles.length < 40 && Math.random() > 0.5) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.3 + Math.random() * 0.8;
        const isMagenta = Math.random() > 0.7;
        particles.push({
          x: cx + Math.cos(angle) * 5,
          y: cy + Math.sin(angle) * 5,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 80 + Math.random() * 120,
          color: isMagenta ? COLORS.magenta : COLORS.blue,
          size: 0.5 + Math.random() * 1,
        });
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.life > p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        const lifeRatio = p.life / p.maxLife;
        const opacity = (1 - lifeRatio) * 0.6;

        ctx.fillStyle = `rgba(${p.color}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouse);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [density, showParticles, showOrbital, centralImpulse, interactive, accentColor, getNodeCount, getAccentColors]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
