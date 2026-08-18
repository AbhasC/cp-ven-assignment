import { useMemo } from "react";
import { CatmullRomCurve3 } from "three";
import type { DNAHelixProps } from "./types";
import { STRAND_COLOR } from "./constants";

export const DNAHelix = ({ points }: DNAHelixProps) => {
  const curve = useMemo(() => new CatmullRomCurve3(points), [points]);

  return (
    <mesh>
      <tubeGeometry args={[curve, 64, 0.025, 8, false]} />
      <meshStandardMaterial color={STRAND_COLOR} />
    </mesh>
  );
};
