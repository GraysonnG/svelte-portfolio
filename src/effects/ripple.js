export function ripple(node) {
  const handleClick = (event) => {
    createRipple(event.currentTarget, event.clientX, event.clientY)
  }

  node.addEventListener("click", handleClick, true)

  return {
    destroy() {
      node.removeEventListener("click", handleClick, true)
    }
  }
}

function createRipple(element, clientX, clientY) {
  const rekt = element.getBoundingClientRect()
  const circle = document.createElement("span")
  const diameter = Math.max(element.clientWidth, element.clientHeight)
  const radius = diameter / 2

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${clientX - rekt.x - radius}px`
  circle.style.top = `${clientY - rekt.y - radius}px`
  circle.classList.add("ripple")

  const ripple = element.getElementsByClassName("ripple")[0]

  if (ripple) {
    ripple.remove()
  }

  element.appendChild(circle)
}