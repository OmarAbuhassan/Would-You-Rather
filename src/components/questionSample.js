import React, { Component } from 'react';
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helper'
import { withRouter } from 'react-router-dom'

class QuestionSample extends Component {

    state = {
        toQuestion: false
    }

    toPull = (e, id) => {
        e.preventDefault()
        this.props.history.push(`/questions/${id}`)
        this.setState(() => ({
            toQuestion: !this.props.toQuestion
        }))
    }

    render() {
        const { question, id } = this.props
        const { name, avatar, optionOneText } = question

        if (question === null) {
            return <p>This Question doesn't exist</p>
        }

        return (
            <div className="question">
                <p>{name} asks: </p>
                <img
                    className="avatar"
                    src={avatar}
                    alt={`avatar of ${name}`}
                />
                <h4>Would you Rather ...</h4>
                <p>...{optionOneText}...</p>
                <button className="btn" onClick={(e) => this.toPull(e, id)}>View Question</button>
            </div >
        );
    }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
    const question = questions[id]
    return {
        authedUser,
        question: question ? formatQuestion(question, users[question.author], authedUser)
            : null,
    }
}

export default withRouter(connect(mapStateToProps)(QuestionSample));
