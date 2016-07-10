import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromEventPattern'
import 'rxjs/add/operator/map'

const actions = {}
let currentState = {}
let dispatch = () => {}

const stateStream = Observable
  .fromEventPattern(
    handler => { dispatch = handler },
    () => { dispatch = () => {} }
  )
  .map(next => {
    const newState = next(currentState)

    // only modify state if it has changed and is a valid object
    if (newState && typeof newState === 'object') {
      currentState = Object.assign({}, currentState, newState)
    }
    return currentState
  })

export function getState() {
  return stateStream
}

export function setState(newState) {
  if (typeof newState !== 'object') {
    console.error('State must be an object')
    return
  }

  dispatch(() => newState)
}

export function registerAction(actionType, handler) {
  if (typeof actionType !== 'string') {
    console.error('Action type must be a string')
    return
  } else if (typeof handler !== 'function') {
    console.error('Action handler must be a function')
    return
  } else if (actions[actionType] !== undefined) {
    console.error(`Action of type ${actionType} is already registered`)
    return
  }

  actions[actionType] = handler
}

export function createAction(actionType, action) {
  return new Promise((resolve, reject) => {
    if (actions[actionType] === undefined) {
      console.error(`No action of type: ${actionType}`)
      reject()
      return
    }

    dispatch(currentState => actions[actionType](currentState, action))

    resolve()
  })
}

export function bindAction(actionType, action) {
  return () => createAction(actionType, action)
}

const mini = {
  getState,
  setState,
  registerAction,
  createAction,
  bindAction
}

export default mini
