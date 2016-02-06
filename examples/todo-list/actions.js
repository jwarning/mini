import mini from '../../src'
import { ADD_TODO, REMOVE_TODO, REMOVE_ALL_TODOS } from './actionTypes'

export function registerActions() {
  mini.registerAction(ADD_TODO, (state, action) => {
    let todos = state.todos.slice(0)
    let id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 0
    todos.push({ id, text: action.text })
    return Object.assign({}, state, {
      todos
    })
  })

  mini.registerAction(REMOVE_TODO, (state, action) => {
    let todos = state.todos.slice(0)
    todos.splice(todos.findIndex(t => t.id === action.id), 1)
    return Object.assign({}, state, {
      todos
    })
  })

  mini.registerAction(REMOVE_ALL_TODOS, (state, action) => {
    return Object.assign({}, state, {
      todos: []
    })
  })
}
