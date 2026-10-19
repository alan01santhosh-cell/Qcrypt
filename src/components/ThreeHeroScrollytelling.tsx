import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  RotateCcw,
  Layers,
  Eye,
  Terminal,
  ArrowRight,
  Radio
} from 'lucide-react';

export interface Hotspot {
  id: string;
  name: string;
  stage: number;
  position: [number, number, number];
  title: string;
  tag: string;
  tagColor: string;
  description: string;
  spec: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'qubit-core',
    name: 'Transmon QPU',
    stage: 0,
    position: [0, 0, 0],
    title: 'Superconducting Transmon Core',
    tag: '15 mK Dilution Unit',
    tagColor: 'text-cyan-400 bg-cyan-950/70 border-cyan-500/40',
    description: 'Central quantum processor executing phase estimation algorithms against discrete logarithm and integer factorization problems.',
    spec: 'Qubit Coherence: 120 μs · Superconducting Coaxial Busses: 32ch'
  },
  {
    id: 'hndl-threat',
    name: 'Exposed Primitive',
    stage: 1,
    position: [-2.6, 1.2, 0.8],
    title: 'Transitive RSA-2048 Register',
    tag: 'Shor Vulnerable (HNDL)',
    tagColor: 'text-rose-400 bg-rose-950/70 border-rose-500/40',
    description: 'Cryptographic primitive located deep in third-party auth dependencies. Traffic encrypted today is archived by adversaries for retrospective decryption.',
    spec: 'Shor Complexity: Polynomial Time · Interception Risk: Critical (Rank 1)'
  },
  {
    id: 'pqc-lattice',
    name: 'NIST ML-KEM Shield',
    stage: 2,
    position: [2.5, -0.8, -0.6],
    title: 'Module-Lattice Shield Matrix',
    tag: 'FIPS 203 Benchmark',
    tagColor: 'text-emerald-400 bg-emerald-950/70 border-emerald-500/40',
    description: 'High-dimensional crystalline lattice matrix. Mathematical security is grounded in the hardness of Learning With Errors (LWE) over module lattices.',
    spec: 'NIST Security Level 3 (ML-KEM-768) · Quantum Speedup Resistance: Exponential'
  },
  {
    id: 'cbom-sensor',
    name: 'AST CBOM Scanner',
    stage: 3,
    position: [0, 2.4, -1.2],
    title: 'Automated CBOM Sensor',
    tag: 'CycloneDX 1.6 Output',
    tagColor: 'text-indigo-400 bg-indigo-950/70 border-indigo-500/40',
    description: 'Continuous static code analysis pipeline generating standardized Cryptographic Bills of Materials across monorepos and microservices.',
    spec: 'Scanning Velocity: >18k SLOC/sec · Zero Source Code Uploads Required'
  }
];

interface ThreeHeroScrollytellingProps {
  onOpenDemo: () => void;
  onOpenContact: () => void;
  onExploreArchitecture?: () => void;
}

