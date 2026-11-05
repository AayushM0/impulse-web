import { useEffect, useRef } from 'react';
import './EventsMeshBackground.css';

/** Three flowing, dotted surfaces based on the supplied motion reference. */
export default function EventsMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const palette = getComputedStyle(canvas);
    const blue = palette.getPropertyValue('--events-blue').trim();
    const pink = palette.getPropertyValue('--events-pink').trim();
    let width = 0;
    let height = 0;
    let visible = false;
    let frame = 0;
    let lastTime = 0;
    let elapsed = 0;

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const mobile = width < 768;
      const columns = Math.min(260, Math.ceil(width / (mobile ? 7 : 8)));
      const rows = mobile ? 12 : 18;
      const time = elapsed * 0.001;

      for (let band = 0; band < 3; band++) {
        context.fillStyle = band === 2 ? pink : blue;
        const phase = band * 2.1;
        for (let column = 0; column <= columns; column++) {
          const u = column / columns;
          const sweep = u * Math.PI * 2;
          const twist = sweep * 1.2 - time * .36 + phase;
          const ripple = Math.sin(sweep - time * .32 + phase);
          const base = band === 0
            ? .19 + ripple * .045 + Math.sin(sweep * 1.6 + time * .18) * .018
            : band === 1
              ? .70 - u * .23 + ripple * .065
              : .84 + ripple * .045;
          const breadth = Math.min(height * .075, mobile ? 42 : 68);
          const fold = Math.cos(twist);
          const light = .65 + .35 * Math.sin(sweep * 1.5 + time * .42 + phase);

          for (let row = 0; row <= rows; row++) {
            const v = (row / rows - .5) * 2;
            const x = (u * 1.12 - .06) * width + v * Math.sin(twist) * breadth * .42;
            const y = base * height + v * fold * breadth + v * v * Math.sin(twist) * breadth * .26;
            if (x < -2 || x > width + 2 || y < 0 || y > height) continue;

            // Attenuate the field around the hero copy, keeping the outer folds visible.
            const dx = (x / width - .5) / (mobile ? .48 : .32);
            const dy = (y / height - .46) / .30;
            const quietCenter = 1 - .97 * Math.exp(-(dx * dx + dy * dy) * 1.5);
            const edge = Math.pow(1 - Math.abs(v), .65);
            const alpha = (.09 + edge * .43) * light * quietCenter;
            const radius = (mobile ? .65 : .75) + edge * .35;
            context.globalAlpha = alpha;
            context.beginPath();
            context.arc(x, y, radius, 0, Math.PI * 2);
            context.fill();

            // A restrained halo on the crests gives depth without a blurred background.
            if (row % 3 === 0 && column % 2 === 0 && edge > .5) {
              context.globalAlpha = alpha * .1;
              context.beginPath();
              context.arc(x, y, radius * 2.5, 0, Math.PI * 2);
              context.fill();
            }
          }
        }
      }
      context.globalAlpha = 1;
    };

    const tick = (now: number) => {
      // Cap at 30 fps; the surfaces move slowly and do not need 60 repaints per second.
      if (!lastTime || now - lastTime >= 1000 / 30) {
        elapsed += lastTime ? Math.min(now - lastTime, 100) : 0;
        lastTime = now;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      lastTime = 0;
      const running = visible && !document.hidden && !motion.matches;
      canvas.dataset.running = String(running);
      if (running) frame = requestAnimationFrame(tick);
      else if (visible && !document.hidden) draw();
    };
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const density = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * density);
      canvas.height = Math.round(height * density);
      context.setTransform(density, 0, 0, density, 0, 0);
      draw();
    };
    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) canvas.dataset.entered = 'true';
      sync();
    });
    resize();
    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    document.addEventListener('visibilitychange', sync);
    motion.addEventListener('change', sync);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', sync);
      motion.removeEventListener('change', sync);
    };
  }, []);

  return <canvas ref={canvasRef} className="events-mesh-background" aria-hidden="true" />;
}
