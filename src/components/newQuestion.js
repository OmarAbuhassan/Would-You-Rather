import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleSaveQuestion } from '../actions/Questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {

    state = {
        toHomePage: false,
        question1: '',
        question2: '',

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
            toHomePage: true,
        }))
    }

    render() {

        const { toHomePage, question1, question2 } = this.state

        if (toHomePage === true) {
            return <Redirect to='/' />
        }

        return (
            <div >
                <h3 className='center'>Create new Question</h3>
                <p>Complete the question</p>
                <p>Would you rather ... </p>
                <form>
                    <input 
                        type="text" 
                        className='textarea'
                        placeholder="Enter Option One Here "
                        onChange={this.handleChangeQuestion1}
                        value={question1}
                    />
                    <p>---------OR---------</p>
                    <input 
                        type="text" 
                        className='textarea'
                        placeholder="Enter Option Two Here "
                        onChange={this.handleChangeQuestion2}
                        value={question2}
                     />
                    <p></p>
                    <button
                        className='btn'
                        disabled={question1 === '' || question2 === ''}
                        onClick={(e) => this.handleSubmit(e)}
                    >
                        Submit
                    </button>
                </form>
            </div >
        )
    }
}

export default connect()(NewQuestion)
