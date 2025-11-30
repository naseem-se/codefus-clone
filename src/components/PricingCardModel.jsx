import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

// ===============================
//  GLOBAL GRADIENT BACKGROUND
// ===============================
function GradientBackground({ type }) {
  const meshRef = useRef();
  const colors = {
    cube: ["#0a1628", "#000814"],
    spring: ["#0a1628", "#000814"],
    sphere: ["#0a1628", "#000814"],
  };
  const [top, bottom] = colors[type] || colors.cube;
  const material = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(top) },
        bottomColor: { value: new THREE.Color(bottom) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * position;
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        void main() {
          gl_FragColor = vec4(mix(topColor, bottomColor, vUv.y), 1.0);
        }
      `,
      side: THREE.BackSide,
    });
    return mat;
  }, [top, bottom]);
  
  return (
    <mesh ref={meshRef} scale={50}>
      <sphereGeometry args={[1, 32, 32]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

// ===============================
//  SHARED METALLIC MATERIAL
// ===============================
const createMetallicMaterial = () => (
  <meshPhysicalMaterial
    color="#5aa3d9"
    metalness={0.98}
    roughness={0.05}
    reflectivity={1}
    clearcoat={1}
    clearcoatRoughness={0.05}
    envMapIntensity={2}
  />
);

// ===============================
//  OBJECT 1 — ROUNDED METALLIC CUBE
// ===============================
function RoundedCubeFrame({ hover }) {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.006;
      groupRef.current.rotation.x += 0.003;
    }
  });

  const size = 1.5;
  const pipe = 0.15;
  const elbowRadius = 0.3;
  const half = size / 2;

  const material = useMemo(() => 
    new THREE.MeshPhysicalMaterial({
      color: "#5aa3d9",
      metalness: 0.98,
      roughness: 0.05,
      reflectivity: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      envMapIntensity: 2,
    }), []
  );

  // Cube corners
  const corners = [
    [ half,  half,  half],
    [-half,  half,  half],
    [-half, -half,  half],
    [ half, -half,  half],
    [ half,  half, -half],
    [-half,  half, -half],
    [-half, -half, -half],
    [ half, -half, -half],
  ];

  // 12 edges connecting corners
  const EDGES = [
    [0,1],[1,2],[2,3],[3,0],  // front face
    [4,5],[5,6],[6,7],[7,4],  // back face
    [0,4],[1,5],[2,6],[3,7],  // connecting edges
  ];

  // Which edges meet at each corner
  const CORNER_EDGES = {
    0: [0, 3, 8],
    1: [0, 1, 9],
    2: [1, 2, 10],
    3: [2, 3, 11],
    4: [4, 7, 8],
    5: [4, 5, 9],
    6: [5, 6, 10],
    7: [6, 7, 11]
  };

  // Shorten pipes to make room for elbows
  function shorten(a, b) {
    const A = new THREE.Vector3(...a);
    const B = new THREE.Vector3(...b);
    const dir = B.clone().sub(A).normalize();
    return [
      A.clone().add(dir.clone().multiplyScalar(elbowRadius)),
      B.clone().sub(dir.clone().multiplyScalar(elbowRadius))
    ];
  }

  // Create proper orientation for torus elbows
  function getElbowTransform(cornerPos, edgeDir1, edgeDir2) {
    const corner = new THREE.Vector3(...cornerPos);
    
    // Normalize directions
    const dir1 = new THREE.Vector3(...edgeDir1).normalize();
    const dir2 = new THREE.Vector3(...edgeDir2).normalize();
    
    // Calculate bisector (center of the elbow arc)
    const bisector = dir1.clone().add(dir2).normalize();
    
    // Position the elbow at corner + offset along bisector
    const position = corner.clone().add(bisector.clone().multiplyScalar(elbowRadius * 0.7));
    
    // Create rotation matrix
    const normal = new THREE.Vector3().crossVectors(dir1, dir2).normalize();
    const tangent = dir1.clone().add(dir2).normalize();
    
    const matrix = new THREE.Matrix4();
    matrix.makeBasis(
      new THREE.Vector3().crossVectors(tangent, normal).normalize(),
      normal,
      tangent
    );
    
    const quaternion = new THREE.Quaternion().setFromRotationMatrix(matrix);
    
    return { position, quaternion };
  }

  return (
    <group ref={groupRef} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
      
      {/* STRAIGHT PIPES */}
      {EDGES.map(([i1, i2], idx) => {
        const [startPos, endPos] = shorten(corners[i1], corners[i2]);
        const mid = startPos.clone().add(endPos).multiplyScalar(0.5);
        const direction = endPos.clone().sub(startPos);
        const length = direction.length();

        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          direction.clone().normalize()
        );

        return (
          <mesh 
            key={`edge-${idx}`} 
            position={mid} 
            quaternion={quaternion} 
            material={material}
          >
            <cylinderGeometry args={[pipe, pipe, length, 32]} />
          </mesh>
        );
      })}

      {/* ELBOW JOINTS AT CORNERS */}
      {corners.map((corner, cornerIdx) => {
        const edgeIndices = CORNER_EDGES[cornerIdx];
        const cornerVec = new THREE.Vector3(...corner);
        
        // Get the three edges meeting at this corner
        const edgeDirections = edgeIndices.map(edgeIdx => {
          const [start, end] = EDGES[edgeIdx];
          const otherCornerIdx = start === cornerIdx ? end : start;
          const otherCorner = new THREE.Vector3(...corners[otherCornerIdx]);
          return otherCorner.clone().sub(cornerVec).normalize();
        });

        // Create three elbows (one for each pair of edges)
        const elbowPairs = [
          [edgeDirections[0], edgeDirections[1]],
          [edgeDirections[1], edgeDirections[2]],
          [edgeDirections[0], edgeDirections[2]]
        ];

        return (
          <group key={`corner-${cornerIdx}`}>
            {elbowPairs.map((pair, pairIdx) => {
              const { position, quaternion } = getElbowTransform(corner, pair[0].toArray(), pair[1].toArray());
              
              return (
                <mesh
                  key={`elbow-${cornerIdx}-${pairIdx}`}
                  position={position}
                  quaternion={quaternion}
                  material={material}
                >
                  <torusGeometry args={[elbowRadius, pipe * 0.95, 24, 48, Math.PI / 2]} />
                </mesh>
              );
            })}
          </group>
        );
      })}
    </group>
  );
}

// ===============================
//  OBJECT 2 — REALISTIC SPRING
// ===============================
function RealisticSpring({ hover }) {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.05;
    }
  });

  const springGeometry = useMemo(() => {
    class SpringCurve extends THREE.Curve {
      constructor(r = 0.6, h = 2.5, coils = 4) {
        super();
        this.r = r;
        this.h = h;
        this.coils = coils;
      }
      getPoint(t) {
        const angle = this.coils * 2 * Math.PI * t;
        const compression = Math.sin(t * Math.PI) * 0.1;
        return new THREE.Vector3(
          (this.r + compression) * Math.cos(angle),
          (t - 0.5) * this.h,
          (this.r + compression) * Math.sin(angle)
        );
      }
    }
    return new THREE.TubeGeometry(
      new SpringCurve(),
      600,
      0.14,
      48,
      false
    );
  }, []);

  return (
    <mesh
      ref={meshRef}
      geometry={springGeometry}
      rotation={[Math.PI / 4, Math.PI / 4, 0]}
    >
      {createMetallicMaterial()}
    </mesh>
  );
}

// ===============================
//  OBJECT 3 — INTERWOVEN SPHERE
// ===============================
function InterwovenSphere({ hover }) {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.007;
      groupRef.current.rotation.x += 0.005;
    }
  });

  const material = createMetallicMaterial();
  
  const rings = [
    { rot: [0, 0, 0], radius: 1.2 },
    { rot: [Math.PI / 2, 0, 0], radius: 1.2 },
    { rot: [0, Math.PI / 2, 0], radius: 1.2 },
    { rot: [Math.PI / 4, Math.PI / 4, 0], radius: 1.15 },
    { rot: [-Math.PI / 4, Math.PI / 4, 0], radius: 1.15 },
    { rot: [Math.PI / 3, 0, Math.PI / 3], radius: 1.1 },
  ];

  return (
    <group ref={groupRef} rotation={[0.2, 0.3, 0.1]}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={ring.rot}>
          <torusGeometry args={[ring.radius, 0.12, 48, 128]} />
          {material}
        </mesh>
      ))}
    </group>
  );
}

// ===============================
//  MAIN EXPORT COMPONENT
// ===============================
export default function PricingCardModel({ type = "cube", hover }) {
  return (
    <>
      <GradientBackground type={type} />
      
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 7]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[-5, 3, -5]} intensity={1.2} color="#88ccff" />
      <pointLight position={[0, 3, 4]} intensity={1.8} color="#aaccff" />
      <pointLight position={[-3, -2, 4]} intensity={1.2} color="#88aadd" />
      <spotLight
        position={[0, 6, 3]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        color="#ffffff"
      />

      {type === "cube" && <RoundedCubeFrame hover={hover} />}
      {type === "spring" && <RealisticSpring hover={hover} />}
      {type === "sphere" && <InterwovenSphere hover={hover} />}
    </>
  );
}

// Demo component to showcase all three objects
function Demo() {
  const [currentType, setCurrentType] = useState("cube");
  
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <PricingCardModel type={currentType} hover={true} />
        <Environment preset="city" />
        <OrbitControls 
          enableDamping 
          dampingFactor={0.05}
          minDistance={3}
          maxDistance={8}
        />
      </Canvas>
      
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px',
        zIndex: 1000
      }}>
        {['cube', 'spring', 'sphere'].map(type => (
          <button
            key={type}
            onClick={() => setCurrentType(type)}
            style={{
              padding: '10px 20px',
              background: currentType === type ? '#5aa3d9' : '#1a3a5c',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: currentType === type ? 'bold' : 'normal',
              textTransform: 'capitalize'
            }}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}