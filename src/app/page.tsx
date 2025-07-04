"use client";

import { useState, useEffect, useRef } from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AOS from "aos";
import "aos/dist/aos.css";
import emailjs from "@emailjs/browser";
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
  Heart,
  Users,
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
import Link from "next/link";

const schema = yup.object({
  name: yup.string().required("Meno a priezvisko je povinné"),
  email: yup
    .string()
    .email("Neplatná e-mailová adresa")
    .required("E-mailová adresa je povinná"),
  phone: yup
    .string()
    .matches(/^\+?\d{9,15}$/, "Neplatné telefónne číslo")
    .required("Telefónne číslo je povinné"),
  apartmentType: yup.string().required("Zvoľte typ apartmánu"),
  privacy: yup.boolean().oneOf([true], "Súhlas je povinný"),
  message: yup.string().notRequired(),
});

const apartment2Bed: Apartment = {
  title: "2-izbový apartmán",
  price: "cena dohodou",
  size: "od 57 m²",
  bedrooms: 2,
  bathrooms: 1,
  available: 4,
  floorPlan: "/byt1_3.png",
  features: [
    "Balkón",
    "Podlahové teplovodné kúrenie",
    "Tepelné čerpadlo",
    "Centrálna rekuperácia pre apartmán",
    "Klimatizácia",
    "Možnosť holobytu alebo štandardu",
  ],
  gallery: [
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

const apartment25Bed: Apartment = {
  title: "2.5-izbový apartmán",
  price: "cena dohodou",
  size: "od 64 m²",
  bedrooms: 2,
  bathrooms: 1,
  available: 3,
  floorPlan: "/byt1_3.png",
  features: [
    "Balkón",
    "Podlahové teplovodné kúrenie",
    "Tepelné čerpadlo",
    "Centrálna rekuperácia pre apartmán",
    "Klimatizácia",
    "Možnosť holobytu alebo štandardu",
    "Exkluzívny jedálenský kút v presklennej časti apartmánu s výhľadom na vodu",
  ],
  gallery: [
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
  title: "3-izbový apartmán",
  price: "cena dohodou",
  size: "od 62 m²",
  bedrooms: 3,
  bathrooms: 2,
  available: 8,
  floorPlan: "/byt2_3.png",
  features: [
    "Balkón",
    "Podlahové teplovodné kúrenie",
    "Tepelné čerpadlo",
    "Centrálna rekuperácia pre apartmán",
    "Možnosť aj  2 kúpeľní",
    "Samostatné WC alebo WC v druhej kúpeľni",
  ],
  gallery: [
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

const Roadmap = () => {
  const roadmapItems = [
    {
      phase: "1. etapa",
      title: "Rekonštrukcia apartmánov",
      startDate: "01/2025",
      endDate: "12/2025",
      description: "Začiatok rekonštrukcie apartmánov",
      milestone: "Spustenie rezervácií apartmánov 9/2025",
      status: "upcoming",
    },
    {
      phase: "2. etapa",
      title: "Kaviareň, reštaurácia, wellness",
      startDate: "01/2026",
      endDate: "12/2026",
      description: "Zahájenie výstavby spoločenských priestorov",
      milestone: "Kompletné vybavenie wellness centra",
      status: "planned",
    },
    {
      phase: "3. etapa",
      title: "Spevnené plochy a vonkajšie úpravy",
      startDate: "01/2027",
      endDate: "12/2027",
      description: "Finalizácia exteriérových úprav",
      milestone: "Dokončenie celého projektu",
      status: "planned",
    },
  ];
  return (
    <div className="relative">
      <div className="sm:absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

      <div className="space-y-6 sm:space-y-12">
        {roadmapItems.map((item, index) => (
          <div
            key={index}
            className="relative flex items-start gap-8"
            data-aos="fade-up"
            data-aos-delay={index * 200}
          >
            <div className="relative z-10 w-16 h-16 bg-black rounded-full hidden sm:flex items-center justify-center flex-shrink-0">
              <span className="text-white font-medium text-sm">
                {item.phase.split(".")[0]}
              </span>
            </div>
            <div className="flex-1 bg-white rounded-lg p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                <div>
                  <div className="flex gap-2 sm:block">
                    <span className="font-medium text-xl block sm:hidden">
                      {item.phase.split(".")[0]}
                    </span>
                    <h3 className="text-xl font-medium text-black mb-2">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                <div className="text-right lg:text-left lg:min-w-[200px] hidden sm:block">
                  <div className="text-2xl font-light text-black">
                    {item.startDate}
                  </div>
                  <div className="text-sm text-gray-500">Začiatok</div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="text-sm text-gray-600 mb-2">
                    Kľúčový míľnik:
                  </div>
                  <div className="text-black font-medium">{item.milestone}</div>
                </div>
                <div className="flex mt-6 sm:block justify-between">
                  <div className="text-left lg:text-left lg:min-w-[200px] sm:hidden block">
                    <div className="text-2xl font-light text-black">
                      {item.startDate}
                    </div>
                    <div className="text-sm text-gray-500">Začiatok</div>
                  </div>
                  <div className="text-right lg:text-left lg:min-w-[200px]">
                    <div className="text-2xl font-light text-black">
                      {item.endDate}
                    </div>
                    <div className="text-sm text-gray-500">Ukončenie</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      item.status === "upcoming"
                        ? "bg-black w-3/4"
                        : item.status === "planned"
                        ? "bg-gray-400 w-0"
                        : "bg-black w-full"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Page() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      apartmentType: "",
      privacy: false,
      message: "",
    },
  });

  const sendEmail = async () => {
    if (!formRef.current) return;
    setStatus("loading");
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("ok");
      formRef.current.reset();
      reset();
    } catch {
      setStatus("error");
    }
  };

  const onSubmit = async () => {
    await sendEmail();
  };

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
            <h1 className="text-lg font-medium text-white">
              Rezidencia Lifestar
            </h1>
          </div>
          <Link
            className="flex items-center gap-1"
            href="#kontakt"
            passHref={true}
          >
            <Button
              variant="ghost"
              type="button"
              className="text-white sm:border cursor-pointer"
            >
              <Phone className="w-4 h-4 sm:mr-2" />
              <span className="sm:block hidden">Kontakt</span>
            </Button>
          </Link>
        </div>
      </header>

      <HeroCarousel />

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12 gap-6">
            <div
              className="col-span-12 md:col-span-6 lg:col-span-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="bg-white border border-gray-200 p-8 rounded-2xl h-full hover:border-black transition-colors duration-300">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6">
                  <Home className="w-8 h-8 text-black" />
                </div>
                <h4 className="text-xl font-medium text-black mb-4">
                  Tí, čo hľadajú druhý domov pri vode
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Zákazníci, ktorí chcú mať rekreačné bývanie v príjemnom
                  prostredí
                </p>
              </div>
            </div>

            <div
              className="col-span-12 md:col-span-6 lg:col-span-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="bg-white border border-gray-200 p-8 rounded-2xl h-full hover:border-black transition-colors duration-300">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-black" />
                </div>
                <h4 className="text-xl font-medium mb-4">
                  Investori so záujmom o rekreačné byty na predaj/prenájom
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Investori, ktorí hľadajú príležitosť na kúpu a prenájom
                  rekreačných nehnuteľností
                </p>
              </div>
            </div>

            <div
              className="col-span-12 lg:col-span-3"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="bg-white border border-gray-200 p-8 rounded-2xl h-full hover:border-black transition-colors duration-300">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-black" />
                </div>
                <h4 className="text-lg font-medium text-black mb-4">
                  Rodiny, ktoré uprednostňujú pokojné bývanie
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Alternatívu k rušnému mestskému životu
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-light text-black mb-6">
              Harmonogram projektu
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Sledujte pokrok našeho projektu od začiatku rekonštrukcie až po
              úplné dokončenie všetkých etáp
            </p>
          </div>

          <Roadmap />
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

      <section id="apartmany" className="bg-gray-50">
        <ApartmentShowcase
          openLightbox={openLightbox}
          apartment={apartment2Bed}
        />
      </section>

      <section className="bg-white">
        <ApartmentShowcase
          reverse={true}
          openLightbox={openLightbox}
          apartment={apartment25Bed}
        />
      </section>

      <section className="bg-gray-50">
        <ApartmentShowcase
          openLightbox={openLightbox}
          apartment={apartment3Bed}
        />
      </section>

      <section className="py-24 bg-white">
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

      <section id="kontakt" className="py-24 bg-gray-50">
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
              <form
                ref={formRef}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-black">
                      Meno a priezvisko
                    </Label>
                    <Input
                      id="name"
                      className="mt-2 border-gray-200"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message as string}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-black">
                      E-mailová adresa
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      className="mt-2 border-gray-200"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message as string}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone" className="text-black">
                      Telefónne číslo
                    </Label>
                    <Input
                      id="phone"
                      className="mt-2 border-gray-200"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message as string}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="apartment-type" className="text-black">
                      Záujem o apartmán
                    </Label>
                    <Controller
                      name="apartmentType"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="mt-2 border-gray-200">
                            <SelectValue placeholder="Vyberte typ apartmánu" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2-izbový apartmán">
                              2-izbový apartmán
                            </SelectItem>
                            <SelectItem value="2.5-izbový apartmán">
                              2.5-izbový apartmán
                            </SelectItem>
                            <SelectItem value="3-izbový apartmán">
                              3-izbový apartmán
                            </SelectItem>
                            <SelectItem value="všetky typy apartmánov">
                              všetky typy apartmánov
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <input
                      type="hidden"
                      name="apartment-type"
                      value={watch("apartmentType")}
                    />
                    {errors.apartmentType && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.apartmentType.message as string}
                      </p>
                    )}
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
                    {...register("message")}
                  />
                </div>

                <Controller
                  name="privacy"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="privacy"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label
                        htmlFor="privacy"
                        className="text-sm text-gray-600"
                      >
                        Súhlasím so spracovaním osobných údajov podľa zásad
                        ochrany osobných údajov
                      </Label>
                    </div>
                  )}
                />
                {errors.privacy && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.privacy.message as string}
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-black hover:bg-gray-800 text-white cursor-pointer"
                >
                  {status === "loading"
                    ? "Odosielam..."
                    : status === "ok"
                    ? "Odoslané"
                    : "Odoslať dopyt"}
                </Button>
                {status === "error" && (
                  <p className="text-red-500 text-sm text-center mt-2">
                    Niečo sa pokazilo. Skúste znova.
                  </p>
                )}
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
                <p className="font-medium">
                  {" "}
                  © 2025 Slovak Techno Export - Plastymat s.r.o.
                </p>
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
