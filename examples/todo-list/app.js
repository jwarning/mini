import mini from '../../dist/index'
import createElement from 'inferno-create-element'
import InfernoDOM from 'inferno-dom'
import { registerActions } from './actions'
import { app } from './components'

registerActions()

mini.getState().subscribe(state => {
  console.log(state)
  InfernoDOM.render(createElement(app, state), document.getElementById('app'))
}, error => {
  console.error(error)
})

mini.setState({
  title: 'Todo list',
  todos: []
})
