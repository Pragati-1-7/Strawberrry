"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 142;
const START_FRAME = 51;

export default function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(0);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const frameNum = (START_FRAME + i).toString().padStart(5, "0");
      img.src = `/sequence/${frameNum}.png`;

      img.onload = () => {
        loadCount++;
        setLoaded(loadCount);
        if (loadCount === FRAME_COUNT) {
          setImages(loadedImages);
          setIsReady(true);
        }
      };
      
      img.onerror = () => {
        console.error(`Failed to load image ${frameNum}.png`);
        loadCount++; // Increment anyway to not block
        setLoaded(loadCount);
        if (loadCount === FRAME_COUNT) {
          setImages(loadedImages);
          setIsReady(true);
        }
      }

      loadedImages.push(img);
    }
  }, []);

  // Handle Canvas Drawing and Scroll
  useEffect(() => {
    if (!isReady || images.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    // Set canvas dimensions
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      renderFrame(currentFrameIndex);
    };

    let currentFrameIndex = 0;

    const renderFrame = (index: number) => {
      if (!images[index] || !images[index].complete) return;
      
      const img = images[index];
      
      // Calculate aspect ratio
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      // Object cover logic
      if (canvasRatio > imgRatio) {
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Initial draw
    updateCanvasSize();

    // Scroll handler
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate frame based on scroll percentage
      const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
      const frameIndex = Math.floor(scrollFraction * (FRAME_COUNT - 1));
      
      if (frameIndex !== currentFrameIndex) {
        currentFrameIndex = frameIndex;
        requestAnimationFrame(() => renderFrame(currentFrameIndex));
      }
    };

    window.addEventListener("resize", updateCanvasSize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isReady, images]);

  return (
    <>
      {/* Loading Screen */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-1000 ease-in-out ${
          isReady ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="text-primary mb-4 text-xl font-medium tracking-widest uppercase">
          Loading
        </div>
        <div className="h-[2px] w-64 bg-white/10 overflow-hidden relative">
          <div
            className="absolute top-0 left-0 h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${(loaded / FRAME_COUNT) * 100}%` }}
          />
        </div>
        <div className="mt-4 text-white/50 text-sm">
          {Math.round((loaded / FRAME_COUNT) * 100)}%
        </div>
      </div>

      {/* Pinned Canvas */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-background pointer-events-none overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full object-cover scale-[1.05] origin-center transform-gpu" />
        {/* Watermark Hider Overlay */}
        <div className="absolute bottom-0 right-0 w-1/3 h-24 bg-gradient-to-t from-[#050505] to-transparent z-10" />
        <div className="absolute bottom-0 right-0 w-24 h-16 bg-[#050505] blur-md z-10" />
      </div>
    </>
  );
}
