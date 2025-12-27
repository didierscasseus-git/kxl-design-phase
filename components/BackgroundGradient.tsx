
 import React, { useEffect, useState } from 'react';

import { Canvas } from '@react-three/fiber';

import { ShaderGradient } from '@shadergradient/react';

import * as THREE from 'three';



// Deterministic color sequence mapped to scroll progress
// Simulates streams "colliding" and merging into new hues as you descend
const COLOR_SEQUENCE = [
  { pct: 0.0, c1: "#3C0008", c2: "#3A1F3B", c3: "#2D1E2F" }, // Initial: Mid Purple to Deep Purple to Dark Purple
  { pct: 0.2, c1: "#E4412C", c2: "#2D1E2F", c3: "#3C0008" }, // Infra: Deep Purple to Dark with Mid accent
  { pct: 0.45, c1: "#2D1E2F", c2: "#4E2A4F", c3: "#3A1F3B" }, // Dashboard: Dark Purple with Mid and Deep mix
  { pct: 0.7, c1: "#4E2A4F", c2: "#3A1F3B", c3: "#2D1E2F" }, // Capabilities: Mid Purple to Deep Purple gradient
  { pct: 0.9, c1: "#3A1F3B", c2: "#2D1E2F", c3: "#4E2A4F" }, // CTA: Deep and Dark contrast with Mid highlight
  { pct: 1.0, c1: "#2D1E2F", c2: "#3A1F3B", c3: "#4E2A4F" }, // Footer: Dark to Deep with Mid Purple accent
];


const lerpColor = (colorA: string, colorB: string, t: number) => {

  const c1 = new THREE.Color(colorA);

  const c2 = new THREE.Color(colorB);

  c1.lerp(c2, t);

  return '#' + c1.getHexString();

};



const GradientController = ({ scrollY }: { scrollY: number }) => {

  // 1. Color Interpolation Logic

  let activeSet = COLOR_SEQUENCE[0];

  let nextSet = COLOR_SEQUENCE[1];

  let localT = 0;



  for (let i = 0; i < COLOR_SEQUENCE.length - 1; i++) {

    if (scrollY >= COLOR_SEQUENCE[i].pct && scrollY <= COLOR_SEQUENCE[i+1].pct) {

        activeSet = COLOR_SEQUENCE[i];

        nextSet = COLOR_SEQUENCE[i+1];

        const range = nextSet.pct - activeSet.pct;

        localT = (scrollY - activeSet.pct) / range;

        break;

    }

  }

  // Clamp end

  if (scrollY >= 1) {

    activeSet = COLOR_SEQUENCE[COLOR_SEQUENCE.length - 1];

    nextSet = COLOR_SEQUENCE[COLOR_SEQUENCE.length - 1];

    localT = 0;

  }



  const c1 = lerpColor(activeSet.c1, nextSet.c1, localT);

  const c2 = lerpColor(activeSet.c2, nextSet.c2, localT);

  const c3 = lerpColor(activeSet.c3, nextSet.c3, localT);



  // 2. Physics & Motion Logic

  // Rotation: Continuous spin based on depth

  const rotY = (scrollY * 180) - 20; // Rotate 180 deg over the page

  const rotZ = 50 + (scrollY * 20); // Tilt slightly



  // Zoom: "Bigger Scale"

  // We start close (Zoom ~8) and zoom out to reveal massive structures (Zoom ~2)

  // Or zoom in to be inside the stream. Let's Zoom OUT to show scale.

  const zoom = 10 - (scrollY * 6); // 10 -> 4



  // Chaos/Complexity

  // Amplitude increases to show more "collision"

  const amp = 2 + (scrollY * 3);

 

  // Frequency decreases to make patterns LARGER (Bigger Scale)

  const freq = 5.5 - (scrollY * 2.5); // 5.5 -> 3.0



  return (

    <ShaderGradient

      animate="on"
      
      // Removed bgColor1 and bgColor2 as they are not valid props in the current types

      brightness={1.2}

      cAzimuthAngle={180}

      cDistance={3.5}

      cPolarAngle={110}

      cameraZoom={zoom}

      color1={c1}

      color2={c2}

      color3={c3}

      envPreset="city"

      grain="on"

      lightType="3d"

      positionX={0}

      positionY={0}

      positionZ={0}

      range="disabled"

      rangeEnd={40}

      rangeStart={0}

      reflection={0.1}

      rotationX={0}

      rotationY={rotY}

      rotationZ={rotZ}

      shader="defaults"

      type="sphere"

      uAmplitude={amp}

      uDensity={1.3}

      uFrequency={freq}

      uSpeed={0.2} // Gentle autonomous movement that underlies the scroll interaction

      uStrength={2.5}

      uTime={0}

      wireframe={false}

    />

  );

};



const BackgroundGradient: React.FC = () => {

  const [scrollProgress, setScrollProgress] = useState(0);



  useEffect(() => {

    const root = document.getElementById('scroll-root');

    if (!root) return;



    let ticking = false;



    const handleScroll = () => {

      if (!ticking) {

        window.requestAnimationFrame(() => {

          const { scrollTop, scrollHeight, clientHeight } = root;

          const maxScroll = scrollHeight - clientHeight;

          const progress = Math.min(1, Math.max(0, scrollTop / maxScroll));

          setScrollProgress(progress);

          ticking = false;

        });

        ticking = true;

      }

    };



    root.addEventListener('scroll', handleScroll, { passive: true });

    // Initial calc

    handleScroll();



    return () => root.removeEventListener('scroll', handleScroll);

  }, []);



  return (

    <div className="fixed inset-0 -z-50 pointer-events-none transform-gpu backface-hidden will-change-transform">

      <Canvas

        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio * 1.5, 3) : 1}

        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}

        gl={{

          antialias: true,

          powerPreference: "high-performance",

          alpha: true,

          preserveDrawingBuffer: true

        }}

        resize={{ debounce: 0, scroll: false }}

      >

        <GradientController scrollY={scrollProgress} />

      </Canvas>

    </div>

  );

};



export default BackgroundGradient;
