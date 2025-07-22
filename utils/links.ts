import {
  House,
  Clapperboard,
  Info,
  Headset,
  Layers,
  Kanban,
  User,
} from "lucide-react";

export const HomeLinks = [
  {
    label: "Accueil",
    value: "/",
    Icon: House,
  },
  {
    label: "Publicités",
    value: "/options-publicites",
    Icon: Clapperboard,
  },
  {
    label: "A propos",
    value: "/a-propos",
    Icon: Info,
  },
  {
    label: "Contact",
    value: "/contact",
    Icon: Headset,
  },
];

export const OtherLinks = [
  {
    label: "Dashboard",
    value: "/dashboard",
    Icon: Layers,
  },
  {
    label: "Admins",
    value: "/administrateurs",
    Icon: Kanban,
  },
  {
    label: "Profil",
    value: "/profil",
    Icon: User,
  },
];
