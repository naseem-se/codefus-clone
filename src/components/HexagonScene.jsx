import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

/* -----------------------------------------------------
   HEXAGON (Perfect Mirror Design)
----------------------------------------------------- */
const Hexagon = ({ position = [0, 0, 0], color = "#5533ff", scale = 1, rotation = [0, 0, 0] }) => {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const x = Math.cos(angle);
      const y = Math.sin(angle);
      if (i === 0) s.moveTo(x, y);
      else s.lineTo(x, y);
    }
    s.closePath();
    return s;
  }, []);

  const extrudeSettings = {
    depth: 1,
    bevelEnabled: true,
    bevelThickness: 0.5,
    bevelSize: 0.05,
    bevelSegments: 2,
  };

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
};

/* -----------------------------------------------------
   RESPONSIVE CAMERA CONTROLLER
----------------------------------------------------- */
const ResponsiveCameraController = () => {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / size.height;
    let fov = 30;
    let distance = 12;

    // Adjust for small screens more gently
    if (size.width < 480) {
      fov = 32;        // Slightly wider FOV
      distance = 25; // Pull back camera
    } else if (size.width < 640) {
      fov = 31;
      distance = 11;
    } else if (size.width < 768) {
      fov = 30.5;
      distance = 11.5;
    }

    // Extreme portrait mode
    if (aspect < 0.6) {
      fov -= 1;
      distance -= 0.5;
    }

    camera.fov = fov;
    camera.position.z = distance;
    camera.updateProjectionMatrix();
  }, [camera, size]);

  return null;
};

/* -----------------------------------------------------
   HEXAGON GROUP WITH FIXED SIZING
----------------------------------------------------- */
const HexagonGroup = ({ scrollProgress }) => {
  const parentRef = useRef();
  const spinRef = useRef();
  const { size } = useThree();

  const radius = useMemo(() => 3.0, []); // Keep constant for all screens

  // Remove extra scaling on mobile
  const groupScale = useMemo(() => 1.0, []);

  const hexagons = useMemo(() => {
    const result = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const rotZ = angle + Math.PI / 6;
      result.push({
        position: [x, y, 0],
        rotation: [0, 0, rotZ],
        color: i % 2 === 0 ? "#6644ff" : "#4422dd",
      });
    }
    return result;
  }, [radius]);

  useFrame((state, delta) => {
    const targetZ = -15 + scrollProgress * 30;
    const targetRotZ = scrollProgress * Math.PI * 0.5;

    if (parentRef.current) {
      parentRef.current.position.z = THREE.MathUtils.damp(
        parentRef.current.position.z,
        targetZ,
        4,
        delta
      );
      parentRef.current.rotation.z = THREE.MathUtils.damp(
        parentRef.current.rotation.z,
        targetRotZ,
        4,
        delta
      );
    }

    if (spinRef.current) {
      spinRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group ref={parentRef} position={[0, 0, -15]} scale={groupScale}>
      <group ref={spinRef}>
        {hexagons.map((hex, index) => (
          <Hexagon
            key={index}
            position={hex.position}
            rotation={hex.rotation}
            color={hex.color}
            scale={[1.5, 1.5, 6]}
          />
        ))}
      </group>
    </group>
  );
};

/* -----------------------------------------------------
   OVERLAY
----------------------------------------------------- */
const OverlayInsideHexagon = ({ children, scrollProgress }) => {
  const start = 0.85;
  const end = 1.0;
  let t = 0;

  if (scrollProgress > start && scrollProgress < end) {
    t = (scrollProgress - start) / (end - start);
  } else if (scrollProgress >= end) {
    t = 1;
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: t,
        transform: `scale(${0.5 + t * 0.5})`,
        transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
        pointerEvents: t > 0.8 ? 'auto' : 'none',
        zIndex: 50,
      }}
    >
      {children}
    </div>
  );
};

/* -----------------------------------------------------
   SCENE CONTENT
----------------------------------------------------- */
const SceneContent = ({ scrollProgress }) => {
  return (
    <>
      <ResponsiveCameraController />

      <ambientLight intensity={0.2} />
      <pointLight intensity={3} position={[0, 0, 20]} color="#ffffff" />
      <pointLight intensity={2.5} position={[15, 15, 15]} color="#B8A9FF" />
      <pointLight intensity={2.5} position={[-15, -15, 15]} color="#3D32B8" />
      <pointLight intensity={1.8} position={[20, 0, 10]} color="#7869D9" />
      <pointLight intensity={1.8} position={[-20, 0, 10]} color="#6B5FE8" />
      <pointLight intensity={1} position={[0, 0, -10]} color="#4A3DB5" />

      <Environment preset="studio" />

      <HexagonGroup scrollProgress={scrollProgress} />
    </>
  );
};

/* -----------------------------------------------------
   MAIN COMPONENT
----------------------------------------------------- */
const HexagonScene = ({ overlayContent }) => {
  const containerRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      let p = 0;
      if (rect.top <= 0 && rect.bottom >= 0) {
        p = (-rect.top) / total;
        p = Math.min(1, Math.max(0, p));
      } else if (rect.bottom < 0) {
        p = 1;
      }
      setScrollProgress(p);
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll);
    setTimeout(updateScroll, 100);

    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: '180vh',
        position: 'relative',
        zIndex: "8888"
      }}
      className="md:mt-12"
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <Canvas
          camera={{ 
            position: [0, 0, 12], 
            fov: 30 
          }}
          style={{ 
            width: '100%', 
            height: '100%', 
            background: '#000000',
            touchAction: 'pan-y'
          }}
        >
          <SceneContent scrollProgress={scrollProgress} />
        </Canvas>
        <OverlayInsideHexagon scrollProgress={scrollProgress}>
          {overlayContent}
        </OverlayInsideHexagon>
      </div>
    </div>
  );
};

export default HexagonScene;
