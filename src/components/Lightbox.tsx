"use client";

import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type ImageInfo = { src: string; title: string };

interface LightboxProps {
  images: ImageInfo[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onImageSelect: (index: number) => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
  onImageSelect,
}: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xs">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>
      <div className="flex items-center justify-center h-full px-4 pb-24">
        <div className="relative max-w-6xl max-h-[70vh] w-full h-full">
          <img
            loading="lazy"
            src={currentImage?.src || "/placeholder.svg"}
            alt={currentImage?.title || ""}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <button
        onClick={onPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        disabled={images.length <= 1}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        disabled={images.length <= 1}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      <div className="absolute top-6 left-6 text-white">
        <h3 className="text-xl font-medium mb-1">{currentImage?.title}</h3>
        <p className="text-sm text-white/70">
          {currentIndex + 1} z {images.length}
        </p>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6">
        <div className="flex gap-2 justify-center pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onImageSelect(index)}
              className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                index === currentIndex
                  ? "ring-2 ring-white scale-110"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <img
                loading="lazy"
                src={image.src || "/placeholder.svg"}
                alt={image.title}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
