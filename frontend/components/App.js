import React from 'react'
import axios from 'axios'



const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {

  state = {
    todos: [],
    error: '',
    todonameinput: 'boing'


  }

  todoNameChge = evt => {
    const { value } = evt.target
    this.setState({ ...this.state, todonameinput: value })
  }
  resetForm = () => this.setState({ ... this.state, todonameinput: '' })
  setAxiosResposeErr = err => this.setState({ ...this.state, error: err.response.data.message })

  postNewTodos = () => {
    axios.post(URL, { name: this.state.todonameinput })
      .then(res => {
        this.setState({...this.state, todos: this.state.todos.concat(res.data.data)})
        this.resetForm
      })
      .catch(this.setAxiosResposeErr)
  }

  onTodoFormSbmt = evt => {
    evt.preventDefault()
    this.postNewTodos
  }





  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data })
      })
      .catch(err => {
        this.setState(this.setAxiosResposeErr)
      })


  }

  componentDidMount() {
    this.fetchAllTodos()
  }


  render() {

    return (
      <div>

        <div id="error">Error: {this.state.error} </div>
        <div id="todos" >
          <h2>Todos:</h2>
          {
            this.state.todos.map(td => {
              return <div key={td.id}>{td.name}</div>
            })
          }

        </div>

        <form id="todoForm" onSubmit={this.onTodoFormSbmt}>
          <input type="text" placeholder="type todo" > </input>
          <input type="submit"> </input>
          <button> clear completed </button>


        </form>
      </div>

    )
  }
}

