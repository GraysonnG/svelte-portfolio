import { ABOUT, CONTACT, HOME, PROJECTS } from "../constants";

export const data = {
  pages: [
    {
      id: HOME,
      name: "Home",
      grow: true,
    },
    {
      id: PROJECTS,
      name: "Projects",
      grow: false,
    },
    {
      id: ABOUT,
      name: "About",
      grow: false,
    },
    {
      id: CONTACT,
      name: "Contact",
      grow: false,
    },
  ],
}