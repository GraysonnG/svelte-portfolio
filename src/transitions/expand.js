import { expoOut } from "svelte/easing"

export const expand = (node, { duration, inwards, fade }) => ({
  duration,
  css: t => {
    const eased = expoOut(t)
    const exp = inwards ? 0.1 : -0.1

    return `
      transform: translate(-50%, -50%) scale(${1 - (eased * exp)});
      ${fade ? `opacity: ${eased};` : ""}
    `
  }
})