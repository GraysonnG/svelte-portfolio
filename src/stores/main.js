import { writable } from "svelte/store";
import { ABOUT, CONTACT, HOME, PROJECTS, GAME } from "../constants";
import About from "../routes/About.svelte";
import Contact from "../routes/Contact.svelte";
import Home from "../routes/Home.svelte";
import Projects from "../routes/Projects.svelte";
import Game from "../easteregg/Game.svelte";

export const state = writable({
  loading: true,
  screen: Home,
  screenName: HOME,
  headerHidden: true,
  easterEggActive: false,
})

export const goToScreen = (screenId) => {
  state.update(oldstate => {
    switch (screenId) {
      default:
      case HOME:
        oldstate.screenName = screenId
        oldstate.screen = Home
        return oldstate
      case PROJECTS:
        oldstate.screenName = screenId
        oldstate.screen = Projects
        return oldstate
      case ABOUT:
        oldstate.screenName = screenId
        oldstate.screen = About
        return oldstate
      case CONTACT:
        oldstate.screenName = screenId
        oldstate.screen = Contact
        return oldstate
    }
  })
}

export const goToNextScreen = () => {
  state.update(oldState => {
    if (oldState.screenName == HOME) {
      oldState.screenName = PROJECTS
      oldState.screen = Projects
      return oldState
    } 
    if (oldState.screenName == PROJECTS) {
      oldState.screenName = ABOUT
      oldState.screen = About
      return oldState
    }
    if (oldState.screenName == ABOUT) {
      oldState.screenName = CONTACT
      oldState.screen = Contact
      return oldState
    }
    return oldState
  })
}

export const goToPreviousScreen = () => {
  state.update(oldState => {
    if (oldState.screenName == PROJECTS) {
      oldState.screenName = HOME
      oldState.screen = Home
      return oldState
    }
    if (oldState.screenName == ABOUT) {
      oldState.screenName = PROJECTS
      oldState.screen = Projects
      return oldState
    }
    if (oldState.screenName == CONTACT) {
      oldState.screenName = ABOUT
      oldState.screen = About
      return oldState
    }
    return oldState
  })
}

export const goToGameEasterEgg = () => {
  state.update(oldState => {
    oldState.screenName = GAME
    oldState.screen = Game
    oldState.easterEggActive = true

    return oldState
  })
}

export const exitGameEasterEgg = () => {
  state.update(oldState => {
    oldState.screenName = HOME
    oldState.screen = Home
    oldState.easterEggActive = false
    return oldState
  })
}