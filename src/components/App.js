import '../App.css';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Home from './home'
import LoadingBar from 'react-redux-loading'
import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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
                  <Route exact path='/leaderboard' component={Leader} />
                  <Route exact path='/add' component={NewQuestion} />
                  <Route exact path='/questions/:id' component={Question} />
                  <Route exact path='/questions/bad_id' component={NoMatch} />
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

// const Fragment = ({ children }) => (
//   <Grid padded="vertically" columns={1} centered>
//     <Grid.Row>
//       <Grid.Column style={{ maxWidth: 550 }}>{children}</Grid.Column>
//     </Grid.Row>
//   </Grid>
// );


function mapStateToProps({ authedUser }) {
  return {
    authedUser,
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App) 
