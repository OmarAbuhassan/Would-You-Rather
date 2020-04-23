import React from 'react';
import QuestionSample from './questionSample'
import { connect } from 'react-redux'


class List extends React.Component {


    render() {



        const {
            answeredQuestions,
            unAnsweredQuestions } = this.props;

        let questions = [];
        if (this.props.id === "Answered") {
            questions = answeredQuestions
        } else if (this.props.id === "Un Answered") {
            questions = unAnsweredQuestions
        }

        return (
            <div >
                <h3>{this.props.id}</h3>
                {questions.map(id =>

                    <li key={id}>
                        <QuestionSample id={id} />

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
