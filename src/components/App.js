import '../App.css';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Home from './home'
import LoadingBar from 'react-redux-loading'
import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'
import Nav from './nav'
import Leader from './leaderBoard'
import NewQuestion from './newQuestion'
import Question from './question'
import Login from './login';
import NoMatch from './noMatch';


class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (

      <Router>
        {this.props.authedUser === null ? (
          <Route
            render={() => (

              <Login />

            )}
          />
        ) : (
            <Fragment>
              <LoadingBar />
              <div >
                <Nav />
               <Switch >
                    <Route exact path='/' component={Home} />
                    <Route path='/leaderboard' component={Leader} />
                    <Route path='/add' component={NewQuestion} />
                    <Route path='/questions/:id' component={Question} />
                    <Route component={NoMatch} />

                  </Switch >
              </div>
            </Fragment>
          )
        }
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App) 
