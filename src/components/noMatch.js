import React, { Component } from 'react';
 
export class NoMatch extends Component {

  render() {
    return (
      <div className='center'>
        <h1>404 Error</h1>
        <p>Something goes error. Please try again.</p>
      </div>
    );
  }
}

export default NoMatch;