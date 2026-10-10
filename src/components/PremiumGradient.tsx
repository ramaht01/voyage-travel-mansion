import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";

export default function PremiumGradient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <ShaderGradientCanvas
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <ShaderGradient
          animate="on"
          type="waterPlane"
          color1="#07111f"
          color2="#123b5b"
          color3="#22d3ee"
          brightness={0.7}
          cAzimuthAngle={180}
          cPolarAngle={90}
          cDistance={4}
          uSpeed={0.15}
        />
      </ShaderGradientCanvas>
    </div>
  );
}
