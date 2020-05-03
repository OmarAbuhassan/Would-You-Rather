import React,{Component} from 'react';
import List from './questionsList'


class Home extends Component {

    state = {
        showAnswered: false
    }

    onAnswerChanged = (boolean) => {

        this.setState({
            showAnswered: boolean
        });
    }

    render() {
        return (
            <div >
                <button onClick={(True) => this.onAnswerChanged(!True)}>Un Answered</button>
                <button onClick={(True) => this.onAnswerChanged(True)}>Answered</button>
                
                {this.state.showAnswered ?
                    <List id="Answered Questions" /> 
                    :<List id="Un Answered Questions" />
                }
            </div>
        );
    }
}

export default Home;
