const keyActions = []

export const addKeyAction = (key, action) => {
  keyActions.push({
    pressed: false,
    key,
    invoke: action,
  })
}

export const runKeyActions = (props, dt) => {
  keyActions
    .filter(action => action.pressed)
    .forEach(action => {
      action.invoke(props, dt)
    })
}

export const setKeyActionPressed = (key, pressed) => {
  keyActions
    .filter(action => action.key.toLowerCase() === key.toLowerCase())
    .forEach(action => {
      action.pressed = pressed
    })
}