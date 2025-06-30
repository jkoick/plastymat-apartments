"use client";

import {
  Maximize,
  Users,
  Calendar,
  Bed,
  Bath,
  Square,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import Link from "next/link";

type ImageInfo = {
  src: string;
  title: string;
  desktopSpan: string;
  mobileSpan: string;
};

export interface Apartment {
  title: string;
  price: string;
  size: string;
  bedrooms: number;
  bathrooms: number;
  available: number;
  floorPlan: string;
  features: string[];
  gallery: ImageInfo[];
}

interface ApartmentShowcaseProps {
  apartment: Apartment;
  openLightbox: (images: ImageInfo[], index: number) => void;
}

export default function ApartmentShowcase({
  apartment,
  openLightbox,
}: ApartmentShowcaseProps) {
  const handleClick = useCallback(
    (index: number) => openLightbox(apartment.gallery, index),
    [apartment.gallery, openLightbox]
  );

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl text-black mb-6">{apartment.title}</h2>
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="flex flex-col-reverse sm:flex-row items-center gap-1">
              <div className="text-sm text-gray-600 mt-2">Od</div>
              <div className="text-3xl font-light text-black">
                {apartment.price}
              </div>
            </div>
            <div className="w-px h-12 bg-gray-300" />
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
              <span className="text-gray-600">
                {apartment.bathrooms} Kúpeľne
              </span>
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
            data-aos-delay="100"
          >
            <div className="bg-white rounded-lg p-8 shadow-sm border h-full">
              <h3 className="text-2xl font-light text-black mb-6">Pôdorys</h3>
              <div className="relative mb-6">
                <img
                  loading="lazy"
                  src={apartment.floorPlan || "/placeholder.svg"}
                  alt={`${apartment.title} Floor Plan`}
                  className="object-cover rounded-lg w-full h-full"
                />
                <Link
                  className="absolute right-0 top-0 flex items-center gap-1"
                  href="/lifestar-podorys.pdf"
                  target="_blank"
                  passHref={true}
                >
                  <Button>
                    Pozrieť plán
                    <ExternalLink size={16} />
                  </Button>
                </Link>
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
            data-aos-delay="100"
          >
            <div className="bg-white rounded-lg p-8 shadow-sm border h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-light text-black mb-6">
                  Vlastnosti
                </h3>
                <div className="space-y-4">
                  {apartment.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-black rounded-full flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button className="w-full mt-6 bg-black hover:bg-gray-800 text-white">
                <a href="#kontakt">Naplánovať obhliadku</a>
              </Button>
            </div>
          </div>

          <div
            className="lg:col-span-3"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="mt-8">
              <h2 className="text-2xl font-light text-black mb-8 text-center">
                Galéria interiéru
              </h2>

              <div className="block md:hidden">
                <div className="grid grid-cols-2 gap-3">
                  {apartment.gallery.map((image, index) => (
                    <div
                      key={index}
                      className={`${image.mobileSpan} relative aspect-square rounded-lg overflow-hidden group cursor-pointer`}
                      data-aos="zoom-in"
                      data-aos-delay={index * 100 + 500}
                      onClick={() => handleClick(index)}
                    >
                      <img
                        loading="lazy"
                        src={image.src || "/placeholder.svg"}
                        alt={image.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-xs font-medium">{image.title}</div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Maximize className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden md:block lg:hidden">
                <div className="grid grid-cols-3 gap-4">
                  {apartment.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
                      data-aos="zoom-in"
                      data-aos-delay={index * 100 + 500}
                      onClick={() => handleClick(index)}
                    >
                      <img
                        loading="lazy"
                        src={image.src || "/placeholder.svg"}
                        alt={image.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute bottom-3 left-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-sm font-medium">{image.title}</div>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Maximize className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="grid grid-cols-6 gap-4 auto-rows-[200px]">
                  {apartment.gallery.map((image, index) => (
                    <div
                      key={index}
                      className={`${image.desktopSpan} relative rounded-lg overflow-hidden group cursor-pointer`}
                      data-aos="zoom-in"
                      data-aos-delay={index * 100 + 500}
                      onClick={() => handleClick(index)}
                    >
                      <img
                        loading="lazy"
                        src={image.src || "/placeholder.svg"}
                        alt={image.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-sm font-medium">{image.title}</div>
                      </div>

                      <div className="absolute inset-0 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Maximize className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
