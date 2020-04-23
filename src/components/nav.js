import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'


class Nav extends Component {
    handleLogout = e => {
        e.preventDefault();
        this.props.setAuthedUser(null);
    };

    render() {
        const { authedUser, users } = this.props;
         return (
            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink to='/' exact activeClassName='active'>
                            Home
                    </NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' activeClassName='active'>
                            New Question
                     </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' activeClassName='active'>
                            Leader Board
                    </NavLink>
                    </li >
                    <div style={{ float: 'right' }}>
                        <span>
                            <img
                                src={users[authedUser].avatarURL}
                                alt={`Avatar of ${users[authedUser].name}`}
                                className="avatar" />

                            {users[authedUser].name}
                        </span>


                        <button
                            className="btn:focus"
                            onClick={(e) => this.handleLogout(e)}
                        >
                            Logout
                            </button>
                    </div>
                </ul>

            </nav>
        )
    }

}


function mapStateToProps({ users, authedUser }) {
 
    return {
        authedUser,
        users
    }
}

export default connect(mapStateToProps, { setAuthedUser })(Nav)

