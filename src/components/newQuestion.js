import React from 'react';
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helper'


class NewQuestion extends React.Component {


     
    render() {
        const { question } = this.props
        if (question === null) {
            return <p>This Question doesn't exist</p>
        }

        const {
            name, avatar, optionOneText, optionTwoText,
        } = question


 
        


        return (
            <div >

                 <p>Ctreat New Question</p>

                 <P>Complete the question </P>
                <p>Would you rather ... </p>
                <form>
                    <input type="text" placeholder="Enter Option One Here " />
                    <p>---------OR---------</p>
                    <input type="text" placeholder="Enter Option Two Here "/>
                    <input type="submit" value="Submit"></input>

                </form>

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

export default connect(mapStateToProps)(NewQuestion);
