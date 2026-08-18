import { Canvas } from "@react-three/fiber";
import { DNA } from "./DNA";

export const DNASection = () => {
  return (
    <section className="h-full w-full">
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: 50,
        }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <DNA basePairs={70} radius={1} gap={0.05} turns={2.5} height={10} />
      </Canvas>
    </section>
  );
};
