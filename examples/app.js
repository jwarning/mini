import jsonXHR from 'json-xhr-promise'
import mini from '../src'
import React from 'react'
import ReactDOM from 'react-dom'

const MY_ACTION = 'MY_ACTION'
const ASYNC_ACTION_START = 'ASYNC_ACTION_START'
const ASYNC_ACTION_FINISH = 'ASYNC_ACTION_FINISH'

let myComponent = props => {
  return React.createElement('div', null,
    React.createElement('button', {
      type: 'button',
      onClick: mini.bindAction(MY_ACTION, { id: 99 })
    }, 'do stuff'),
    React.createElement('div', null, 'state: ' + props.id)
  )
}

let subscription = mini.subscribeToState(s => {
  console.log(s)
  ReactDOM.render(React.createElement(myComponent, { id: s.stuff }),
    document.getElementById('app'))
}, e => {
  console.log('error ' + e)
})

mini.setState({
  yolo: 'yes',
  stuff: 0
})

mini.registerAction(MY_ACTION, (state, action) => {
  return Object.assign({}, state, {
    stuff: action.id
  })
})

setTimeout(() => mini.createAction(MY_ACTION, { id: 1 }), 1000)

mini.createAction(MY_ACTION, { id: 2 }).then(() => {
  mini.createAction(MY_ACTION, { id: 3 })
})

mini.createAction(MY_ACTION, { id: 4 })

mini.setState({
  yolo: 'yes',
  stuff: 5
})

mini.setState(100)

setTimeout(() => subscription.dispose(), 10000)

mini.registerAction(44, (state, action) => {
  return Object.assign(state, {
    stuff: action.id
  })
})

mini.registerAction('yolo', 55)

setTimeout(() => mini.createAction(MY_ACTION, { id: 7 }), 5000)

mini.registerAction(MY_ACTION, () => true)

mini.createAction('swag', { id: 0 })

mini.registerAction(ASYNC_ACTION_START, () => {
  jsonXHR('GET', 'http://jsonplaceholder.typicode.com/posts/1')
  .then(data => {
    mini.createAction('ASYNC_ACTION_FINISH', { data })
  })
})

mini.registerAction(ASYNC_ACTION_FINISH, (state, action) => {
  return Object.assign({}, state, {
    data: action.data
  })
})

mini.createAction(ASYNC_ACTION_START)
