import { oswald } from "@/lib/fonts";
import { HomeLinks } from "@/utils/links";
import Link from "next/link";
import React from "react";
import SmallScreenSheetNav from "./SmallScreenSheetNav";
import { getUser } from "@/actions/auth-actions";
import { AvatarUserWithPopover } from "../AvatarUser";

const Header = async () => {
  const user = await getUser();
  return (
    <header
      className="w-full fixed z-50 backdrop-blur-sm top-0 left-0 right-0 h-14 
    text-white flex items-center
    "
    >
      {/* conatainer */}
      <div className="flex w-full h-full px-6 items-center justify-between">
        {/* avatar profil */}
        {user ? <AvatarUserWithPopover user={user} /> : <span />}

        {/* menu open small screen */}
        <SmallScreenSheetNav />

        {/* links nav big screen */}
        <nav className="md:flex items-center gap-4 hidden">
          {HomeLinks.map((link, idx) => {
            return (
              <Link
                href={link.value}
                key={idx}
                className={`${oswald.className} font-medium
                hover:text-gray-500 transition-all duration-500
                ease-in-out
                `}
              >
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
