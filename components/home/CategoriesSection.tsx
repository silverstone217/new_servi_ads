import { oswald, spaceGrotesk } from "@/lib/fonts";
import { AdsData } from "@/utils/data";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const CategoriesSection = () => {
  const newData = AdsData;

  return (
    <section
      className=" w-full text-white px-6 pt-20 pb-14 bg-gray-900
    flex flex-col items-center 2xl:min-h-screen justify-center
    sm:min-h-[calc(100vh + 56px)] min-h-screen
    "
    >
      <h2 className={`text-6xl ${spaceGrotesk.className} font-black mb-6`}>
        Ce que nous proposons
      </h2>
      <Link href={"/options-publicites"}>
        <Button
          className="px-10 py-5 text-gray-950 rounded-2xl"
          variant={"outline"}
        >
          <span>Voire plus</span>
        </Button>
      </Link>

      <div className="py-14"></div>

      <div
        className="grid max-w-4xl mx-auto md:gap-6 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
       items-start"
      >
        {newData.map((item, index) => {
          return (
            <div
              key={index}
              className={`flex flex-row gap-6 sm:flex-col w-full items-start sm:items-center
                    
                    `}
            >
              <div
                className={`shrink-0  p-8 ${
                  index === 0
                    ? "bg-red-800/30"
                    : index === 1
                    ? "bg-yellow-800/30"
                    : index === 2
                    ? "bg-green-800/30"
                    : "bg-blue-800/30"
                } rounded-full shadow
                    
                    `}
              >
                <item.Icon
                  className={`size-8 sm:size-10 md:size-12 xl:size-14 ${
                    index === 0
                      ? "text-red-600"
                      : index === 1
                      ? "text-yellow-600"
                      : index === 2
                      ? "text-green-600"
                      : "text-blue-600"
                  } 
                        
                        `}
                />
              </div>

              <div className="flex flex-col gap-4 flex-1 sm:flex-none">
                <h3 className={`text-2xl ${oswald.className}`}>{item.title}</h3>
                <p className={`text-gray-600 line-clamp-3`}>
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoriesSection;
