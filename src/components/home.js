import React from 'react';
import List from './questionsList'


class Home extends React.Component {




    render() {
 


        return (
            <div >
                <h1>Un answerd</h1>
                <List id="unAnswered"
                    />

                <div >
                    <h1>Answerd</h1>
                    <List id="answered"
                         />
                </div>
            </div>

        );
    }
}

 

export default  Home;
