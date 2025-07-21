"use client";
import { oswald, spaceGrotesk } from "@/lib/fonts";
import { QuoteData } from "@/utils/auth";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";
const QUOTES = QuoteData;
const GreetingComponent = () => {
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % QUOTES.length);
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const item = useMemo(() => QUOTES[index], [index]);

  return (
    <div className="h-screen relative">
      {/* images slider */}
      <div className="h-full w-full">
        <Image
          src={item.image}
          alt={"Citation de" + item.author}
          width={1000}
          height={1000}
          className="object-cover h-full w-full"
          priority={index === 0}
        />
      </div>
      {/* greeting section */}
      <div
        className="bg-gradient-to-t from-black/60 via-transparent to-black/60
      absolute top-0 left-0 bottom-0 right-0 justify-center items-center text-white
      md:p-6 lg:p-8 2xl:p-10 flex flex-col
      "
      >
        {/* company name */}
        <div className="text-5xl lg:text-6xl 2xl:text-8xl text-white font-black w-full">
          <span className={`${spaceGrotesk.className}`}>SERVI ADS.</span>
        </div>
        {/* quote */}
        <div className="mt-auto flex flex-col gap-3 w-full">
          <p className="max-w-md text-lg">{item.quote}</p>
          <p className={"text-lg font-bold " + oswald.className}>
            {item.author} <span> - </span>
            <span className="text-base font-medium">{item.company}</span>
          </p>
        </div>
      </div>

      {/* button nav */}
      <div
        className="bottom-0 left-0 right-0 absolute flex items-center justify-center gap-2
      
      "
      >
        {QUOTES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setIndex(idx)}
            className={`flex-1 h-1.5 rounded-2xl ${
              idx === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default GreetingComponent;
