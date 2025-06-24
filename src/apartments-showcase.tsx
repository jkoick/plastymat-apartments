"use client";

import { useState, useEffect, memo, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  Home,
  Maximize,
  Users,
  Calendar,
  X,
} from "lucide-react";
import Image from "next/image";

type ImageInfo = { src: string; title: string };

interface ApartmentShowcaseProps {
  apartment: typeof apartment2Bed;
  openLightbox: (images: ImageInfo[], index: number) => void;
  reverse?: boolean;
}

const Lightbox = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
  onImageSelect,
}: {
  images: { src: string; title: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onImageSelect: (index: number) => void;
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrev();
          break;
        case "ArrowRight":
          onNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

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
};

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
    return () => timerRef.current && clearInterval(timerRef.current);
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
            Plastymat Residences
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
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30"
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

const apartment2Bed = {
  title: "2-izbová rezidencia",
  price: "€185 000",
  size: "75 m²",
  bedrooms: 2,
  bathrooms: 1,
  available: 5,
  floorPlan: "/byt1_3poschodie_pôdorys_page-0001.jpg",
  features: [
    "Panoramatické výhľady na jazero",
    "Prémiové kuchynské spotrebiče",
    "Vstavané šatníky",
    "Súkromný balkón",
    "Skladový priestor v cene",
    "Podlahové kúrenie",
  ],
  gallery: [
    {
      src: "/byt1_3.png",
      title: "Obývacia izba",
      span: "col-span-3 row-span-2",
    },
    {
      src: "/byt1_6.png",
      title: "Obývacia izba",
      span: "col-span-2 row-span-2",
    },
    {
      src: "/byt1_7.png",
      title: "Kúpeľňa",
      span: "col-span-1 row-span-1",
    },
    {
      src: "/byt1_1.png",
      title: "Hlavná spálňa",
      span: "col-span-1 row-span-1",
    },
    {
      src: "/byt1_5.png",
      title: "Spálňa s výhľadom",
      span: "col-span-2 row-span-1",
    },
    {
      src: "/byt1_4.png",
      title: "Chodba",
      span: "col-span-1 row-span-1",
    },
    {
      src: "/byt1_8.png",
      title: "Kúpeľňa",
      span: "col-span-3 row-span-1",
    },
  ],
};

const apartment3Bed = {
  title: "3-izbová rezidencia",
  price: "€235 000",
  size: "95 m²",
  bedrooms: 3,
  bathrooms: 2,
  available: 6,
  floorPlan: "/byt2_3poschodie_pôdorys_page-0001.jpg",
  features: [
    "Priestranná obývacia zóna",
    "Hlavná spálňa s en-suite",
    "Vyhradený pracovný kútik",
    "Balík prémiových spotrebičov",
    "Dva súkromné balkóny",
    "Priestor na vínotéku",
  ],
  gallery: [
    {
      src: "/byt2_3.png",
      title: "Kuchyňa a obývačka",
      span: "col-span-2 row-span-2",
    },
    {
      src: "/byt2_6.png",
      title: "Spálňa s office",
      span: "col-span-1 row-span-1",
    },
    {
      src: "/byt2_8.png",
      title: "Hlavná kúpeľňa",
      span: "col-span-1 row-span-2",
    },
    {
      src: "/byt2_10.png",
      title: "Hlavná spálňa",
      span: "col-span-2 row-span-1",
    },
    {
      src: "/byt2_9.png",
      title: "Vstupná chodba",
      span: "col-span-1 row-span-1",
    },
  ],
};

const ApartmentShowcase = ({
  apartment,
  openLightbox,
  reverse = false,
}: ApartmentShowcaseProps) => (
  <div className="py-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16" data-aos="fade-up">
        <h2 className="text-4xl text-black mb-6">{apartment.title}</h2>
        <div className="flex justify-center items-center gap-4 mb-8">
          <div className="text-center flex items-center gap-1">
            <div className="text-sm text-gray-600 mt-2">Od</div>
            <div className="text-3xl font-light text-black">
              {apartment.price}
            </div>
          </div>
          <div className="w-px h-12 bg-gray-300"></div>
          <div className="text-center">
            <div className="text-3xl font-light text-black mb-1">
              {apartment.available}
            </div>
            <div className="text-sm text-gray-600">Dostupných apartmánov</div>
          </div>
        </div>
        <div className="flex justify-center gap-8">
          <div className="flex items-center gap-2">
            <Bed className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600">{apartment.bedrooms} Izby</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600">{apartment.bathrooms} Kúpeľne</span>
          </div>
          <div className="flex items-center gap-2">
            <Square className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600">{apartment.size}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div
          className="lg:col-span-2"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <div className="bg-white rounded-lg p-8 shadow-sm border h-full">
            <h3 className="text-2xl font-light text-black mb-6">Pôdorys</h3>
            <div className="aspect-[4/3] relative mb-6">
              <img
                loading="lazy"
                src={apartment.floorPlan || "/placeholder.svg"}
                alt={`${apartment.title} Floor Plan`}
                className="object-cover rounded-lg w-full h-full"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Maximize className="w-5 h-5 mx-auto mb-2 text-gray-600" />
                <div className="text-sm font-medium text-black">
                  {apartment.size}
                </div>
                <div className="text-xs text-gray-600">Rozloha</div>
              </div>
              <div>
                <Users className="w-5 h-5 mx-auto mb-2 text-gray-600" />
                <div className="text-sm font-medium text-black">
                  {apartment.bedrooms + apartment.bathrooms}
                </div>
                <div className="text-xs text-gray-600">Spolu izieb</div>
              </div>
              <div>
                <Calendar className="w-5 h-5 mx-auto mb-2 text-gray-600" />
                <div className="text-sm font-medium text-black">Q4 2025</div>
                <div className="text-xs text-gray-600">
                  Plánované dokončenie
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="lg:col-span-1"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <div className="bg-white rounded-lg p-8 shadow-sm border h-full flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-light text-black mb-6">
                Vlastnosti
              </h3>
              <div className="space-y-4">
                {apartment.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-black rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <Button className="w-full mt-6 bg-black hover:bg-gray-800 text-white">
              Naplánovať obhliadku
            </Button>
          </div>
        </div>

        <div className="lg:col-span-3" data-aos="fade-up" data-aos-delay="400">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[200px]">
            {apartment.gallery.map((image, index) => (
              <div
                key={index}
                className={`${image.span} relative rounded-lg overflow-hidden group cursor-pointer`}
                data-aos="zoom-in"
                data-aos-delay={index * 100 + 500}
                onClick={() => openLightbox(apartment.gallery, index)}
              >
                <img
                  loading="lazy"
                  src={image.src || "/placeholder.svg"}
                  alt={image.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-sm font-medium">{image.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function Page() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<
    { src: string; title: string }[]
  >([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (
    images: { src: string; title: string }[],
    index: number
  ) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
  };

  const prevLightboxImage = () => {
    setLightboxIndex(
      (prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length
    );
  };

  const selectLightboxImage = (index: number) => {
    setLightboxIndex(index);
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <header className="absolute top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center gap-3" data-aos="fade-right">
            <Home className="w-6 h-6 text-black" />
            <h1 className="text-lg font-medium text-black">
              Plastymat Residences
            </h1>
          </div>
          <Button
            variant="outline"
            className="border-black text-black hover:bg-black hover:text-white"
            data-aos="fade-left"
          >
            <Phone className="w-4 h-4 mr-2" />
            Kontakt
          </Button>
        </div>
      </header>

      <HeroCarousel />

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-light text-black mb-6">
              Prémiové bývanie pri vode
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Zažite moderný luxus v našich premyslene navrhnutých apartmánoch s
              panoramatickým výhľadom na jazero, prémiovými povrchmi a modernými
              vybaveniami v pokojnom prostredí pri vode.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="text-3xl font-light text-black mb-2">11</div>
              <div className="text-gray-600">Prémiové apartmány</div>
            </div>
            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="text-3xl font-light text-black mb-2">2–3</div>
              <div className="text-gray-600">Možnosti spální</div>
            </div>
            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="text-3xl font-light text-black mb-2">2025</div>
              <div className="text-gray-600">Rok dokončenia</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <ApartmentShowcase
          openLightbox={openLightbox}
          apartment={apartment2Bed}
        />
      </section>

      <section className="bg-white">
        <ApartmentShowcase
          openLightbox={openLightbox}
          apartment={apartment3Bed}
          reverse
        />
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-light text-black mb-6">
              Vybavenie budovy
            </h2>
            <p className="text-lg text-gray-600">
              Luxusné vybavenie navrhnuté pre moderné bývanie
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Home className="w-8 h-8 text-white" />,
                title: "Prémiové povrchové úpravy",
                desc: "Špičkové materiály v celom interiéri",
              },
              {
                icon: <Square className="w-8 h-8 text-white" />,
                title: "Súkromné balkóny",
                desc: "Vonkajší priestor s výhľadom na jazero",
              },
              {
                icon: <Car className="w-8 h-8 text-white" />,
                title: "Súkromné parkovanie",
                desc: "Vyhradené parkovanie v cene",
              },
              {
                icon: <Maximize className="w-8 h-8 text-white" />,
                title: "Skladové priestory",
                desc: "Dodatočný úložný priestor",
              },
            ].map((b, i) => (
              <div
                key={i}
                className="text-center"
                data-aos="fade-up"
                data-aos-delay={(i + 1) * 100}
              >
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  {b.icon}
                </div>
                <h3 className="text-lg font-medium text-black mb-2">
                  {b.title}
                </h3>
                <p className="text-gray-600 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2177810120975!2d21.829456576416973!3d48.87312477133414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473eca526192f4b9%3A0x186efe88c040c2f3!2zS2Fzw6FyZW5za8OhIDIzMSwgMDcyIDIyIFN0csOhxb5za2U!5e0!3m2!1ssk!2ssk!4v1750766700766!5m2!1ssk!2ssk"
          width="600"
          height="450"
          loading="lazy"
          className="w-full max-w-6xl mx-auto grayscale shadow-sm rounded-sm border"
          data-aos="fade-up"
          data-aos-delay="200"
        ></iframe>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-light text-black mb-6">
              Rezervujte si svoj apartmán
            </h2>
            <p className="text-lg text-gray-600">
              Kontaktujte nás pre dohodnutie súkromnej obhliadky
            </p>
          </div>

          <Card
            className="bg-white shadow-sm border"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-black">
                      Meno a priezvisko
                    </Label>
                    <Input id="name" className="mt-2 border-gray-200" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-black">
                      E-mailová adresa
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      className="mt-2 border-gray-200"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone" className="text-black">
                      Telefónne číslo
                    </Label>
                    <Input id="phone" className="mt-2 border-gray-200" />
                  </div>
                  <div>
                    <Label htmlFor="apartment-type" className="text-black">
                      Záujem o apartmán
                    </Label>
                    <Select>
                      <SelectTrigger className="mt-2 border-gray-200">
                        <SelectValue placeholder="Vyberte typ apartmánu" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2-bedroom">
                          2-izbový apartmán
                        </SelectItem>
                        <SelectItem value="3-bedroom">
                          3-izbový apartmán
                        </SelectItem>
                        <SelectItem value="both">Oba typy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-black">
                    Správa
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Napíšte nám vaše požiadavky"
                    rows={4}
                    className="mt-2 border-gray-200"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="privacy" />
                  <Label htmlFor="privacy" className="text-sm text-gray-600">
                    Súhlasím so spracovaním osobných údajov podľa zásad ochrany
                    osobných údajov
                  </Label>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-black hover:bg-gray-800 text-white"
                >
                  Odoslať dopyt
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-16 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12" data-aos="fade-up">
            <div>
              <h3 className="text-xl font-light mb-6">Kontaktné informácie</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <span>info@lakesideresidences.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1" />
                  <div>
                    <p>123 Waterfront Drive</p>
                    <p>Sunset Bay, Premium District</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-light mb-6">Developer</h3>
              <div className="space-y-2">
                <p className="font-medium">Premium Developments Ltd.</p>
                <p className="text-gray-400">
                  Licencovaný developer a generálny dodávateľ
                </p>
                <p className="text-gray-400">
                  Špecializuje sa na luxusné rezidenčné projekty
                </p>
              </div>
            </div>
          </div>

          <div
            className="border-t border-gray-800 mt-12 pt-8 text-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <p className="text-gray-400">
              © 2025 Premium Developments Ltd. Všetky práva vyhradené.
            </p>
          </div>
        </div>
      </footer>

      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextLightboxImage}
        onPrev={prevLightboxImage}
        onImageSelect={selectLightboxImage}
      />
    </div>
  );
}
