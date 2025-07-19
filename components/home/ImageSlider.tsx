"use client";

import React, { useEffect, useState, useRef } from "react";
import pub7 from "@/public/images/pub7.jpg";
import pub2 from "@/public/images/pub2.jpg";
import pub3 from "@/public/images/pub3.jpg";
import pub4 from "@/public/images/pub4.jpg";
import Image from "next/image";

const IMAGES = [pub7, pub2, pub3, pub4];

const ImageSlider = () => {
  const [index, setIndex] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  // Fonction qui démarre l'intervalle et l'animation
  const startSlider = () => {
    if (intervalIdRef.current) return; // Empêche doublons

    if (progressRef.current) {
      progressRef.current.style.animation = "none";
      void progressRef.current.offsetWidth; // trigger reflow
      progressRef.current.style.animation =
        "progressFill 5000ms linear forwards";
    }

    intervalIdRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);

      if (progressRef.current) {
        progressRef.current.style.animation = "none";
        void progressRef.current.offsetWidth;
        progressRef.current.style.animation =
          "progressFill 5000ms linear forwards";
      }
    }, 5000);
  };

  // Fonction qui stoppe intervalle et animation
  const stopSlider = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    if (progressRef.current) {
      progressRef.current.style.animation = "none";
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Si visible, démarrer
            startSlider();
          } else {
            // Sinon, arrêter
            stopSlider();
          }
        });
      },
      {
        root: null,
        threshold: 0.1, // déclenche si 10% visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(containerRef.current);
      }
      stopSlider();
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Image */}
      <Image
        src={IMAGES[index].src}
        alt={`Slide ${index + 1}`}
        priority={index === 0}
        className="w-full h-full object-cover transition-all duration-300 ease-in-out"
        width={1520}
        height={1520}
      />

      {/* Barre de progression */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "5px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
        }}
      >
        <div
          ref={progressRef}
          style={{
            height: "100%",
            width: "0%",
            backgroundColor: "#0070f3",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes progressFill {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ImageSlider;
