import ListComponent from "@/components/ads/ListComponent";
import { oswald, spaceGrotesk } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

function AdsPage() {
  return (
    <>
      <div className="max-w-4xl mx-auto min-h-screen flex flex-col p-6 md:p-10">
        {/* header */}
        <header
          className={cn(
            "flex items-center gap-1 mb-14 text-lg font-bold",
            oswald.className
          )}
        >
          <Link
            href={"/"}
            className="hover:text-gray-600 transition ease-in duration-300"
          >
            <span>Accueil</span>
          </Link>
          <span>/</span>
          <span className="text-gray-500">Publicités</span>
        </header>
        {/* content */}
        <main className="flex-1">
          <h1
            className={cn(
              "text-4xl font-bold mb-8 uppercase",
              spaceGrotesk.className
            )}
          >
            Publicités
          </h1>
          <ListComponent />
        </main>
      </div>
      {/* footer */}
      <footer className="px-6 py-8 bg-secondary/40">
        <div>
          <p className=" text-center text-lg">
            <strong className={`${oswald.className}`}>SERVI ADS.</strong> &copy;
            2025 Tous droits réservés
          </p>
        </div>
      </footer>
    </>
  );
}

export default AdsPage;
