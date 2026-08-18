import type { Vector3 } from "three";

export type Base = "A" | "T" | "C" | "G";

export interface BasePairProps {
  start: Vector3;
  end: Vector3;
  firstBase: Base;
  secondBase: Base;
  gap?: number;
}

export interface DNAHelixProps {
  points: Vector3[];
}

export interface DNAProps {
  basePairs?: number;
  radius?: number;
  height?: number;
  turns?: number;
  gap?: number;
}
