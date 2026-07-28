"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const pointerRef = useRef<{ down: boolean; x: number; delta: number }>({
    down: false,
    x: 0,
    delta: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = canvas.offsetWidth;
    const onResize = () => {
      if (canvas) width = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.6,
      mapSamples: 20000,
      mapBrightness: 11,
      baseColor: [0.02, 0.28, 0.5],
      markerColor: [0.1, 0.57, 1],
      glowColor: [0, 0.57, 1],
      scale: 1,
      offset: [0, 0],
      markers: [],
    });

    let frame: number;
    const renderLoop = () => {
      if (!pointerRef.current.down) {
        phiRef.current += 0.0035;
      }
      globe.update({
        phi: phiRef.current + pointerRef.current.delta,
        width: width * 2,
        height: width * 2,
      });
      frame = requestAnimationFrame(renderLoop);
    };
    frame = requestAnimationFrame(renderLoop);

    const onPointerDown = (e: PointerEvent) => {
      pointerRef.current.down = true;
      pointerRef.current.x = e.clientX;
      canvas.style.cursor = "grabbing";
    };
    const onPointerUp = () => {
      pointerRef.current.down = false;
      phiRef.current += pointerRef.current.delta;
      pointerRef.current.delta = 0;
      canvas.style.cursor = "grab";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!pointerRef.current.down) return;
      pointerRef.current.delta = (e.clientX - pointerRef.current.x) * 0.005;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);

    return () => {
      cancelAnimationFrame(frame);
      globe.destroy();
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        cursor: "grab",
        contain: "layout paint size",
      }}
    />
  );
}
