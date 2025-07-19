import React from "react";
import pub5 from "@/public/images/pub5.jpg";
import pub8 from "@/public/images/pub8.jpg";
import pub7 from "@/public/images/pub7.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // shadcn/ui Button import
import { ArrowRight } from "lucide-react";
import { spaceGrotesk } from "@/lib/fonts";

const DiscoverSection = () => {
  return (
    <section
      className="min-h-screen w-full bg-gray-200 flex flex-col items-center justify-center 
    px-6 text-center snap-start"
    >
      <h2
        className={`text-3xl md:text-3xl xl:text-5xl 2xl:text-6xl font-extrabold mb-4 
      leading-tight max-w-4xl text-gray-900
      ${spaceGrotesk.className}
      `}
      >
        Boostez votre activité avec des campagnes publicitaires efficaces
      </h2>
      <p className=" text-sm  xl:text-lg max-w-3xl text-gray-700 mb-8 ">
        SERVI ADS vous accompagne avec une solution simple et puissante pour
        augmenter votre visibilité, toucher plus de clients, et développer votre
        business.
      </p>

      <div className="flex gap-6">
        <Button
          variant="default"
          className="flex items-center gap-2 px-10 py-5 rounded-2xl"
        >
          Voir nos services <ArrowRight size={20} />
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 px-10 py-5 rounded-2xl"
        >
          En savoir plus <ArrowRight size={20} />
        </Button>
      </div>

      <div className="mt-10 w-full max-w-xl relative grid grid-cols-3 gap-4">
        <Image
          src={pub8} // adapte le chemin selon ton dossier public
          alt="Image promotionnelle Servi ADS"
          style={{ objectFit: "cover", borderRadius: 12 }}
          priority={false}
          className="w-full h-56  lg:h-60 shadow"
          width={600}
          height={600}
        />
        <Image
          src={pub5} // adapte le chemin selon ton dossier public
          alt="Image promotionnelle Servi ADS"
          style={{ objectFit: "cover", borderRadius: 12 }}
          priority={false}
          className="w-full h-56  lg:h-60 mt-6 shadow"
          width={600}
          height={600}
        />
        <Image
          src={pub7} // adapte le chemin selon ton dossier public
          alt="Image promotionnelle Servi ADS"
          style={{ objectFit: "cover", borderRadius: 12 }}
          priority={false}
          className="w-full h-56  lg:h-60 shadow"
          width={600}
          height={600}
        />
      </div>
    </section>
  );
};

export default DiscoverSection;
