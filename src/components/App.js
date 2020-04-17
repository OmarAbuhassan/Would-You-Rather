import React from 'react';
import '../App.css';
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'


class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

render(){
  return (
    <div >
        
        hello


    </div>
  );
}
}

export default connect()(App);
