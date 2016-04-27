import { Subject } from 'rxjs/Subject'

const actions = new Map()
const state = new Subject()

let currentState = {}

export function subscribeToState(success, error) {
  return state.subscribe(success, error)
}

export function setState(newState) {
  if (typeof newState !== 'object') {
    console.error('State must be an object')
    return
  }

  currentState = newState
  state.next(currentState)
}

export function registerAction(actionType, reducer) {
  if (typeof actionType !== 'string') {
    console.error('Action type must be a string')
    return
  } else if (typeof reducer !== 'function') {
    console.error('Action reducer must be a function')
    return
  } else if (actions.has(actionType)) {
    console.error('Action of type ' + actionType + ' is already registered')
    return
  }

  actions.set(actionType, reducer)
}

export function createAction(actionType, action) {
  return new Promise((resolve, reject) => {
    if (!actions.has(actionType)) {
      console.error('No action of type ' + actionType)
      reject()
      return
    }

    const newState = actions.get(actionType)(currentState, action)

    if (newState !== undefined) {
      currentState = Object.assign({}, currentState, newState)
      state.next(currentState)
    }

    resolve()
  })
}

export function bindAction(...args) {
  return createAction.bind(null, ...args)
}

const mini = {
  subscribeToState,
  setState,
  registerAction,
  createAction,
  bindAction
}

export default mini
