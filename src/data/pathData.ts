import { Path } from "../interface/pathsType";

import {
  HomeIcon,
  UserIcon,
  PhoneIcon,
  BriefcaseIcon,
  FolderIcon,
  WrenchScrewdriverIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export const paths: Path[] = [
  {
    name: "Home",
    href: "/",
    admin: "dashboard",
    icon: HomeIcon,
  },
  {
    name: "About",
    href: "about",
    icon: UserIcon,
  },

  {
    name: "Projects",
    href: "projects",
    icon: FolderIcon,
  },
  {
    name: "Skills",
    href: "skills",
    icon: WrenchScrewdriverIcon,
  },

  {
    name: "Experience",
    href: "experience",
    icon: BriefcaseIcon,
  },

  {
    name: "Contact",
    href: "contact",
    icon: PhoneIcon,
  },

  {
    name: "Settings",
    admin: "setting",
    icon: Cog6ToothIcon,
    href: "/",
  },
];
