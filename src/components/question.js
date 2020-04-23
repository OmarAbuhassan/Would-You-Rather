import React from 'react';
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helper'
import { handleSaveAnswer } from '../actions/shared'
import { withRouter } from 'react-router-dom'


class Question extends React.Component {

    state = {
        answer: ''
    }
    onAnswerChanged = (e) => {

        this.setState({
            answer: e
        });
    }

    handleAnswer = (e) => {
        e.preventDefault()
        const { dispatch, question, authedUser } = this.props
        console.log("im answering")
        dispatch(handleSaveAnswer({
            authedUser,
            qid: question.id,
            answer: this.state.answer
        }))
    }


    render() {
        const { question } = this.props

        if (question === null) {
            return <p>This Question doesn't exist</p>
        }

        const {
            name, avatar, optionOneText, optionTwoText, hasAnswered, votOp1, votOp2,id,
        } = question

        const totalVotes = votOp1 + votOp2
        const percentQ1 = ((votOp1 / totalVotes) * 100).toFixed(2)
        const percentQ2 = ((votOp2 / totalVotes) * 100).toFixed(2)

        const YourVoteLabel = () => (
            // <Label color="orange" ribbon="right" className="vote">
            //   <Icon name="check circle outline" size="big" className="compact" />
              <div style={{ float: 'right' }}>
                Your
                <br />
                Vote
              </div>
            // </Label>
          );
          console.log(this.props.user)
          const userVote = this.props.user.answers[id];

        if (hasAnswered === true) {
            return (
                <div>
                    <p>{name} asks: </p>
                    <img
                        src={avatar}
                        alt={`Avatar of ${name}`}
                        className="avatar" />
                    <div>
                    {userVote === 'optionOne' && <YourVoteLabel />}
                        <div>
                            <p>Would you rather {optionOneText} </p>
                            <p>{votOp1} out of {totalVotes} </p>
                            <p>{percentQ1}%</p>
                        </div>
                        {userVote === 'optionTwo' && <YourVoteLabel />}
                        <p>Would you rather {optionTwoText} </p>
                        <p>{votOp2} out of {totalVotes} </p>
                        <p>{percentQ2}%</p>
                    </div>
                </div >
            )

        } else if (hasAnswered === false) {

            return (
                <div >

                    <p>{name} asks: </p>
                    <img
                        src={avatar}
                        alt={`Avatar of ${name}`}
                        className="avatar" />
                    <h4>Would you Rather ...</h4>

                    <div>
                        <form id="answer">
                            <input onChange={(event) => this.onAnswerChanged(event.target.value)}
                                type="radio" name="question" value="optionOne" />
                            <label htmlFor={optionOneText}> {optionOneText}</label>
                            <input onChange={(event) => this.onAnswerChanged(event.target.value)}
                                type="radio" name="question" value="optionTwo" />
                            <label htmlFor={optionTwoText}> {optionTwoText}</label>

                            <button
                                className="btn"
                                onClick={(e) => this.handleAnswer(e)}
                                disabled={this.state.answer === ""}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            );
        }
    }
}

function mapStateToProps({ authedUser, users, questions }, props) {
    const { id } = props.match.params
    const question = questions[id]
    const user = users[authedUser]
    return {
        user,
        authedUser,
        question: question ? formatQuestion(question, users[question.author], authedUser)
            : null,
    }
}

export default withRouter(connect(mapStateToProps)(Question));
