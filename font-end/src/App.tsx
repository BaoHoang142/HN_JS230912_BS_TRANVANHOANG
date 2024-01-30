import React, { Component } from 'react'
import FormTodo from './components/todo/FormTodo'

type Props = {}

type State = {}

export default class App extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div>
        <FormTodo></FormTodo>
      </div>
    )
  }
}