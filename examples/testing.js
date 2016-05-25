import mini from '../../src'
import fetch from 'isomorphic-fetch'
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

// set state to initial value
mini.setState({
  yolo: 'yes',
  stuff: 0
})

// basic sync action diff
mini.registerAction(MY_ACTION, (state, action) => {
  return {
    stuff: action.id
  }
})

// timeout action
setTimeout(() => mini.createAction(MY_ACTION, { id: 1 }), 1000)

// chained action with a promise
mini.createAction(MY_ACTION, { id: 2 }).then(() => {
  mini.createAction(MY_ACTION, { id: 3 })
})

mini.createAction(MY_ACTION, { id: 4 })

mini.setState({
  yolo: 'yes',
  stuff: 5
})

// attempt to set state to non-object value
mini.setState(100)

// unsubscribe from the subscription after 10 seconds
setTimeout(() => subscription.unsubscribe(), 10000)

mini.registerAction(44, (state, action) => {
  return {
    stuff: action.id
  }
})

mini.registerAction('yolo', 55)

setTimeout(() => mini.createAction(MY_ACTION, { id: 7 }), 5000)

mini.registerAction(MY_ACTION, () => true)

// attempt to create action that does not exist
mini.createAction('swag', { id: 0 })

// async action with xhr
mini.registerAction(ASYNC_ACTION_START, () => {
  fetch('http://jsonplaceholder.typicode.com/posts/1')
    .then(data => {
      mini.createAction('ASYNC_ACTION_FINISH', { data })
    })
})

mini.registerAction(ASYNC_ACTION_FINISH, (state, action) => {
  return {
    data: action.data
  }
})

mini.createAction(ASYNC_ACTION_START)
