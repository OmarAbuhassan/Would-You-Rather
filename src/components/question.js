import React from 'react';
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helper'
import { handleSaveAnswer } from '../actions/questions'


class Question extends React.Component {

    state = {
        answer: ''
    }
    onAnswerChanged = (e) => {

        this.setState({
            answer: e
        });
        console.log("asdfasd", this.state.answer)
    }

    handleAnswer = (e) => {
        e.preventDefault()
        const { dispatch, question, authedUser } = this.props


        console.log("asdfasdfasdfasdf", this.state.answer)

        dispatch(handleSaveAnswer({
             authedUser,
              id: question.id,
               answer: this.state.answer 
            }))


    }

    render() {
        const { question } = this.props
        if (question === null) {
            return <p>This Question doesn't exist</p>
        }

        const {
            name, avatar, optionOneText, optionTwoText, hasAnswered, votOp1, votOp2,
        } = question

        const totalVotes = votOp1 + votOp2


        if (hasAnswered === true) {
            return (
                <div>
                    <p>{name} asks: </p>
                    <p>Avatar: {avatar}</p>
                    <div>
                        <div>
                            <p>Would you rather {optionOneText} </p>
                            <p>{votOp1} out of {totalVotes} </p>
                        </div>

                        <p>Would you rather {optionTwoText} </p>
                        <p>{votOp2} out of {totalVotes} </p>

                    </div>

                </div>

            )

        } else if (hasAnswered === false) {

            return (
                <div >

                    <p>{name} asks: </p>
                    <p>Avatar: {avatar}</p>
                    <h4>Would you Rather ...</h4>


                    <div>
                        <form id="answer">
                            <input onChange={(event) => this.onAnswerChanged(event.target.value)}
                                type="radio" name="question" value="optionOne" />
                            <label htmlFor={optionOneText}> {optionOneText}</label>
                            <input onChange={(event) => this.onAnswerChanged(event.target.value)}
                                type="radio" name="question" value="optionTwo" />
                            <label htmlFor={optionTwoText}> {optionTwoText}</label>
                            <button type="submit"  
                            className="btn" onClick={(e) => this.handleAnswer(e)}
                            disabled ={this.state.answer===""}
                            >Submit</button>
                        </form>
                    </div>
                </div>
            );
        }
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

export default connect(mapStateToProps)(Question);
