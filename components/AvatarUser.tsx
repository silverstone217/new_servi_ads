"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { User } from "@/types/authTypes";
import { Separator } from "./ui/separator";
import { ChevronRight, Loader, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { OtherLinks } from "@/utils/links";
import Link from "next/link";

type Props = {
  image?: string | null;
  name?: string | null;
};

const AvatarUser = ({ image, name }: Props) => {
  const shortName = name ? name.slice(0, 1).toUpperCase() : "U";
  return (
    <Avatar>
      {image ? (
        <AvatarImage src={image} />
      ) : (
        <AvatarFallback className="text-black text-xl font-black bg-white">
          {shortName}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default AvatarUser;

type AvatarUserPopoverProps = {
  user: User | null;
};
export const AvatarUserWithPopover = ({ user }: AvatarUserPopoverProps) => {
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut();
      toast.success("Vous avez été déconnecté !");
    } catch (error) {
      toast.error("Erreur lors de la déconnexion");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full p-0 w-10 h-10 hover:border border-border shadow-sm hover:shadow-md transition"
          aria-label="Menu utilisateur"
        >
          <AvatarUser image={user.image} name={user.name} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-60 p-4 flex flex-col gap-4 rounded-xl shadow-xl border bg-background backdrop-blur-sm"
      >
        <div>
          <span className={`block text-xs mb-1 text-muted-foreground`}>
            Connecté en tant que
          </span>
          <span className="block font-bold truncate">{user.name}</span>
        </div>

        <Separator />

        <nav className="flex flex-col gap-2">
          {OtherLinks.map((link) => (
            <Link
              key={link.value}
              href={link.value}
              className="flex items-center gap-3 group rounded-lg px-3 py-2 transition hover:bg-muted"
            >
              <link.Icon className="w-5 h-5 text-primary" />
              <span className="flex-1 text-sm">{link.label}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
            </Link>
          ))}
        </nav>

        <Separator />

        <Button
          variant="destructive"
          className="flex items-center gap-2 w-full"
          disabled={loading}
          onClick={handleLogout}
        >
          {loading ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <LogOut className="w-4 h-4" />
          )}
          <span>Déconnexion</span>
        </Button>
      </PopoverContent>
    </Popover>
  );
};
