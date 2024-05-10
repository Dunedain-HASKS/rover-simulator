import { useEffect, useRef } from "react";
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";

const withVantaBackground = (WrappedComponent) => {
  const WithVantaBackground = (props) => {
    const vantaRef = useRef(null);
    const vantaEffectRef = useRef(null);

    useEffect(() => {
      const vantaEffect = NET({
        el: vantaRef.current,
        THREE: THREE, // Pass THREE object
        mouseControls: true,
        touchControls: true,
        gyroControls: true,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        backgroundColor: 0x1f1f1c,
        color: 0x00ff00, // Set color to green (0x00ff00 represents pure green)
        // Other Vanta.js configuration options...
      });

      vantaEffectRef.current = vantaEffect;

      return () => {
        if (vantaEffectRef.current) vantaEffectRef.current.destroy();
      };
    }, []);

    return (
      <div
        ref={vantaRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <WrappedComponent {...props} />
      </div>
    );
  };

  WithVantaBackground.displayName = `withVantaBackground(${
    WrappedComponent.name || "Component"
  })`;

  return WithVantaBackground;
};

export default withVantaBackground;
