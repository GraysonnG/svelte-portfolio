import { writable } from "svelte/store";
import About from "../routes/About.svelte";
import Contact from "../routes/Contact.svelte";
import Home from "../routes/Home.svelte";
import Projects from "../routes/Projects.svelte";

export const state = writable({
  loading: true,
  screen: Home,
})

export const goToScreen = (screenId) => {
  state.update(oldstate => {
    switch (screenId) {
      default:
      case "home":
        oldstate.screen = Home
        return oldstate
      case "projects":
        oldstate.screen = Projects
        return oldstate
      case "about":
        oldstate.screen = About
        return oldstate
      case "contact":
        oldstate.screen = Contact
        return oldstate
    }
  })
}