import mini from '../../src'
import createElement from 'inferno-create-element'
import { ADD_TODO, REMOVE_TODO, REMOVE_ALL_TODOS } from './actions'

const inputBox = props => {
  return createElement('span', null,
    createElement('input', {
      type: 'text',
      onKeyUp: e => {
        if (e.keyCode === 13 && e.target.value.trim() !== '') {
          mini.createAction(ADD_TODO, { text: e.target.value })
          e.target.value = ''
        }
      }
    })
  )
}

const todoList = props => {
  return createElement('div', { className: 'todo-list' },
    props.todos.map(t => createElement(todoItem, { todo: t }))
  )
}

const todoItem = props => {
  return createElement('div', { className: 'todo-list__item' },
    createElement('span', null, props.todo.id + ' ' + props.todo.text),
    createElement('button', {
      type: 'button',
      className: 'remove-button',
      onClick: mini.bindAction(REMOVE_TODO, { id: props.todo.id })
    }, 'Remove')
  )
}

export const app = props => {
  return createElement('div', null,
    createElement('div', { className: 'title' }, 'Todo list'),
    createElement(inputBox, null),
    // createElement('button', {
    //   type: 'button',
    //   onClick: e => {
    //     if (e.keyCode === 13 && e.target.value.trim() !== '') {
    //       mini.createAction(ADD_TODO, { text: e.target.value })
    //       e.target.value = ''
    //     }
    //   }
    // }, 'Add todo'),
    createElement(todoList, { todos: props.todos }),
    createElement('button', {
      type: 'button',
      onClick: mini.bindAction(REMOVE_ALL_TODOS)
    }, 'Remove all')
  )
}
