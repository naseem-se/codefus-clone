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
   MOBILE CAMERA CONTROLLER
----------------------------------------------------- */
const MobileCameraController = () => {
  const { camera, size } = useThree();
  
  useEffect(() => {
    const aspect = size.width / size.height;
    const width = size.width;
    
    let fov = 30;
    let distance = 12;
    
    if (width < 375) {
      fov = 30;
      distance = 12;
    } else if (width < 480) {
      fov = 30;
      distance = 12;
    } else if (width < 640) {
      fov = 30;
      distance = 12;
    } else if (width < 768) {
      fov = 30;
      distance = 12;
    }
    
    if (aspect < 0.6) {
      fov -= 1;
      distance -= 0.5;
    }
    
    camera.fov = fov;
    camera.position.z = distance;
    camera.position.y = 0;
    camera.updateProjectionMatrix();
  }, [camera, size]);
  
  return null;
};

/* -----------------------------------------------------
   DESKTOP CAMERA CONTROLLER
----------------------------------------------------- */
const DesktopCameraController = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.fov = 30;
    camera.position.z = 12;
    camera.updateProjectionMatrix();
  }, [camera]);
  
  return null;
};

/* -----------------------------------------------------
   MOBILE HEXAGON GROUP
----------------------------------------------------- */
const MobileHexagonGroup = ({ scrollProgress }) => {
  const parentRef = useRef();
  const spinRef = useRef();
  
  // Same radius as desktop but will appear smaller due to smaller scale
  const radius = 3.0;
  
  // Uniform smaller scale for mobile - 70% of desktop size
  const groupScale = 0.7;
  
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
  }, []);
  
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
   DESKTOP HEXAGON GROUP
----------------------------------------------------- */
const DesktopHexagonGroup = ({ scrollProgress }) => {
  const parentRef = useRef();
  const spinRef = useRef();
  
  const radius = 3.0;
  const groupScale = 1.0;
  
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
  }, []);
  
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
   MOBILE SCENE CONTENT
----------------------------------------------------- */
const MobileSceneContent = ({ scrollProgress }) => {
  return (
    <>
      <MobileCameraController />
      
      <ambientLight intensity={0.2} />
      <pointLight intensity={3} position={[0, 0, 20]} color="#ffffff" />
      <pointLight intensity={2.5} position={[15, 15, 15]} color="#B8A9FF" />
      <pointLight intensity={2.5} position={[-15, -15, 15]} color="#3D32B8" />
      <pointLight intensity={1.8} position={[20, 0, 10]} color="#7869D9" />
      <pointLight intensity={1.8} position={[-20, 0, 10]} color="#6B5FE8" />
      <pointLight intensity={1} position={[0, 0, -10]} color="#4A3DB5" />
      
      <Environment preset="studio" />
      
      <MobileHexagonGroup scrollProgress={scrollProgress} />
    </>
  );
};

/* -----------------------------------------------------
   DESKTOP SCENE CONTENT
----------------------------------------------------- */
const DesktopSceneContent = ({ scrollProgress }) => {
  return (
    <>
      <DesktopCameraController />
      
      <ambientLight intensity={0.2} />
      <pointLight intensity={3} position={[0, 0, 20]} color="#ffffff" />
      <pointLight intensity={2.5} position={[15, 15, 15]} color="#B8A9FF" />
      <pointLight intensity={2.5} position={[-15, -15, 15]} color="#3D32B8" />
      <pointLight intensity={1.8} position={[20, 0, 10]} color="#7869D9" />
      <pointLight intensity={1.8} position={[-20, 0, 10]} color="#6B5FE8" />
      <pointLight intensity={1} position={[0, 0, -10]} color="#4A3DB5" />
      
      <Environment preset="studio" />
      
      <DesktopHexagonGroup scrollProgress={scrollProgress} />
    </>
  );
};

/* -----------------------------------------------------
   MOBILE HEXAGON SCENE
----------------------------------------------------- */
export const MobileHexagonScene = ({ overlayContent }) => {
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
          if (containerRef.current.contains(targetElement)) {
            e.preventDefault();
            const containerRect = containerRef.current.getBoundingClientRect();
            const scrollToPosition = window.scrollY + containerRect.top + (containerRect.height - window.innerHeight);
            
            window.scrollTo({
              top: scrollToPosition,
              behavior: 'smooth'
            });
            
            const checkScroll = setInterval(updateScroll, 16);
            setTimeout(() => {
              clearInterval(checkScroll);
              updateScroll();
            }, 1000);
          } else {
            const containerRect = containerRef.current.getBoundingClientRect();
            const targetRect = targetElement.getBoundingClientRect();
            
            if (targetRect.top > containerRect.bottom || 
                (window.scrollY + targetRect.top) > (window.scrollY + containerRect.bottom)) {
              e.preventDefault();
              const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 80;
              
              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });
              
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
      className="block md:hidden"
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
          <MobileSceneContent scrollProgress={scrollProgress} />
        </Canvas>
        <OverlayInsideHexagon scrollProgress={scrollProgress}>
          {overlayContent}
        </OverlayInsideHexagon>
      </div>
    </div>
  );
};

/* -----------------------------------------------------
   DESKTOP HEXAGON SCENE
----------------------------------------------------- */
export const DesktopHexagonScene = ({ overlayContent }) => {
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
          if (containerRef.current.contains(targetElement)) {
            e.preventDefault();
            const containerRect = containerRef.current.getBoundingClientRect();
            const scrollToPosition = window.scrollY + containerRect.top + (containerRect.height - window.innerHeight);
            
            window.scrollTo({
              top: scrollToPosition,
              behavior: 'smooth'
            });
            
            const checkScroll = setInterval(updateScroll, 16);
            setTimeout(() => {
              clearInterval(checkScroll);
              updateScroll();
            }, 1000);
          } else {
            const containerRect = containerRef.current.getBoundingClientRect();
            const targetRect = targetElement.getBoundingClientRect();
            
            if (targetRect.top > containerRect.bottom || 
                (window.scrollY + targetRect.top) > (window.scrollY + containerRect.bottom)) {
              e.preventDefault();
              const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 80;
              
              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });
              
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
      className="hidden md:block md:mt-12"
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
          <DesktopSceneContent scrollProgress={scrollProgress} />
        </Canvas>
        <OverlayInsideHexagon scrollProgress={scrollProgress}>
          {overlayContent}
        </OverlayInsideHexagon>
      </div>
    </div>
  );
};

/* -----------------------------------------------------
   DEFAULT EXPORT - Wrapper Component
----------------------------------------------------- */
const HexagonScene = ({ overlayContent }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile ? (
    <MobileHexagonScene overlayContent={overlayContent} />
  ) : (
    <DesktopHexagonScene overlayContent={overlayContent} />
  );
};

export default HexagonScene;