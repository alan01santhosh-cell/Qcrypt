import { useEffect, useRef } from 'react';

export const QuantumLatticeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;

    // Mouse coordinates for interactive distortion
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 140 };

    interface Node {
      baseX: number;
      baseY: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      phase: number;
      color: string;
      isBasis: boolean;
    }

    let nodes: Node[] = [];

    const initGrid = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      nodes = [];
      const spacing = Math.max(45, Math.floor(width / (width < 640 ? 12 : 24)));
      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const baseX = (i - 1) * spacing + ((j % 2) * spacing * 0.5);
          const baseY = (j - 1) * spacing;
          const isBasis = (i + j) % 5 === 0;

          nodes.push({
            baseX,
            baseY,
            x: baseX,
            y: baseY,
            vx: 0,
            vy: 0,
            radius: isBasis ? 2.5 : 1.25,
            phase: Math.random() * Math.PI * 2,
            color: isBasis ? '#00f0ff' : 'rgba(255, 255, 255, 0.25)',
            isBasis
          });
        }
      }
    };

    initGrid();

    const handleResize = () => {
      initGrid();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.targetX = e.touches[0].clientX - rect.left;
        mouse.targetY = e.touches[0].clientY - rect.top;
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // IntersectionObserver to pause loop when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !animationFrameId && !prefersReducedMotion) {
            render();
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    let time = 0;

    const render = () => {
      if (!isVisible) return;

      time += 0.015;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle lattice lines between neighboring basis points
      ctx.lineWidth = 0.75;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Harmonic oscillation simulating quantum wave probability
        const waveX = Math.sin(time + node.phase) * 2;
        const waveY = Math.cos(time * 0.8 + node.phase) * 2;

        // Mouse displacement physics
        const dx = (node.baseX + waveX) - mouse.x;
        const dy = (node.baseY + waveY) - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 0) {
          const force = (1 - dist / mouse.radius) * 22;
          const angle = Math.atan2(dy, dx);
          node.x = node.baseX + waveX + Math.cos(angle) * force;
          node.y = node.baseY + waveY + Math.sin(angle) * force;
        } else {
          node.x = node.baseX + waveX;
          node.y = node.baseY + waveY;
        }

        // Connect basis nodes to nearby basis nodes
        if (node.isBasis) {
          for (let j = i + 1; j < nodes.length; j++) {
            const other = nodes[j];
            if (!other.isBasis) continue;
            const ndx = node.x - other.x;
            const ndy = node.y - other.y;
            const nDist = Math.sqrt(ndx * ndx + ndy * ndy);

            if (nDist < 110) {
              const alpha = (1 - nDist / 110) * 0.22;
              ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        if (node.isBasis) {
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 8;
          ctx.fillStyle = '#00f0ff';
          ctx.beginPath();
          ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Initial render
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-45 mix-blend-screen"
      aria-hidden="true"
    />
  );
};
