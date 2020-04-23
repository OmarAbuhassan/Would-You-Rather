import React from 'react';
import { connect } from 'react-redux'


class Leader extends React.Component {


    render() {


        return (
            <div >
                <ul>
                    {this.props.leaderboardData.map(user =>

                        <li key={user.id}>
                            <div >
                                <p>{user.name}</p>
                                <img
                                    src={user.avatar}
                                    alt={`Avatar of ${user.name}`}
                                    className="avatar" />
                                <p>Answered questions   {user.numOfAnswers}</p>
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

    const leaderboardData = Object.values(users)
        .map(user => ({
            id: user.id,
            name: user.name,
            avatar: user.avatarURL,
            numOfAnswers: Object.keys(user.answers).length,
            numOfQuestions: user.questions.length,
            score: Object.keys(user.answers).length + user.questions.length
        }))
        .sort((a, b) => a.score - b.score)
        .reverse()

    return {

        leaderboardData

    }
}

export default connect(mapStateToProps)(Leader);
