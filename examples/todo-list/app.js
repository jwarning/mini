import mini from '../../src'
import React from 'react'
import ReactDOM from 'react-dom'
import { registerActions } from './actions'
import { app } from './components'

registerActions()

mini.subscribeToState(state => {
  console.log(state)
  ReactDOM.render(React.createElement(app, state),
    document.getElementById('app'))
}, error => {
  console.error(error)
})

mini.setState({
  todos: []
})
