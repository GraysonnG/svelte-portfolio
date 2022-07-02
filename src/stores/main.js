import { writable } from "svelte/store";
import About from "../routes/About.svelte";
import Contact from "../routes/Contact.svelte";
import Home from "../routes/Home.svelte";
import Projects from "../routes/Projects.svelte";

export const state = writable({
  loading: true,
  screen: Home,
  screenName: "home",
  headerHidden: true,
})

export const goToScreen = (screenId) => {
  state.update(oldstate => {
    switch (screenId) {
      default:
      case "home":
        oldstate.screenName = screenId
        oldstate.screen = Home
        return oldstate
      case "projects":
        oldstate.screenName = screenId
        oldstate.screen = Projects
        return oldstate
      case "about":
        oldstate.screenName = screenId
        oldstate.screen = About
        return oldstate
      case "contact":
        oldstate.screenName = screenId
        oldstate.screen = Contact
        return oldstate
    }
  })
}

export const goToNextScreen = () => {
  state.update(oldState => {
    if (oldState.screenName == "home") {
      oldState.screenName = "projects"
      oldState.screen = Projects
      return oldState
    } 
    if (oldState.screenName == "projects") {
      oldState.screenName = "about"
      oldState.screen = About
      return oldState
    }
    if (oldState.screenName == "about") {
      oldState.screenName = "contact"
      oldState.screen = Contact
      return oldState
    }
    return oldState
  })
}

export const goToPreviousScreen = () => {
  state.update(oldState => {
    if (oldState.screenName == "projects") {
      oldState.screenName = "home"
      oldState.screen = Home
      return oldState
    }
    if (oldState.screenName == "about") {
      oldState.screenName = "projects"
      oldState.screen = Projects
      return oldState
    }
    if (oldState.screenName == "contact") {
      oldState.screenName = "about"
      oldState.screen = About
      return oldState
    }
    return oldState
  })
}