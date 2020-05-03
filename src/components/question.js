import React,{Component} from 'react';
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helper'
import { handleSaveAnswer } from '../actions/Shared'
import { withRouter } from 'react-router-dom'


class Question extends Component {

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
         dispatch(handleSaveAnswer({
            authedUser,
            qid: question.id,
            answer: this.state.answer
        }))
    }

    render() {
        
        const { question } = this.props

        if (question === null || question === undefined) {
            return this.props.history.push('/questions/bad_id');
        }

        const {
            name, avatar, optionOneText, optionTwoText, hasAnswered, votOp1, votOp2, id,
        } = question

        const totalVotes = votOp1 + votOp2
        const percentQ1 = ((votOp1 / totalVotes) * 100).toFixed(2)
        const percentQ2 = ((votOp2 / totalVotes) * 100).toFixed(2)

        const YourVoteLabel = () => (
            <div style={{ float: 'inherit' ,color:"green" }} font="green" >
                Your
                <br/>
                Vote
            </div>
        );

        const userVote = this.props.user.answers[id];

        if (hasAnswered === true) {
            return (
                <div>
                    <p>{name} asks:</p>
                    <img
                        src={avatar}
                        alt={`Avatar of ${name}`}
                        className="avatar" />
                    <div>
                        <div>
                            {userVote === 'optionOne' && <YourVoteLabel />}
                            <p>Would you rather {optionOneText} </p>
                            <p>{votOp1} out of {totalVotes} </p>
                            <p>{percentQ1}%</p>
                        </div>
                        <p>-----------------------------------------</p>
                        <div>
                            {userVote === 'optionTwo' && <YourVoteLabel />}
                            <p>Would you rather {optionTwoText} </p>
                            <p>{votOp2} out of {totalVotes} </p>
                            <p>{percentQ2}%</p>
                        </div>
                    </div>
                </div>
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
                            <p></p>
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
    const user = users[authedUser]
    const question = questions[id]
    return {
        authedUser,
        user,
        question: question ?
        formatQuestion(question, users[question.author], authedUser)
        : null,
    }
}

export default withRouter(connect(mapStateToProps)(Question));
