import React from 'react';
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helper'


class Question extends React.Component {

    render() {
        const { question } = this.props
        if (question === null) {
            return <p>This Question doesn't exist</p>
        }

        const {
            name, avatar, optionOneText, optionTwoText,hasAnswered
        } = question

        console.log("the Question ", this.props)
        return (
            <div >
                <h3>{this.props.autherdUser}</h3>
                <p>Author: {name} </p>
                <p>Avatar: {avatar}</p>
                <p>Option 1: {optionOneText}</p>
                <p>Option 2: {optionTwoText}</p>
                <p>hasAnswered {hasAnswered}</p>
            </div>
        );
    }
}

function mapStateToProps({ autherdUser, users, questions }, { id }) {

    const question = questions[id]

    return {
        autherdUser,
        question: question ? formatQuestion(question, users[question.author], autherdUser)
            : null,
    }
}

export default connect(mapStateToProps)(Question);
