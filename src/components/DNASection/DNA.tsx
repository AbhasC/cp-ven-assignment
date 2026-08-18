import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import type { Group } from "three";
import { BasePair } from "./BasePair";
import { DNAHelix } from "./DNAHelix";
import type { Base, DNAProps } from "./types";
import { bases } from "./constants";

export const DNA = ({
  basePairs = 60,
  radius = 1,
  height = 6,
  turns = 3,
  gap = 0.15,
}: DNAProps) => {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // groupRef.current.rotation.x += delta * 0.3;
    groupRef.current.rotation.y -= delta * 0.3;
    // groupRef.current.rotation.z += delta * 0.3;
  });

  const { leftPoints, rightPoints } = useMemo(() => {
    const leftPoints: Vector3[] = [];
    const rightPoints: Vector3[] = [];
    const angleStep = (Math.PI * 2 * turns) / (basePairs - 1);
    const heightStep = height / (basePairs - 1);
    for (let i = 0; i < basePairs; i++) {
      const angle = i * angleStep;
      const y = -height / 2 + i * heightStep;
      const leftPoint = new Vector3(
        radius * Math.cos(angle),
        y,
        radius * Math.sin(angle),
      );
      const rightPoint = new Vector3(
        radius * Math.cos(angle + Math.PI),
        y,
        radius * Math.sin(angle + Math.PI),
      );
      leftPoints.push(leftPoint);
      rightPoints.push(rightPoint);
    }
    return {
      leftPoints,
      rightPoints,
    };
  }, [basePairs, radius, height, turns]);

  return (
    <group rotation={[0, 0, 3 * (Math.PI / 4)]} scale={2.2}>
      <group ref={groupRef}>
        <DNAHelix points={leftPoints} />
        <DNAHelix points={rightPoints} />
        {leftPoints.map((start, index) => {
          const firstBase = bases[index % bases.length];
          const secondBase: Base =
            firstBase === "A"
              ? "T"
              : firstBase === "T"
                ? "A"
                : firstBase === "C"
                  ? "G"
                  : "C";
          return (
            <BasePair
              key={index}
              start={start}
              end={rightPoints[index]}
              firstBase={firstBase}
              secondBase={secondBase}
              gap={gap}
            />
          );
        })}
      </group>
    </group>
  );
};
