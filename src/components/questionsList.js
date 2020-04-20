import React from 'react';
import QuestionSample from './questionSample'
import { connect } from 'react-redux'
import Question from './question'
 

class List extends React.Component {


    render() {



        const {
            answeredQuestions,
            unAnsweredQuestions } = this.props;

        let questions = [];
        if (this.props.id === "answered") {
            questions = answeredQuestions
        } else if (this.props.id === "unAnswered") {
            questions = unAnsweredQuestions
        }

        return (
            <div >

                {questions.map(id =>

                    <li key={id}>
                        <Question id={id} />

                    </li>

                )}


            </div>
        );
    }
}

function mapStateToProps({ authedUser, users, questions }) {

     return {
        users,
        authedUser,
        answeredQuestions: Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp).filter(a => questions[a].optionOne.votes.includes(authedUser) ||
            questions[a].optionTwo.votes.includes(authedUser)),
        unAnsweredQuestions: Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp).filter(a => !(questions[a].optionOne.votes.includes(authedUser)) &&
            !(questions[a].optionTwo.votes.includes(authedUser))),

    }
}

export default connect(mapStateToProps)(List);
