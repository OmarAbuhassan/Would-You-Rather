import React, { Component } from 'react';
import QuestionSample from './questionSample'
import { connect } from 'react-redux'

class List extends Component {
    render() {
        const { answeredQuestions, unAnsweredQuestions } = this.props;
        let questions = [];

        if (this.props.id === "Answered Questions") {
            questions = answeredQuestions
        }
        else if (this.props.id === "Un Answered Questions") {
            questions = unAnsweredQuestions
        }

        return (
            <div>
                <h3>{this.props.id}</h3>
                {questions.map(id =>
                    <li key={id}>
                        <QuestionSample id={id} />
                    </li>
                )}
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }) {
    return {
        authedUser,
        users,
        unAnsweredQuestions: Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp).filter(a => !(questions[a].optionOne.votes.includes(authedUser)) &&
            !(questions[a].optionTwo.votes.includes(authedUser))),
        answeredQuestions: Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp).filter(a => questions[a].optionOne.votes.includes(authedUser) ||
            questions[a].optionTwo.votes.includes(authedUser)),
    }
}

export default connect(mapStateToProps)(List);
