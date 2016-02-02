import mini from './mini'
import React from 'react'
import ReactDOM from 'react-dom'

const MY_ACTION = 'my_action'

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