export function ThreeHeroScrollytelling({
  onOpenDemo,
  onOpenContact,
  onExploreArchitecture = () => {}
}: ThreeHeroScrollytellingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Scrollytelling & 3D state
  const [currentChapter, setCurrentChapter] = useState<number>(0);
  const [explodedView, setExplodedView] = useState<boolean>(false);
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [hotspotScreenCoords, setHotspotScreenCoords] = useState<{ [key: string]: { x: number; y: number; visible: boolean } }>({});
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);

  // Explodable part groups
  const topPlateGroupRef = useRef<THREE.Group | null>(null);
  const bottomChamberGroupRef = useRef<THREE.Group | null>(null);
  const coreCageRef = useRef<THREE.Mesh | null>(null);
  const coreIcosahedronRef = useRef<THREE.Mesh | null>(null);
  const latticeShieldGroupRef = useRef<THREE.Group | null>(null);
  const satelliteRegistersRef = useRef<THREE.Group[]>([]);
  const laserStreamsRef = useRef<THREE.Line[]>([]);
  const scannerPlaneRef = useRef<THREE.Mesh | null>(null);

  // Animation values with spring damping
  const animStateRef = useRef({
    currentExplosion: 0,
    targetExplosion: 0,
    targetCameraPos: new THREE.Vector3(0, 0, 7.5),
    targetCameraLookAt: new THREE.Vector3(0, 0, 0),
    mousePos: new THREE.Vector2(0, 0),
    targetMousePos: new THREE.Vector2(0, 0),
    isDragging: false,
    dragStart: new THREE.Vector2(0, 0),
    manualRotation: new THREE.Euler(0, 0, 0)
  });

  // Calculate hotspot 2D projections
  const updateHotspotProjections = useCallback(() => {
    if (!cameraRef.current || !containerRef.current) return;
    const camera = cameraRef.current;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const widthHalf = rect.width / 2;
    const heightHalf = rect.height / 2;

    const coords: { [key: string]: { x: number; y: number; visible: boolean } } = {};

    HOTSPOTS.forEach((spot) => {
      const pos = new THREE.Vector3(...spot.position);
      // If exploded, offset positions accordingly
      if (animStateRef.current.currentExplosion > 0.05) {
        const offset = animStateRef.current.currentExplosion * 1.2;
        pos.x += Math.sign(pos.x) * offset * 0.4;
        pos.y += Math.sign(pos.y) * offset * 0.6;
        pos.z += Math.sign(pos.z) * offset * 0.4;
      }

      pos.applyEuler(modelGroupRef.current ? modelGroupRef.current.rotation : new THREE.Euler());
      pos.project(camera);

      // Check if in front of camera
      const isVisible = pos.z < 1.0;
      const x = pos.x * widthHalf + widthHalf;
      const y = -(pos.y * heightHalf) + heightHalf;

      coords[spot.id] = { x, y, visible: isVisible };
    });

    setHotspotScreenCoords(coords);
  }, []);

  // Initialize Three.js WebGL Scene
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x02040a, 0.045);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;

    // Lighting (Dark-Tech Cyber Aesthetic)
    const ambientLight = new THREE.AmbientLight(0x081528, 2.5);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 4.0, 15);
    cyanLight.position.set(3, 4, 3);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x9d4edd, 3.5, 15);
    violetLight.position.set(-3, -3, 2);
    scene.add(violetLight);

    const emeraldLight = new THREE.PointLight(0x10b981, 3.0, 15);
    emeraldLight.position.set(0, -4, 4);
    scene.add(emeraldLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.2);
    rimLight.position.set(0, 6, -5);
    scene.add(rimLight);

    // Root Model Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // --- PART 1: Top Cryostat Chandelier Assembly ---
    const topPlateGroup = new THREE.Group();
    modelGroup.add(topPlateGroup);
    topPlateGroupRef.current = topPlateGroup;

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.25,
      wireframe: false
    });

    const titaniumMaterial = new THREE.MeshStandardMaterial({
      color: 0x242e42,
      metalness: 0.85,
      roughness: 0.35,
      wireframe: false
    });

    const cyanGlowMaterial = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      wireframe: false
    });

    const emeraldGlowMaterial = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x10b981,
      emissiveIntensity: 0.7,
      roughness: 0.1,
      wireframe: false
    });

    // Top suspension stage plates (concentric rings)
    [2.2, 1.8, 1.4].forEach((radius, idx) => {
      const plateGeo = new THREE.CylinderGeometry(radius, radius, 0.08, 36);
      const plate = new THREE.Mesh(plateGeo, idx === 0 ? titaniumMaterial : goldMaterial);
      plate.position.y = 1.8 + idx * 0.45;
      topPlateGroup.add(plate);

      // Glowing rim ring
      const ringGeo = new THREE.TorusGeometry(radius + 0.04, 0.02, 16, 64);
      const ring = new THREE.Mesh(ringGeo, cyanGlowMaterial);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 1.8 + idx * 0.45;
      topPlateGroup.add(ring);
    });

    // Vertical superconducting gold bus pipes
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const x = Math.cos(angle) * 1.5;
      const z = Math.sin(angle) * 1.5;
      const pipeGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.4, 12);
      const pipe = new THREE.Mesh(pipeGeo, goldMaterial);
      pipe.position.set(x, 2.2, z);
      topPlateGroup.add(pipe);
    }

    // --- PART 2: Central Quantum Core Chamber ---
    // Outer Geodesic Cage
    const cageGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const cageMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const coreCage = new THREE.Mesh(cageGeo, cageMat);
    modelGroup.add(coreCage);
    coreCageRef.current = coreCage;

    // Glowing Inner Qubit Core Crystal
    const coreCrystalGeo = new THREE.OctahedronGeometry(0.7, 0);
    const coreCrystalMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.8,
      metalness: 0.3,
      roughness: 0.1,
      transparent: true,
      opacity: 0.85
    });
    const coreIcosahedron = new THREE.Mesh(coreCrystalGeo, coreCrystalMat);
    modelGroup.add(coreIcosahedron);
    coreIcosahedronRef.current = coreIcosahedron;

    // --- PART 3: Bottom Cryostat Shield Chamber ---
    const bottomChamberGroup = new THREE.Group();
    modelGroup.add(bottomChamberGroup);
    bottomChamberGroupRef.current = bottomChamberGroup;

    const basePlateGeo = new THREE.CylinderGeometry(1.7, 1.4, 0.25, 32);
    const basePlate = new THREE.Mesh(basePlateGeo, titaniumMaterial);
    basePlate.position.y = -1.8;
    bottomChamberGroup.add(basePlate);

    const baseChamberRing = new THREE.TorusGeometry(1.8, 0.03, 16, 64);
    const baseRingMesh = new THREE.Mesh(baseChamberRing, cyanGlowMaterial);
    baseRingMesh.rotation.x = Math.PI / 2;
    baseRingMesh.position.y = -1.8;
    bottomChamberGroup.add(baseRingMesh);

    // --- PART 4: Satellite Cryptographic Registers (Explodable nodes) ---
    const registerNames = ['RSA-2048', 'ECC-256', 'ML-KEM-768', 'ML-DSA-65'];
    const satelliteList: THREE.Group[] = [];

    registerNames.forEach((name, i) => {
      const satGroup = new THREE.Group();
      const angle = (i / 4) * Math.PI * 2;
      const radius = 2.4;
      satGroup.position.set(Math.cos(angle) * radius, (i % 2 === 0 ? 0.6 : -0.6), Math.sin(angle) * radius);

      // Node chassis
      const boxGeo = new THREE.BoxGeometry(0.5, 0.35, 0.4);
      const isPqc = name.startsWith('ML-');
      const boxMat = isPqc ? emeraldGlowMaterial : cyanGlowMaterial;
      const box = new THREE.Mesh(boxGeo, titaniumMaterial);
      satGroup.add(box);

      // Bezel indicator LED
      const ledGeo = new THREE.SphereGeometry(0.08, 12, 12);
      const led = new THREE.Mesh(ledGeo, boxMat);
      led.position.set(0, 0.18, 0.15);
      satGroup.add(led);

      modelGroup.add(satGroup);
      satelliteList.push(satGroup);

      // Laser stream connecting satellite to central core
      const lineMat = new THREE.LineBasicMaterial({
        color: isPqc ? 0x10b981 : 0x00f0ff,
        transparent: true,
        opacity: 0.6
      });
      const points = [new THREE.Vector3(0, 0, 0), satGroup.position];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeo, lineMat);
      modelGroup.add(line);
      laserStreamsRef.current.push(line);
    });

    satelliteRegistersRef.current = satelliteList;

    // --- PART 5: NIST PQC Crystalline Lattice Shield (Stage 2) ---
    const latticeShieldGroup = new THREE.Group();
    modelGroup.add(latticeShieldGroup);
    latticeShieldGroupRef.current = latticeShieldGroup;

    // Multi-layered crystalline dodecahedron shield
    const latticeInnerGeo = new THREE.DodecahedronGeometry(2.0, 0);
    const latticeInnerMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const latticeInner = new THREE.Mesh(latticeInnerGeo, latticeInnerMat);
    latticeShieldGroup.add(latticeInner);

    const latticeOuterGeo = new THREE.IcosahedronGeometry(2.3, 1);
    const latticeOuterMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const latticeOuter = new THREE.Mesh(latticeOuterGeo, latticeOuterMat);
    latticeShieldGroup.add(latticeOuter);

    // Initial lattice visibility starts subtle
    latticeShieldGroup.scale.set(0.8, 0.8, 0.8);

    // --- PART 6: Holographic Scanner Laser Plane (Stage 3) ---
    const scanPlaneGeo = new THREE.PlaneGeometry(5.0, 5.0);
    const scanPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide
    });
    const scannerPlane = new THREE.Mesh(scanPlaneGeo, scanPlaneMat);
    scannerPlane.rotation.x = Math.PI / 2;
    modelGroup.add(scannerPlane);
    scannerPlaneRef.current = scannerPlane;

    // --- PART 7: Ambient Quantum Dust Particles ---
    const particleCount = 450;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount * 3; p += 3) {
      particlePositions[p] = (Math.random() - 0.5) * 16;
      particlePositions[p + 1] = (Math.random() - 0.5) * 16;
      particlePositions[p + 2] = (Math.random() - 0.5) * 14;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.035,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    const particleCloud = new THREE.Points(particleGeo, particleMat);
    scene.add(particleCloud);

    // Render & Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation for explosion progress
      const anim = animStateRef.current;
      anim.currentExplosion += (anim.targetExplosion - anim.currentExplosion) * 0.08;
      const expl = anim.currentExplosion;

      // Explode / Disassemble Model in 3D
      if (topPlateGroupRef.current) {
        topPlateGroupRef.current.position.y = expl * 1.5;
        topPlateGroupRef.current.rotation.y = elapsedTime * 0.2;
      }
      if (bottomChamberGroupRef.current) {
        bottomChamberGroupRef.current.position.y = -expl * 1.5;
        bottomChamberGroupRef.current.rotation.y = -elapsedTime * 0.15;
      }
      if (coreCageRef.current) {
        coreCageRef.current.rotation.x = elapsedTime * 0.25;
        coreCageRef.current.rotation.y = elapsedTime * 0.35;
        coreCageRef.current.scale.setScalar(1 + expl * 0.3);
      }
      if (coreIcosahedronRef.current) {
        coreIcosahedronRef.current.rotation.y = -elapsedTime * 0.5;
        coreIcosahedronRef.current.rotation.z = elapsedTime * 0.3;
      }

      // Expand satellite registers outward on radial vector
      satelliteRegistersRef.current.forEach((sat, i) => {
        const baseAngle = (i / 4) * Math.PI * 2;
        const baseRadius = 2.4 + expl * 1.6;
        sat.position.x = Math.cos(baseAngle) * baseRadius;
        sat.position.z = Math.sin(baseAngle) * baseRadius;
        sat.rotation.y = elapsedTime * 0.5;
      });

      // Update laser lines
      laserStreamsRef.current.forEach((line, i) => {
        const sat = satelliteRegistersRef.current[i];
        if (sat) {
          const positions = line.geometry.attributes.position.array as Float32Array;
          positions[3] = sat.position.x;
          positions[4] = sat.position.y;
          positions[5] = sat.position.z;
          line.geometry.attributes.position.needsUpdate = true;
        }
      });

      // Lattice Shield pulsation & rotation
      if (latticeShieldGroupRef.current) {
        latticeShieldGroupRef.current.rotation.x = -elapsedTime * 0.15;
        latticeShieldGroupRef.current.rotation.y = elapsedTime * 0.2;
        const shieldScale = 1.0 + Math.sin(elapsedTime * 2.0) * 0.05 + expl * 0.4;
        latticeShieldGroupRef.current.scale.set(shieldScale, shieldScale, shieldScale);
      }

      // Scanner laser plane sweep
      if (scannerPlaneRef.current) {
        scannerPlaneRef.current.position.y = Math.sin(elapsedTime * 1.5) * 2.2;
      }

      // Subtle particle drift
      particleCloud.rotation.y = elapsedTime * 0.02;

      // Mouse Parallax & Manual Rotation
      anim.mousePos.x += (anim.targetMousePos.x - anim.mousePos.x) * 0.05;
      anim.mousePos.y += (anim.targetMousePos.y - anim.mousePos.y) * 0.05;

      if (modelGroupRef.current) {
        if (autoRotate && !anim.isDragging) {
          modelGroupRef.current.rotation.y += 0.004;
        } else {
          modelGroupRef.current.rotation.y = anim.manualRotation.y;
          modelGroupRef.current.rotation.x = anim.manualRotation.x;
        }

        // Apply mouse tilt
        modelGroupRef.current.rotation.z = anim.mousePos.x * 0.15;
        modelGroupRef.current.position.x = anim.mousePos.x * 0.3;
        modelGroupRef.current.position.y = -anim.mousePos.y * 0.3;
      }

      // Camera position interpolation
      camera.position.lerp(anim.targetCameraPos, 0.06);
      camera.lookAt(anim.targetCameraLookAt);

      // Render
      renderer.render(scene, camera);

      // Update 2D hotspots
      updateHotspotProjections();
    };

    animate();

    // Window Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      scene.clear();
    };
  }, [updateHotspotProjections, autoRotate]);

  // Handle Mouse Parallax & Drag Orbit
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

    animStateRef.current.targetMousePos.set(x, y);

    if (animStateRef.current.isDragging) {
      const deltaX = e.clientX - animStateRef.current.dragStart.x;
      const deltaY = e.clientY - animStateRef.current.dragStart.y;
      animStateRef.current.manualRotation.y += deltaX * 0.008;
      animStateRef.current.manualRotation.x += deltaY * 0.008;
      animStateRef.current.dragStart.set(e.clientX, e.clientY);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    animStateRef.current.isDragging = true;
    animStateRef.current.dragStart.set(e.clientX, e.clientY);
    setAutoRotate(false);
  };

  const handleMouseUp = () => {
    animStateRef.current.isDragging = false;
  };

  // Toggle Exploded View
  const handleToggleExplode = () => {
    const nextState = !explodedView;
    setExplodedView(nextState);
    animStateRef.current.targetExplosion = nextState ? 1.0 : 0.0;
  };

  // Toggle Wireframe Mode
  const handleToggleWireframe = () => {
    const nextWireframe = !wireframeMode;
    setWireframeMode(nextWireframe);
    if (sceneRef.current) {
      sceneRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => {
              m.wireframe = nextWireframe;
            });
          } else {
            child.material.wireframe = nextWireframe;
          }
        }
      });
    }
  };

  // Focus Camera onto a Specific 3D Hotspot
  const handleSelectHotspot = (spot: Hotspot) => {
    setActiveHotspot(spot);
    setAutoRotate(false);
    animStateRef.current.targetCameraPos.set(
      spot.position[0] * 1.5 + (spot.position[0] > 0 ? 2 : -2),
      spot.position[1] + 1.2,
      spot.position[2] + 4.5
    );
    animStateRef.current.targetCameraLookAt.set(...spot.position);
  };

  const handleResetCamera = () => {
    setActiveHotspot(null);
    setAutoRotate(true);
    animStateRef.current.targetCameraPos.set(0, 0, 7.5);
    animStateRef.current.targetCameraLookAt.set(0, 0, 0);
    animStateRef.current.targetExplosion = 0;
    setExplodedView(false);
  };

  // Scrollytelling Stage Navigation
  const CHAPTERS = [
    {
      stage: 0,
      title: 'THE QUANTUM HORIZON',
      subtitle: 'Harvest Now, Decrypt Later (HNDL)',
      lead: 'Hostile nation-states and corporate espionage groups are systematically intercepting and archiving encrypted enterprise network traffic today.',
      body: 'When a cryptographically relevant quantum computer (CRQC) achieves commercial scale, Shor’s algorithm will retrospectively crack all public-key RSA and ECC cryptography.',
      badge: 'Immediate Operational Threat',
      badgeColor: 'text-rose-400 bg-rose-950/60 border-rose-500/30',
      cameraTarget: [0, 0, 7.5],
      explosion: 0.0
    },
    {
      stage: 1,
      title: '70% TRANSITIVE BLINDSPOT',
      subtitle: 'Disassembled Architecture Vulnerability',
      lead: 'Cryptographic calls rarely exist as neat, documented top-level functions in your repositories.',
      body: 'Over 70% of cryptographic debt sits buried inside transitive lockfiles, compiled C-extensions, legacy JWT signers, and forgotten microservice configurations that standard SCA and SAST tools miss.',
      badge: 'Exploded Component View',
      badgeColor: 'text-amber-400 bg-amber-950/60 border-amber-500/30',
      cameraTarget: [-1.8, 0.8, 6.5],
      explosion: 0.85
    },
    {
      stage: 2,
      title: 'NIST MODULE-LATTICE DEFENSE',
      subtitle: 'Crystalline PQC Armor',
      lead: 'Finalized by NIST in August 2024: FIPS 203 (ML-KEM) and FIPS 204 (ML-DSA) form the foundation of post-quantum resilience.',
      body: 'High-dimensional lattice geometry provides mathematical security for which neither classical nor quantum algorithms offer polynomial speedups, neutralizing Shor’s factorization threats completely.',
      badge: 'FIPS 203 / 204 Standardized',
      badgeColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30',
      cameraTarget: [1.8, -0.6, 6.2],
      explosion: 0.35
    },
    {
      stage: 3,
      title: 'CONTINUOUS CBOM SENSORS',
      subtitle: 'Automated CycloneDX 1.6 Discovery',
      lead: 'Qcrypt parses source code Abstract Syntax Trees (AST) across Go, Rust, TypeScript, Java, and Python without sending your IP to third-party clouds.',
      body: 'Every algorithm, curve, key length, and protocol is indexed into a machine-readable Cryptographic Bill of Materials (CBOM), prioritized by real-world quantum exposure.',
      badge: 'Autonomous AST Engine',
      badgeColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-500/30',
      cameraTarget: [0, 1.4, 6.0],
      explosion: 0.5
    }
  ];

  const handleSelectChapter = (idx: number) => {
    setCurrentChapter(idx);
    const chapter = CHAPTERS[idx];
    animStateRef.current.targetCameraPos.set(chapter.cameraTarget[0], chapter.cameraTarget[1], chapter.cameraTarget[2]);
    animStateRef.current.targetExplosion = chapter.explosion;
    setExplodedView(chapter.explosion > 0.5);
    setActiveHotspot(null);
  };

  return (
    <div className="relative w-full min-h-[100dvh] bg-[#02040a] text-slate-100 overflow-hidden font-sans select-none">
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* 3D Interactive Hotspot Pins projected on Screen */}
        {HOTSPOTS.map((spot) => {
          const coords = hotspotScreenCoords[spot.id];
          if (!coords || !coords.visible) return null;
          const isSelected = activeHotspot?.id === spot.id;

          return (
            <div
              key={spot.id}
              style={{
                left: `${coords.x}px`,
                top: `${coords.y}px`,
                transform: 'translate(-50%, -50%)'
              }}
              className="absolute z-20 pointer-events-auto transition-transform duration-200"
            >
              <button
                type="button"
                onClick={() => handleSelectHotspot(spot)}
                className={`group flex items-center gap-2 p-1.5 pr-3 rounded-full border transition-all duration-300 cursor-pointer shadow-2xl ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 border-white scale-110 shadow-[0_0_25px_rgba(0,240,255,0.8)]'
                    : 'bg-[#030712]/80 backdrop-blur-xl text-slate-200 border-white/20 hover:border-cyan-400 hover:scale-105'
                }`}
                title={`Inspect ${spot.name}`}
              >
                <div
                  className={`size-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isSelected ? 'bg-slate-950 text-cyan-400' : 'bg-cyan-400 text-slate-950 animate-pulse'
                  }`}
                >
                  +
                </div>
                <span className="font-mono text-[11px] font-bold tracking-tight whitespace-nowrap">
                  {spot.name}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* High-End Tactile Film Grain */}
      <div className="film-grain" aria-hidden="true" />

      {/* Top Floating Glass Navigation Island */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-6xl pointer-events-auto">
        <nav className="flex items-center justify-between px-5 py-3 rounded-2xl bg-[#030712]/70 backdrop-blur-2xl border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.7)]">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-600/30 border border-cyan-400/40 flex items-center justify-center p-1 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <svg viewBox="0 0 32 32" className="size-5 text-cyan-300" fill="none" aria-hidden="true">
                <polygon points="16,3 28,9.5 28,22.5 16,29 4,22.5 4,9.5" stroke="currentColor" strokeWidth="2.2" />
                <circle cx="16" cy="16" r="3.5" fill="#00f0ff" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-white leading-none">
                Q<span className="text-cyan-400">crypt</span>
              </span>
              <span className="text-[9px] font-mono text-slate-400 tracking-wider uppercase mt-0.5">
                3D PQC Engine
              </span>
            </div>
          </div>

          {/* Chapter Quick Jump Pills */}
          <div className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-black/50 border border-white/10 text-xs font-mono">
            {CHAPTERS.map((ch, idx) => (
              <button
                key={ch.stage}
                type="button"
                onClick={() => handleSelectChapter(idx)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  currentChapter === idx
                    ? 'bg-cyan-950/80 text-cyan-300 font-bold border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                0{ch.stage + 1}
              </button>
            ))}
          </div>

          {/* Action Callouts */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onExploreArchitecture}
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white px-3 py-1.5 rounded-xl border border-white/10 hover:border-white/30 transition-colors cursor-pointer"
            >
              <span>Architecture</span>
            </button>

            <button
              type="button"
              onClick={onOpenDemo}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-cyan-300 hover:text-white px-3 py-1.5 rounded-xl border border-white/10 hover:border-cyan-400/40 transition-colors cursor-pointer"
            >
              <Terminal className="size-3.5" aria-hidden="true" />
              <span>Launch CBOM Sandbox</span>
            </button>

            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold text-xs font-mono shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all cursor-pointer"
            >
              <span>Request Pilot</span>
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {/* Left Scrollytelling Narrative Pod (Floating Editorial Stage Card) */}
      <div className="fixed left-5 sm:left-10 bottom-10 sm:bottom-12 z-30 max-w-lg pointer-events-auto">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#030712]/75 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.85)] space-y-4">
          {/* Eyebrow Badge */}
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border uppercase tracking-wider ${CHAPTERS[currentChapter].badgeColor}`}>
              <Radio className="size-3 animate-ping" aria-hidden="true" />
              {CHAPTERS[currentChapter].badge}
            </span>

            <span className="font-mono text-xs text-slate-400">
              Chapter 0{currentChapter + 1} / 04
            </span>
          </div>

          {/* Headline */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight text-balance">
              {CHAPTERS[currentChapter].title}
            </h1>
            <div className="text-xs font-mono text-cyan-400 mt-1 uppercase tracking-wide">
              {CHAPTERS[currentChapter].subtitle}
            </div>
          </div>

          {/* Lead narrative */}
          <p className="text-sm text-slate-200 leading-relaxed text-pretty font-medium">
            {CHAPTERS[currentChapter].lead}
          </p>

          <p className="text-xs text-slate-400 leading-relaxed text-pretty">
            {CHAPTERS[currentChapter].body}
          </p>

          {/* Stepper Controls */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentChapter === 0}
                onClick={() => handleSelectChapter(Math.max(0, currentChapter - 1))}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
              >
                &larr; Prev
              </button>
              <button
                type="button"
                disabled={currentChapter === CHAPTERS.length - 1}
                onClick={() => handleSelectChapter(Math.min(CHAPTERS.length - 1, currentChapter + 1))}
                className="px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-xs font-mono text-cyan-300 transition-colors cursor-pointer"
              >
                Next &rarr;
              </button>
            </div>

            <button
              type="button"
              onClick={onExploreArchitecture}
              className="text-[11px] font-mono text-cyan-400 hover:underline cursor-pointer"
            >
              Explore Full Details &darr;
            </button>
          </div>
        </div>
      </div>

      {/* Right 3D Viewport Controls HUD */}
      <aside className="fixed right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2.5 pointer-events-auto">
        <div className="p-3 rounded-2xl bg-[#030712]/80 backdrop-blur-2xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.7)] flex flex-col gap-2">
          <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest px-2 pb-1 border-b border-white/10 flex items-center justify-between">
            <span>3D CONTROLS</span>
            <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>

          {/* Toggle Exploded View */}
          <button
            type="button"
            onClick={handleToggleExplode}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              explodedView
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            <Layers className="size-3.5" aria-hidden="true" />
            <span>{explodedView ? 'Assemble Core' : 'Explode 3D View'}</span>
          </button>

          {/* Toggle Wireframe Mode */}
          <button
            type="button"
            onClick={handleToggleWireframe}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              wireframeMode
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            <Eye className="size-3.5" aria-hidden="true" />
            <span>{wireframeMode ? 'Solid Shader' : 'Lattice Wireframe'}</span>
          </button>

          {/* Reset Camera */}
          <button
            type="button"
            onClick={handleResetCamera}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            <span>Reset Camera</span>
          </button>
        </div>

        {/* Hotspot Inspector Card (When clicked) */}
        {activeHotspot && (
          <div className="p-4 rounded-2xl bg-[#030712]/90 backdrop-blur-2xl border border-cyan-400/50 shadow-[0_10px_40px_rgba(0,240,255,0.25)] max-w-xs animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${activeHotspot.tagColor}`}>
                {activeHotspot.tag}
              </span>
              <button
                type="button"
                onClick={() => setActiveHotspot(null)}
                className="text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              {activeHotspot.title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-2">
              {activeHotspot.description}
            </p>
            <div className="p-2 rounded-lg bg-black/60 border border-white/10 font-mono text-[10px] text-cyan-300">
              {activeHotspot.spec}
            </div>
          </div>
        )}
      </aside>

      {/* Bottom Telemetry Bar */}
      <footer className="fixed bottom-4 right-6 z-20 hidden lg:flex items-center gap-6 text-[11px] font-mono text-slate-500">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>CRYOGENIC TEMP: 15.2 mK</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 font-bold">NIST FIPS 203:</span>
          <span>ML-KEM-768 ACTIVE</span>
        </div>
        <div className="text-slate-400">
          CLICK &amp; DRAG 3D MODEL TO ORBIT
        </div>
      </footer>
    </div>
  );
}

export default ThreeHeroScrollytelling;
