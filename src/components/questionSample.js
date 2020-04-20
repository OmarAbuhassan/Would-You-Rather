import React from 'react';
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helper'
import Question from './question'


class QuestionSample extends React.Component {


    toPull = (e,id)=>{
        e.preventDefault()

        // todo***********
    }

    render() {
        const { question,id } = this.props
        if (question === null) {
            return <p>This Question doesn't exist</p>
        }

        const {
            name, avatar, optionOneText, optionTwoText,
        } = question



        


        return (
            <div className="question">

                <p>{name} asks: </p>
                <img
                    src={avatar}
                    alt ={`Avatar of ${name}`}
                    className="avatar"/>
                <h4>Would you Rather ...</h4>
                <p>...{optionOneText}...</p>
                <button className="btn" onClick={(e)=>this.toPull(e, id)}/>
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

export default connect(mapStateToProps)(QuestionSample);
