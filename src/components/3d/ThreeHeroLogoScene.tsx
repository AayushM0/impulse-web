import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeHeroLogoSceneProps {
  scrollProgress?: number | React.MutableRefObject<number>;
  className?: string;
}

export default function ThreeHeroLogoScene({
  scrollProgress = 0,
  className = '',
}: ThreeHeroLogoSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<number | React.MutableRefObject<number>>(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const aspect = container.clientWidth / container.clientHeight;
    const initialFov = aspect < 1 ? 55 : 42;

    const camera = new THREE.PerspectiveCamera(initialFov, aspect, 0.1, 1000);
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Group for the 3D Starburst Logo
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const bluePoint = new THREE.PointLight(0x3b82f6, 80, 70);
    bluePoint.position.set(0, 0, 8);
    scene.add(bluePoint);

    const magentaPoint = new THREE.PointLight(0xec4899, 50, 60);
    magentaPoint.position.set(0, 0, -6);
    scene.add(magentaPoint);

    const cyanPoint = new THREE.PointLight(0x60a5fa, 45, 50);
    cyanPoint.position.set(8, 8, 4);
    scene.add(cyanPoint);

    // 1. Central Core Sphere
    const coreGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      emissive: 0x60a5fa,
      emissiveIntensity: 0.95,
      roughness: 0.15,
      metalness: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    logoGroup.add(coreMesh);

    // Halo Mesh
    const haloGeometry = new THREE.SphereGeometry(1.65, 24, 24);
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.35,
      wireframe: true,
    });
    const haloMesh = new THREE.Mesh(haloGeometry, haloMaterial);
    logoGroup.add(haloMesh);

    // 2. Starburst Lattice Beams (Proportionally scaled to stay well inside frustum)
    const beamDirections: [number, number, number][] = [
      [0, 4.4, 0],    // Top
      [0, -4.4, 0],   // Bottom
      [-4.4, 0, 0],   // Left
      [4.4, 0, 0],    // Right
      [-3.1, 3.1, 0], // Top-Left
      [3.1, 3.1, 0],  // Top-Right
      [-3.1, -3.1, 0],// Bottom-Left
      [3.1, -3.1, 0], // Bottom-Right
      [0, 0, 2.8],    // Z Forward
      [0, 0, -2.8],   // Z Backward
    ];

    const beamMaterial = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.6,
      roughness: 0.25,
      metalness: 0.9,
    });

    const magentaBeamMaterial = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      emissive: 0xec4899,
      emissiveIntensity: 0.5,
      roughness: 0.25,
      metalness: 0.9,
    });

    const nodeGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const outerNodeMaterial = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      emissive: 0x60a5fa,
      emissiveIntensity: 1.2,
      roughness: 0.1,
    });

    beamDirections.forEach(([x, y, z], idx) => {
      const length = Math.sqrt(x * x + y * y + z * z);
      const cylinderGeom = new THREE.CylinderGeometry(0.06, 0.06, length, 12);
      cylinderGeom.translate(0, length / 2, 0);

      const beam = new THREE.Mesh(cylinderGeom, idx >= 4 && idx <= 7 ? magentaBeamMaterial : beamMaterial);
      const target = new THREE.Vector3(x, y, z);
      beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), target.clone().normalize());
      logoGroup.add(beam);

      const tipNode = new THREE.Mesh(nodeGeometry, outerNodeMaterial);
      tipNode.position.set(x, y, z);
      logoGroup.add(tipNode);
    });

    // 3. Orbital Wireframe Rings (Fit comfortably on all screens)
    const ring1Geom = new THREE.TorusGeometry(3.6, 0.04, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.45 });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    logoGroup.add(ring1);

    const ring2Geom = new THREE.TorusGeometry(5.1, 0.03, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.3 });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = Math.PI / 6;
    logoGroup.add(ring2);

    // 4. Background Particle Field
    const particleCount = 200;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorBlue = new THREE.Color(0x3b82f6);
    const colorBright = new THREE.Color(0x60a5fa);
    const colorPink = new THREE.Color(0xec4899);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const dist = 3.5 + Math.random() * 10;

      particlePositions[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = dist * Math.cos(phi) - 2;

      const c = Math.random() > 0.6 ? colorPink : Math.random() > 0.3 ? colorBlue : colorBright;
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleField = new THREE.Points(particleGeom, particleMat);
    scene.add(particleField);

    // Initial State: Front and Center
    logoGroup.position.set(0, 0, 2.5);
    logoGroup.scale.set(1.2, 1.2, 1.2);

    // Mouse movement state
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x;
      mouse.targetY = y;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const currentAspect = container.clientWidth / container.clientHeight;
      camera.aspect = currentAspect;
      camera.fov = currentAspect < 1 ? 55 : 42;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Current scroll progress (0 = front and prominent, 1 = settled behind text)
      const currentProgress = typeof scrollRef.current === 'object' && scrollRef.current !== null
        ? scrollRef.current.current
        : (scrollRef.current as number);
      const p = Math.min(1, Math.max(0, currentProgress));

      // Interpolate Z-depth: starts front (+2.5) and retreats backward (-2.8)
      const targetZ = 2.5 * (1 - p) + (-2.8) * p;
      // Interpolate Scale: starts larger (1.2) and scales down to settled (0.92)
      const targetScale = 1.2 * (1 - p) + 0.92 * p;

      logoGroup.position.z += (targetZ - logoGroup.position.z) * 0.08;
      logoGroup.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);

      // Smooth mouse follow with damping
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      if (!reducedMotion) {
        // Continuous rotation + mouse tilt
        logoGroup.rotation.y = elapsedTime * 0.25 + mouse.x * 0.5;
        logoGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.08 - mouse.y * 0.4;
        logoGroup.rotation.z = Math.cos(elapsedTime * 0.2) * 0.05;

        ring1.rotation.z = elapsedTime * 0.4;
        ring2.rotation.z = -elapsedTime * 0.3;

        const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.06;
        coreMesh.scale.set(pulse, pulse, pulse);
        haloMesh.scale.set(pulse * 1.05, pulse * 1.05, pulse * 1.05);

        particleField.rotation.y = elapsedTime * 0.05;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((mat) => mat.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  );
}
