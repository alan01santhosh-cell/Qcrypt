import React, { useEffect, useRef } from 'react';

export const QuantumLatticeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Mouse coordinates for quantum measurement / perturbation
    const mouse = {
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
      radius: 160,
      isHovering: false
    };

    interface Qubit {
      id: number;
      baseX: number;
      baseY: number;
      x: number;
      y: number;
      radius: number;
      // Quantum superposition parameters
      theta: number; // Bloch sphere polar angle [0, PI]
      phi: number; // Bloch sphere azimuthal phase [0, 2*PI]
      omega: number; // Phase precession angular velocity
      amplitude: number; // Probability amplitude
      stateLabel: string;
      isMajorHub: boolean;
      entangledWith: number | null; // Index of entangled partner qubit
      measured: boolean; // Measurement collapse state
      collapseProgress: number;
    }

    interface QuantumPacket {
      sourceIndex: number;
      targetIndex: number;
      progress: number;
      speed: number;
      color: string;
    }

    let qubits: Qubit[] = [];
    let packets: QuantumPacket[] = [];

    const initQuantumField = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);

      qubits = [];
      packets = [];

      // Grid spacing adjusted for viewport
      const spacing = Math.max(55, Math.floor(width / (width < 640 ? 8 : 16)));
      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;

      let idCounter = 0;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const baseX = (i - 1) * spacing + ((j % 2) * spacing * 0.5);
          const baseY = (j - 1) * spacing;
          const isMajorHub = (i * 7 + j * 13) % 9 === 0;

          // Quantum state labels
          const labels = ['|0⟩', '|1⟩', '|ψ⟩', '|Φ⁺⟩', '|Ψ⁻⟩', '|+\u27E9'];
          const stateLabel = labels[(i + j) % labels.length];

          qubits.push({
            id: idCounter++,
            baseX,
            baseY,
            x: baseX,
            y: baseY,
            radius: isMajorHub ? 3.5 : 1.75,
            theta: Math.random() * Math.PI,
            phi: Math.random() * Math.PI * 2,
            omega: (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
            amplitude: Math.random() * 0.5 + 0.5,
            stateLabel,
            isMajorHub,
            entangledWith: null,
            measured: false,
            collapseProgress: 0
          });
        }
      }

      // Establish Entangled Bell Pairs between neighboring qubits
      for (let i = 0; i < qubits.length; i++) {
        if (qubits[i].isMajorHub && qubits[i].entangledWith === null) {
          // Find closest major hub within range
          let closestIdx = -1;
          let closestDist = 180;
          for (let j = i + 1; j < qubits.length; j++) {
            if (qubits[j].isMajorHub && qubits[j].entangledWith === null) {
              const dx = qubits[i].baseX - qubits[j].baseX;
              const dy = qubits[i].baseY - qubits[j].baseY;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < closestDist) {
                closestDist = dist;
                closestIdx = j;
              }
            }
          }

          if (closestIdx !== -1) {
            qubits[i].entangledWith = closestIdx;
            qubits[closestIdx].entangledWith = i;

            // Spawn quantum coherence packets along the entanglement bridge
            packets.push({
              sourceIndex: i,
              targetIndex: closestIdx,
              progress: Math.random(),
              speed: 0.008 + Math.random() * 0.008,
              color: '#00f0ff'
            });
          }
        }
      }
    };

    initQuantumField();

    const handleResize = () => {
      initQuantumField();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -2000;
      mouse.targetY = -2000;
      mouse.isHovering = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.isHovering = true;
      }
    };

    const handleTouchEnd = () => {
      mouse.targetX = -2000;
      mouse.targetY = -2000;
      mouse.isHovering = false;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    let lastTime = performance.now();
    let globalPhase = 0;

    const render = (now: number) => {
      // Calculate delta time for consistent 60fps physics
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      globalPhase += dt * 1.5;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      // 1. Update Qubit Superposition & Wave Dynamics
      for (let i = 0; i < qubits.length; i++) {
        const q = qubits[i];

        // Continuous Bloch sphere phase precession
        q.phi += q.omega;

        // Wave function harmonic oscillation
        const waveX = Math.sin(globalPhase + q.phi) * 4.5;
        const waveY = Math.cos(globalPhase * 0.85 + q.theta) * 4.5;

        // Observer effect: Measurement perturbation when cursor enters proximity
        const dx = (q.baseX + waveX) - mouse.x;
        const dy = (q.baseY + waveY) - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && mouse.isHovering) {
          // Measurement collapse: State resolves towards deterministic pole
          q.measured = true;
          q.collapseProgress = Math.min(1, q.collapseProgress + dt * 4);

          // Quantum state perturbation / repulsion
          const force = (1 - dist / mouse.radius) * 26;
          const angle = Math.atan2(dy, dx);
          q.x = q.baseX + waveX + Math.cos(angle) * force;
          q.y = q.baseY + waveY + Math.sin(angle) * force;

          // Entangled partner reacts synchronously (Bell correlation)
          if (q.entangledWith !== null) {
            const partner = qubits[q.entangledWith];
            partner.measured = true;
            partner.collapseProgress = Math.min(1, partner.collapseProgress + dt * 3);
          }
        } else {
          // Return smoothly to superposition
          q.measured = false;
          q.collapseProgress = Math.max(0, q.collapseProgress - dt * 2);
          q.x = q.baseX + waveX;
          q.y = q.baseY + waveY;
        }
      }

      // 2. Render Quantum Entanglement Channels (Bell State Bridges)
      ctx.lineWidth = 1;
      for (let i = 0; i < qubits.length; i++) {
        const q1 = qubits[i];
        if (q1.entangledWith !== null && q1.entangledWith > i) {
          const q2 = qubits[q1.entangledWith];

          // Dynamic entangled bridge glow
          const grad = ctx.createLinearGradient(q1.x, q1.y, q2.x, q2.y);
          const coherenceAlpha = 0.25 + Math.sin(globalPhase * 2 + q1.phi) * 0.15;
          grad.addColorStop(0, `rgba(0, 240, 255, ${coherenceAlpha})`);
          grad.addColorStop(0.5, `rgba(99, 102, 241, ${coherenceAlpha * 1.4})`);
          grad.addColorStop(1, `rgba(16, 185, 129, ${coherenceAlpha})`);

          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.setLineDash([4, 4]);
          ctx.moveTo(q1.x, q1.y);
          ctx.lineTo(q2.x, q2.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // 3. Render Traveling Quantum Wave Packets / Photons
      for (let p = 0; p < packets.length; p++) {
        const packet = packets[p];
        packet.progress = (packet.progress + packet.speed) % 1;

        const qA = qubits[packet.sourceIndex];
        const qB = qubits[packet.targetIndex];

        const px = qA.x + (qB.x - qA.x) * packet.progress;
        const py = qA.y + (qB.y - qA.y) * packet.progress;

        // Draw photon wave packet with glow
        ctx.fillStyle = '#00f0ff';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 4. Render Neighboring Lattice Interference Links
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 0.6;
      for (let i = 0; i < qubits.length; i++) {
        const q = qubits[i];
        for (let j = i + 1; j < qubits.length; j++) {
          const q2 = qubits[j];
          const dx = q.x - q2.x;
          const dy = q.y - q2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 85) {
            ctx.beginPath();
            ctx.moveTo(q.x, q.y);
            ctx.lineTo(q2.x, q2.y);
            ctx.stroke();
          }
        }
      }

      // 5. Render Qubits with Bloch Halos & Superposition States
      for (let i = 0; i < qubits.length; i++) {
        const q = qubits[i];

        // Superposition probability calculation (|0⟩ cyan vs |1⟩ indigo)
        const prob0 = Math.cos(q.theta / 2) ** 2; // Probability of |0⟩
        const prob1 = 1 - prob0; // Probability of |1⟩

        // Shifting quantum energy color
        const r = Math.round(129 * prob1);
        const g = Math.round(240 * prob0 + 140 * prob1);
        const b = Math.round(255 * prob0 + 248 * prob1);
        const qubitColor = `rgb(${r}, ${g}, ${b})`;

        // Draw Qubit core
        ctx.fillStyle = qubitColor;
        ctx.beginPath();
        ctx.arc(q.x, q.y, q.radius + (q.measured ? 1 : 0), 0, Math.PI * 2);
        ctx.fill();

        // Major hubs: render rotating Bloch orbital ring & quantum state label
        if (q.isMajorHub) {
          // Luminous core glow
          ctx.shadowColor = qubitColor;
          ctx.shadowBlur = q.measured ? 16 : 8;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(q.x, q.y, 1.25, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Bloch orbital ring (quantum probability halo)
          const ringRadius = 10 + Math.sin(globalPhase + q.phi) * 2;
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.25 + q.collapseProgress * 0.4})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.ellipse(q.x, q.y, ringRadius, ringRadius * 0.4, q.phi, 0, Math.PI * 2);
          ctx.stroke();

          // Render Microscopic Quantum Notation (e.g. |0⟩, |1⟩, |ψ⟩)
          ctx.font = '9px "JetBrains Mono", monospace';
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.55 + q.collapseProgress * 0.4})`;
          ctx.fillText(q.stateLabel, q.x + 9, q.y - 6);
        }
      }

      // ALWAYS request next frame continuously without interruption
      animationFrameId = requestAnimationFrame(render);
    };

    // Start continuous animation loop
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-0 opacity-70 mix-blend-screen"
      aria-hidden="true"
    />
  );
};
