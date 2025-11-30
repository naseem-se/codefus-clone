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
    const width = size.width;
    
    let fov = 30;
    let distance = 12;
    
    // Mobile devices - REDUCE FOV and bring camera CLOSER for bigger appearance
    if (width < 480) {
      fov = 38; // Narrower FOV = bigger hexagon
      distance = 9; // Much closer camera
    } else if (width < 640) {
      fov = 35;
      distance = 10;
    } else if (width < 768) {
      fov = 33;
      distance = 11;
    } else if (width < 1024) {
      fov = 32;
      distance = 11.5;
    } else {
      // Desktop - keep original
      fov = 30;
      distance = 12;
    }
    
    // Adjust for extreme portrait mode - reduce FOV even more for taller appearance
    if (aspect < 0.6) {
      fov -= 3; // Narrower for very narrow screens
      distance -= 0.5; // Even closer
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
  
  // CRITICAL FIX: Use consistent radius for all mobile devices
  const radius = useMemo(() => {
    const width = size.width;
    
    // Keep radius CONSTANT across all mobile sizes to prevent shrinking
    if (width < 768) {
      return 3.0; // SAME as desktop - this prevents shrinking
    } else {
      return 3.0; // Desktop size
    }
  }, [size.width]);
  
  // Calculate scale factor for mobile to maintain visual size
  const groupScale = useMemo(() => {
    const width = size.width;
    
    if (width < 480) {
      return 1.1; // Scale UP for small screens to fill space
    } else if (width < 640) {
      return 1.05; // Slightly larger
    } else if (width < 768) {
      return 1.0;
    } else {
      return 1.0; // Desktop - no scaling
    }
  }, [size.width]);

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
        padding: '20px',
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
      if (rect.top <= 0 && rect.bottom >= 0) {
        let p = (-rect.top) / total;
        p = Math.min(1, Math.max(0, p));
        setScrollProgress(p);
      } else if (rect.bottom < 0) {
        setScrollProgress(1);
      } else {
        setScrollProgress(0);
      }
    };
    
    window.addEventListener('scroll', updateScroll, { passive: true });
    
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.hash) {
        const targetElement = document.querySelector(target.hash);
        if (targetElement && containerRef.current) {
          // Check if target is inside the hexagon container (overlay content)
          if (containerRef.current.contains(targetElement)) {
            e.preventDefault();
            
            // Calculate the position to scroll to the END of the hexagon section
            const containerRect = containerRef.current.getBoundingClientRect();
            const scrollToPosition = window.scrollY + containerRect.top + (containerRect.height - window.innerHeight);
            
            // Smooth scroll to the position
            window.scrollTo({
              top: scrollToPosition,
              behavior: 'smooth'
            });
            
            // Update scroll progress multiple times during the scroll
            const checkScroll = setInterval(updateScroll, 16); // 60fps
            setTimeout(() => {
              clearInterval(checkScroll);
              updateScroll();
            }, 1000);
          } 
          // Check if target is AFTER the hexagon container
          else {
            const containerRect = containerRef.current.getBoundingClientRect();
            const targetRect = targetElement.getBoundingClientRect();
            
            // If target is below the hexagon section
            if (targetRect.top > containerRect.bottom || 
                (window.scrollY + targetRect.top) > (window.scrollY + containerRect.bottom)) {
              e.preventDefault();
              
              // First, scroll past the hexagon section to set progress to 1
              const hexagonEndPosition = window.scrollY + containerRect.top + (containerRect.height - window.innerHeight);
              
              // Then scroll to the actual target
              const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 80; // 80px offset for navbar
              
              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });
              
              // Update scroll progress during the scroll
              const checkScroll = setInterval(updateScroll, 16);
              setTimeout(() => {
                clearInterval(checkScroll);
                updateScroll();
              }, 1000);
            }
          }
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    window.addEventListener('hashchange', () => {
      setTimeout(updateScroll, 100);
      const checkScroll = setInterval(updateScroll, 16);
      setTimeout(() => clearInterval(checkScroll), 1000);
    });
    
    const handleResize = () => {
      updateScroll();
    };
    window.addEventListener('resize', handleResize);
    
    setTimeout(updateScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('hashchange', updateScroll);
      document.removeEventListener('click', handleAnchorClick);
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
      className="mt-10 md:mt-12"
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