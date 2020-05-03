import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/AuthedUser';

export class Login extends Component {
    
    state = {
        loading: false
    }

    handleLoading = () => {
        this.setState({ loading: true });
    }

    render() {
        return (
            <div>
                <LoginHeader />
                <LoginGridLayout
                    form={<ConnectedLoginForm onLoading={this.handleLoading} />}
                    loading={this.state.loading}
                />
            </div>
        );
    }
}

const LoginHeader = () => (
    <div>
        <h2 >Would You Rather ???</h2>
        <h4 >Please sign in to continue</h4>
    </div>
);

const LoginGridLayout = ({ form, loading }) => (
    <div>
        {loading === true}
        {form}
    </div>
);

class LoginForm extends Component {
    static propTypes = {
        onLoading: PropTypes.func.isRequired
    };
    state = {
        value: 'none'
    };

    handleSubmit = e => {
        e.preventDefault();
        const { onLoading, setAuthedUser } = this.props;
        const authUser = this.state.value;

        new Promise((res, rej) => {
            onLoading();
            setTimeout(() => res(), 500);
        }).then(() => setAuthedUser(authUser));
    };

    onChange = (e) => {
        this.setState(() => ({
            value: e
        }))
    };

    render() {
        const { users } = this.props;
        const { value } = this.state;
        const disabled = value !== 'none' ? false : true;


        return (
            <div>
                <h2 color="green">Sign In</h2>

                <form>
                    <select value={this.state.value} onChange={(e) => this.onChange(e.target.value)}>
                        <option value="none" disabled>Select a user</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </form>

                <button className="btn" onClick={(e) => this.handleSubmit(e)} disabled={disabled}>
                    Submit
                </button>
            </div>
        );
    }
}

const ConnectedLoginForm = connect(
    mapStateToProps,
    { setAuthedUser }
)(LoginForm);

function mapStateToProps({ users }) {
    return {
        users: Object.values(users)
    };
}

export default Login;
