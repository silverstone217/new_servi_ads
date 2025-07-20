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
import { Loader, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

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

  const handelLogout = async () => {
    setLoading(true);
    try {
      await signOut();
      toast.success("Vous avez été deconnecté!");
    } catch (error) {
      toast.error("Erreur lors de la deconnexion");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <AvatarUser image={user.image} name={user.name} />
      </PopoverTrigger>
      <PopoverContent className="py-4 flex flex-col gap-2">
        <h2 className="px-4">Actions</h2>
        <Separator />
        <div className="px-4">
          <Button
            variant={"destructive"}
            onClick={handelLogout}
            disabled={loading}
          >
            {loading ? <Loader className="animate-spin" /> : <LogOut />}
            <span>Deconnexion</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
