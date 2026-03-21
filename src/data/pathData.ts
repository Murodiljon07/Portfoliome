import { Path } from "../interface/pathsType";

import {
  HomeIcon,
  UserIcon,
  PhoneIcon,
  BriefcaseIcon,
  FolderIcon,
  WrenchScrewdriverIcon,
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
    name: "Contact",
    href: "contact",
    icon: PhoneIcon,
  },
  {
    name: "Experience",
    href: "experience",
    icon: BriefcaseIcon,
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
];
