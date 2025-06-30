"use client";

import { useState, useEffect, useRef, memo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroCarousel = memo(function HeroCarousel() {
  const slides = [
    {
      src: "/byt1_3.png",
      title: "Moderné obytné priestory",
      subtitle: "Otvorený koncept s panoramatickými výhľadmi",
    },
    {
      src: "/byt2_1.png",
      title: "Súčasná kuchyňa",
      subtitle: "Prémiové spotrebiče a povrchové úpravy",
    },
    {
      src: "/byt1_6.png",
      title: "Pokojné spálne",
      subtitle: "Minimalistický dizajn pre maximálne pohodlie",
    },
    {
      src: "/byt1_5.png",
      title: "Integrovaný pracovný priestor",
      subtitle: "Vstavané riešenia pre moderné bývanie",
    },
    {
      src: "/byt1_7.png",
      title: "Luxusné kúpeľne",
      subtitle: "Wellness vybavenie a prémiové prvky",
    },
  ];

  const [index, setIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      5000
    );
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer();
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const next = () => {
    setIndex((i) => (i + 1) % slides.length);
    resetTimer();
  };

  const prev = () => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
    resetTimer();
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            loading="lazy"
            src={s.src}
            alt={s.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl px-6">
          <h1 className="text-6xl md:text-7xl font-light mb-6 tracking-wide">
            Rezidencia Lifestar
          </h1>
          <p className="text-xl md:text-2xl font-light mb-4 opacity-90">
            {slides[index].title}
          </p>
          <p className="text-lg mb-12 opacity-80">{slides[index].subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Zobraziť byty
            </Button>
            <Button size="lg" variant="default">
              Naplánovať obhliadku
            </Button>
          </div>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full sm:flex hidden items-center justify-center text-white hover:bg-white/30"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full sm:flex hidden items-center justify-center text-white hover:bg-white/30"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
});

export default HeroCarousel;
