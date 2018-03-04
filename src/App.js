import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
  }

  handleInput = (event) => {
    this.setState({input: event.target.value})
  }

  addAnecdote = (event) => {
    event.preventDefault()
    this.props.store.dispatch({type: 'ADD', data: {content: this.state.input}})
  }


  render() {
    const anecdotes = this.props.store.getState()
    anecdotes.sort((a, b) => b.votes - a.votes)
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.props.store.dispatch({type: 'VOTE', data: {id: anecdote.id}})}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input onChange={this.handleInput} value={this.state.input}/></div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}

export default App
