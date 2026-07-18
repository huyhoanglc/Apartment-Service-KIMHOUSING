"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const EASE_BACK_DELAY = 900;
const AUTO_ROTATE_SPEED = 0.28;

/**
 * Toạ độ 6 cánh sao thương hiệu Kim Housing, đều nhau (6 đỉnh ngoài cách tâm bằng nhau, xen kẽ
 * 6 đỉnh lõm) - dựng lại bằng THREE.Shape/ExtrudeGeometry thay vì dùng ảnh/model có sẵn (không có).
 */
function buildStarShape() {
  const outerPoints: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60 * Math.PI) / 180;
    const r = 1;
    outerPoints.push([r * Math.sin(angle), r * Math.cos(angle)]);
  }
  const innerR = 0.16;
  const shape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const [ox, oy] = outerPoints[i];
    if (i === 0) shape.moveTo(ox, oy);
    else shape.lineTo(ox, oy);

    const midAngle = ((i * 60 + 30) * Math.PI) / 180;
    shape.lineTo(innerR * Math.sin(midAngle), innerR * Math.cos(midAngle));
  }
  shape.closePath();
  return shape;
}

function StarMesh({ reduceMotion }: { reduceMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const dragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: AUTO_ROTATE_SPEED });
  const resumeAt = useRef(0);

  const geometry = useMemo(() => {
    const shape = buildStarShape();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.32,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.04,
      bevelSegments: 3,
      curveSegments: 2,
    });
    geo.center();
    return geo;
  }, []);

  useFrame((_, delta) => {
    const node = group.current;
    if (!node) return;
    if (dragging.current) return;

    if (reduceMotion) return;

    const now = performance.now();
    if (now < resumeAt.current) return;

    node.rotation.y += velocity.current.y * delta;
    velocity.current.y += (AUTO_ROTATE_SPEED - velocity.current.y) * Math.min(1, delta * 2);
  });

  function onPointerDown(e: React.PointerEvent) {
    dragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    (e.target as Element).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current || !group.current) return;
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    group.current.rotation.y += dx * 0.01;
    group.current.rotation.x = THREE.MathUtils.clamp(group.current.rotation.x + dy * 0.01, -0.6, 0.6);
  }

  function onPointerUp() {
    dragging.current = false;
    resumeAt.current = performance.now() + EASE_BACK_DELAY;
  }

  return (
    <group
      ref={group}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      rotation={[0.22, 0.12, 0]}
    >
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="#d9a53e"
          metalness={0.55}
          roughness={0.32}
          emissive="#3a2708"
          emissiveIntensity={0.35}
        />
      </mesh>
    </group>
  );
}

export default function BrandEmblem3D({ reduceMotion = false }: { reduceMotion?: boolean }) {
  return (
    <div className="h-full w-full cursor-grab touch-none active:cursor-grabbing" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 3.4], fov: 40 }}>
        {/* Ánh sáng bầu trời/mặt đất mềm để mặt phẳng của khối không bao giờ tối đen, kể cả khi
            xoay khỏi hướng đèn chính - rẻ, không cần texture environment map nào. */}
        <hemisphereLight args={["#fff3d6", "#0b2c55", 0.9]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} color="#fff6e0" />
        <directionalLight position={[-3, -1, 4]} intensity={0.9} color="#ffe3a3" />
        <pointLight position={[0, 0, 4]} intensity={0.6} color="#ffd98a" />
        <StarMesh reduceMotion={reduceMotion} />
      </Canvas>
    </div>
  );
}
