import mini from '../../src'
import React from 'react'
import { ADD_TODO, REMOVE_TODO, REMOVE_ALL_TODOS } from './actionTypes'

const inputBox = props => {
  return React.createElement('span', null,
    React.createElement('input', {
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
  return React.createElement('div', null,
    props.todos.map(t => React.createElement(todoItem, { key: t.id, todo: t }))
  )
}

const todoItem = props => {
  return React.createElement('div', null,
    React.createElement('span', null, props.todo.id + ' ' + props.todo.text),
    React.createElement('button', {
      type: 'button',
      onClick: mini.bindAction(REMOVE_TODO, { id: props.todo.id })
    }, 'Remove')
  )
}

export const app = props => {
  return React.createElement('div', null,
    React.createElement(inputBox, null),
    // React.createElement('button', {
    //   type: 'button',
    //   onClick: e => {
    //     // if (e.keyCode === 13 && e.target.value.trim() !== '') {
    //     //   mini.createAction(ADD_TODO, { text: e.target.value })
    //     //   e.target.value = ''
    //     // }
    //   }
    // }, 'Add todo'),
    React.createElement(todoList, { todos: props.todos }),
    React.createElement('button', {
      type: 'button',
      onClick: mini.bindAction(REMOVE_ALL_TODOS)
    }, 'Remove all')
  )
}
