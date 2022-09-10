import { elasticOut } from "svelte/easing"

export const flip = (node, { duration }) => ({
  duration,
  css: t => {
    const eased = elasticOut(t)
    return `
      transform: var(--translate) rotateY(${eased * 360}deg);
    `
  }
})