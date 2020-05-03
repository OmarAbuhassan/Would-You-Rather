import React,{Component} from 'react';
import { connect } from 'react-redux'


class Leader extends Component {

    render() {
        return (
            <div >
                <ul>
                    {this.props.leaderBoardData.map(user =>

                        <li key={user.id}>
                            <div >
                                <p>{user.name}</p>
                                <img
                                    src={user.avatar}
                                    alt={`Avatar of ${user.name}`}
                                    className="avatar" />
                                <p>Answered questions   {user.numOfAnswered}</p>
                                <p>Created questions {user.numOfQuestions}</p>
                                <p>Score {user.score}</p>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

function mapStateToProps({ users }) {
    const leaderBoardData = Object.values(users)
        .map(user => ({
            name: user.name,
            id: user.id,
            avatar: user.avatarURL,
            numOfQuestions: user.questions.length,
            numOfAnswered: Object.keys(user.answers).length,
            score: Object.keys(user.answers).length + user.questions.length
        }))
        .sort((a, b) => a.score - b.score)
        .reverse()
    return {
        leaderBoardData

    }
}

export default connect(mapStateToProps)(Leader);
