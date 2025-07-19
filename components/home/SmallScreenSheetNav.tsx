"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { oswald, spaceGrotesk } from "@/lib/fonts";
import { HomeLinks } from "@/utils/links";
import Link from "next/link";

const SmallScreenSheetNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex flex-col gap-1.5 md:hidden">
          <span className="w-12 h-1 bg-white" />
          <span className="w-12 h-1 bg-white" />
        </div>
      </SheetTrigger>
      <SheetContent
        className="py-6  max-w-3xl w-[85%]  h-screen 
      overflow-x-hidden overflow-y-auto bg-gray-950 text-gray-100 border-gray-900"
      >
        <SheetHeader className="relative w-full px-8">
          <SheetTitle
            className={`${spaceGrotesk.className} text-lg font-bold text-gray-100`}
          >
            SERVI ADS.
          </SheetTitle>
          <SheetDescription>
            Optimiser votre publicité et augmenter vos ventes et votre
            visibilité.
          </SheetDescription>
        </SheetHeader>
        {/* content */}
        <div className="flex-1 py-4 border-y px-4 border-gray-800">
          <nav className="flex flex-col gap-4">
            {HomeLinks.map((link, idx) => {
              return (
                <Link
                  key={idx}
                  href={link.value}
                  className={`flex items-center gap-3 w-full p-4 font-medium text-2xl
                    ${oswald.className}
                    `}
                >
                  <link.Icon className="size-8 shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SmallScreenSheetNav;
