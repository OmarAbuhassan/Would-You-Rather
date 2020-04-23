import React from 'react';
import { connect } from 'react-redux'
import { handleSaveQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'



class NewQuestion extends React.Component {

    state = {
        question1: '',
        question2: '',
        toHome: false,
    }

    handleChangeQuestion1 = (e) => {
        const question1 = e.target.value

        this.setState(() => ({
            question1
        }))
    }
    handleChangeQuestion2 = (e) => {
        const question2 = e.target.value

        this.setState(() => ({
            question2
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { question1, question2 } = this.state
        const { dispatch } = this.props

        dispatch(handleSaveQuestion(question1, question2))



        this.setState(() => ({
            question1: '',
            question2: '',
            toHome: true,
        }))
    }


    render() {

        const { question1, question2, toHome } = this.state

        if (toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <div >

                <h3 className='center'>Create new Question</h3>
                <p>  Complete the question </p>
                <p>Would you rather ... </p>
                <form>
                    <input type="text" placeholder="Enter Option One Here "
                        value={question1}
                        onChange={this.handleChangeQuestion1}
                        className='textarea' />
                    <p>---------OR---------</p>
                    <input type="text" placeholder="Enter Option Two Here "
                        value={question2}
                        onChange={this.handleChangeQuestion2}
                        className='textarea' />
                    <button
                        className='btn'
                        disabled={question1 === '' || question2 === ''}
                        onClick={(e) => this.handleSubmit(e)}>
                        Submit
          </button>

                </form>

            </div >
        );

    }
}



export default connect()(NewQuestion)
