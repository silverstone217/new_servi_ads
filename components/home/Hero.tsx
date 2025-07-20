import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { StepForward } from "lucide-react";
import { oswald, spaceGrotesk } from "@/lib/fonts";
import ImageSlider from "./ImageSlider";

const Hero = () => {
  return (
    <section className="h-screen w-full snap-start">
      {/* container */}
      <div className="w-full flex h-full flex-col relative transition-all duration-300 ease-in-out">
        {/* images */}
        <div className=" w-full h-full transition-all duration-300 ease-in-out">
          <ImageSlider />
        </div>

        {/* infos */}
        <div
          className="absolute inset-0 flex flex-col z-10  text-white
        bg-gradient-to-bl from-transparent via-black/30 to-black/80
        transition-all duration-500 ease-in-out
        "
        >
          {/* top part */}
          <div className="flex flex-col gap-2 py-16 pb-10 px-6">
            <h1
              className={`${spaceGrotesk.className} text-5xl md:text-6xl lg:text-7xl 
              xl:text-9xl
              font-black
              transition-all duration-500 ease-in-out
              `}
            >
              DECOUVRER
            </h1>
            <p
              className="max-w-[300px] lg:max-w-[350px] xl:max-w-[450px] text-balance lg:text-lg xl:text-2xl
            transition-all duration-500 ease-in-out
            "
            >
              Booster votre activité personnelle ou professionnelle, avec de des
              meilleurs solutions publicitaires.
            </p>
            <Link href={"#"}>
              <Button
                className={`${oswald.className} w-52 lg:w-60 xl:w-72 rounded-xl mt-2 py-5 group`}
              >
                <span>VOIR NOS SERVICES</span>
                <StepForward
                  className="size-4 lg:size-5  group-hover:-rotate-90
                transition-all duration-500 ease-in-out
                "
                />
              </Button>
            </Link>
          </div>

          {/* bottom part */}
          <div className="mt-auto py-10 px-6 flex flex-col items-end ">
            <h1
              className={`${spaceGrotesk.className} text-5xl md:text-6xl lg:text-7xl  xl:text-9xl font-black
              transition-all duration-500 ease-in-out
              `}
            >
              SERVI ADS.
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
