"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Home,
  Phone,
  Mail,
  MapPin,
  Maximize,
  Car,
  Utensils,
  Waves,
  Thermometer,
  AirVent,
  Sun,
} from "lucide-react";
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
import Lightbox from "@/components/Lightbox";
import HeroCarousel from "@/components/HeroCarousel";
import ApartmentShowcase, { Apartment } from "@/apartments-showcase";

const apartment2Bed: Apartment = {
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
      desktopSpan: "col-span-3 row-span-2",
      mobileSpan: "col-span-3",
    },
    {
      src: "/byt1_6.png",
      title: "Obývacia izba",
      desktopSpan: "col-span-2 row-span-2",
      mobileSpan: "col-span-3",
    },
    {
      src: "/byt1_7.png",
      title: "Kúpeľňa",
      desktopSpan: "col-span-1 row-span-1",
      mobileSpan: "col-span-3",
    },
    {
      src: "/byt1_1.png",
      title: "Hlavná spálňa",
      desktopSpan: "col-span-1 row-span-1",
      mobileSpan: "col-span-3",
    },
    {
      src: "/byt1_5.png",
      title: "Spálňa s výhľadom",
      desktopSpan: "col-span-2 row-span-1",
      mobileSpan: "col-span-3",
    },
    {
      src: "/byt1_4.png",
      title: "Chodba",
      desktopSpan: "col-span-1 row-span-1",
      mobileSpan: "col-span-3",
    },
    {
      src: "/byt1_8.png",
      title: "Kúpeľňa",
      desktopSpan: "col-span-3 row-span-1",
      mobileSpan: "col-span-3",
    },
  ],
};

const apartment3Bed: Apartment = {
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
      desktopSpan: "col-span-2 row-span-2",
      mobileSpan: "col-span-3",
    },
    {
      src: "/byt2_6.png",
      title: "Spálňa s office",
      desktopSpan: "col-span-1 row-span-1",
      mobileSpan: "col-span-3",
    },
    {
      src: "/byt2_8.png",
      title: "Hlavná kúpeľňa",
      desktopSpan: "col-span-1 row-span-2",
      mobileSpan: "col-span-3",
    },
    {
      src: "/byt2_10.png",
      title: "Hlavná spálňa",
      desktopSpan: "col-span-2 row-span-1",
      mobileSpan: "col-span-3",
    },
    {
      src: "/byt2_9.png",
      title: "Vstupná chodba",
      desktopSpan: "col-span-1 row-span-1",
      mobileSpan: "col-span-3",
    },
  ],
};

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

  const closeLightbox = () => setLightboxOpen(false);

  const nextLightboxImage = () =>
    setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);

  const prevLightboxImage = () =>
    setLightboxIndex(
      (prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length
    );

  const selectLightboxImage = (index: number) => setLightboxIndex(index);

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
      <header className="absolute top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-xs border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          <div
            className="flex items-center gap-3"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <Home className="w-6 h-6 text-white" />
            <h1 className="text-lg font-medium text-white">
              Rezidencia Lifestar
            </h1>
          </div>
          <Button variant="ghost" className="text-white sm:border ">
            <Phone className="w-4 h-4 sm:mr-2" />
            <span className="sm:block hidden">Kontakt</span>
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
              data-aos-delay="100"
            >
              <div className="text-3xl font-light text-black mb-2">2–3</div>
              <div className="text-gray-600">Možnosti spální</div>
            </div>
            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="text-3xl font-light text-black mb-2">2025</div>
              <div className="text-gray-600">Rok dokončenia</div>
            </div>
          </div>
          <img
            data-aos="fade-left"
            data-aos-delay="100"
            loading="lazy"
            src="/sirava2.jpg"
            alt="sirava"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </section>

      <section className="py-24">
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
                icon: <Maximize className="w-8 h-8 text-white" />,
                title: "Moderné bývanie​",
                desc: "Priestranné apartmány s rozlohou od 57 m²",
              },
              {
                icon: <Car className="w-8 h-8 text-white" />,
                title: "Parkovanie",
                desc: "Parkovacie miesto pre každý apartmán​",
              },
              {
                icon: <Utensils className="w-8 h-8 text-white" />,
                title: "Reštaurácia a kaviareň​​",
                desc: "Všetko pod jednou strechou priamo v objekte​",
              },
              {
                icon: <Waves className="w-8 h-8 text-white" />,
                title: "Relax​",
                desc: "Vonkajší bazén​, Vnútorný bazén​, Wellness​",
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

          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Thermometer className="w-8 h-8 text-white" />,
                title: "Tepelné čerpadlá",
                desc: "Moderný a úsporný spôsob vykurovania",
              },
              {
                icon: <AirVent className="w-8 h-8 text-white" />,
                title: "Klimatizácia​",
                desc: "Schlaďte sa počas letných horúčav",
              },
              {
                icon: <Sun className="w-8 h-8 text-white" />,
                title: "Fotovoltické panely​",
                desc: "Úspora nákladov vďaka slnečnej energii",
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
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-light text-black mb-6">
            Lokalita projektu
          </h2>
          <p className="text-lg text-gray-600">
            Pokojná zóna s výbornou dostupnosťou a občianskou vybavenosťou v
            okolí.
          </p>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2627.4886210261125!2d22.01585847771602!3d48.81073787132596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473936bfb55a525b%3A0xbd7e977962753b57!2sKloko%C4%8Dov%20272%2C%20072%2036%20Kloko%C4%8Dov!5e0!3m2!1ssk!2ssk!4v1751282595336!5m2!1ssk!2ssk"
          width="600"
          height="450"
          loading="lazy"
          className="w-full max-w-6xl mx-auto grayscale shadow-sm rounded-sm border"
          data-aos="fade-up"
          data-aos-delay="100"
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
            data-aos-delay="100"
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
                  <a href="tel:+421905233983">+421 905 233 983</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <a href="mailto:lifestar@plastymat.sk">
                    lifestar@plastymat.sk
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1" />
                  <div>
                    <p>Klokočov 272</p>
                    <p>072 36 Klokočov</p>
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
            data-aos-delay="100"
          >
            <p className="text-gray-400">
              © 2025 Slovak Techno Export - Plastymat s.r.o. Všetky práva
              vyhradené.
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
