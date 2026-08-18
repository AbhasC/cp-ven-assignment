import { useMemo, useRef } from "react";
import { Quaternion, Vector3 } from "three";
import type { Group } from "three";
import type { BasePairProps } from "./types";
import { BASE_COLORS } from "./constants";

export const BasePair = ({
  start,
  end,
  firstBase,
  secondBase,
  gap = 0.15,
}: BasePairProps) => {
  const groupRef = useRef<Group>(null);

  const { leftPosition, rightPosition, quaternion, segmentLength } =
    useMemo(() => {
      const direction = new Vector3().subVectors(end, start);
      const distance = direction.length();
      const unitDirection = direction.clone().normalize();
      const midpoint = new Vector3().addVectors(start, end).multiplyScalar(0.5);
      const quaternion = new Quaternion().setFromUnitVectors(
        new Vector3(0, 1, 0),
        unitDirection,
      );
      const segmentLength = (distance - gap) / 2;
      const offset = unitDirection
        .clone()
        .multiplyScalar((segmentLength + gap) / 2);
      const leftPosition = midpoint.clone().sub(offset);
      const rightPosition = midpoint.clone().add(offset);
      return {
        leftPosition,
        rightPosition,
        quaternion,
        segmentLength,
      };
    }, [start, end, gap]);

  return (
    <group ref={groupRef}>
      <mesh position={leftPosition} quaternion={quaternion}>
        <cylinderGeometry args={[0.025, 0.025, segmentLength, 8]} />
        <meshStandardMaterial color={BASE_COLORS[firstBase]} />
      </mesh>
      <mesh position={rightPosition} quaternion={quaternion}>
        <cylinderGeometry args={[0.025, 0.025, segmentLength, 8]} />
        <meshStandardMaterial color={BASE_COLORS[secondBase]} />
      </mesh>
    </group>
  );
};
