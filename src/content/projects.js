import infiniteSpire from "../assets/infinite-spire.jpg";
import wbiw from "../assets/wbiw.png";
import emts from "../assets/electro_mts.png";

export const data = {
  title: "My Projects",
  projects: [
    {
      title: "What Blank is Watching",
      description: "A website that uses Anilist's GraphQL api to compile all the anime I have ever watched. Written using Svelte and Typescript this website is performant and beautiful.",
      img: wbiw,
      link: "https://whatblankiswatching.com/",
      delay: 2137,
    },
    {
      title: "Infinite Spire",
      description: "This is an expansion mod for the game Slay the Spire with over 60,000 subscribers. It adds lots of new content: New Relics, Cards, Events, Bosses.",
      img: infiniteSpire,
      link: "https://steamcommunity.com/sharedfiles/filedetails/?id=1610128058",
      delay: 0,
    },
    {
      title: "Electro ModTheSpire",
      description: "This is an Electron application that can be used as a replacement to the mod launcher ModTheSpire which is used for Slay The Spire modding.",
      img: emts,
      link: "https://github.com/GraysonnG/electro-mts",
      delay: 3379,
    },
  ]
}