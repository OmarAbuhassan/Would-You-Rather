import '../App.css';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/Shared'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import React, {  Fragment } from 'react'
import Home from './home'
import Nav from './nav'
import Leader from './leaderBoard'
import NewQuestion from './newQuestion'
import Question from './question'
import Login from './login';
import NoMatch from './noMatch';


class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (

      <Router>
        {this.props.authedUser === null ? (
          <Route
            render={() => (
              <div className="center">
              <Login />
              </div>
            )}
          />
        ) : (
            <Fragment >
              <LoadingBar />
              <div className="center">
                <Nav />
                <Switch >
                  <Route exact path='/' component={Home} />
                  
                  <Route exact path='/add' component={NewQuestion} />
                  <Route exact path='/questions/bad_id' component={NoMatch} />
                  <Route exact path='/questions/:id' component={Question} />
                  <Route exact path='/leaderboard' component={Leader} />
                  
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
    loaded: authedUser === null
    
  }
}

export default connect(mapStateToProps)(App) 
