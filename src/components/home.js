import React from 'react';
import { connect } from 'react-redux'
import List from './questionsList'
import authedUser from '../reducers/authedUser';


class Home extends React.Component {




    render() {
        console.log("Home: ", this.props)



        return (
            <div >
                <h3>Un answerd</h3>
                <List ids={this.props.questionIds}
                 autherdUser={this.props.authedUser} />

            </div>
        );
    }
}

function mapStateToProps({ questions ,autherdUser }) {



    return {
        autherdUser,
        questionIds: Object.keys(questions)
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    }
}

export default connect(mapStateToProps)(Home);
