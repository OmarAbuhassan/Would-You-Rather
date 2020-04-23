import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

export class Login extends Component {
    state = {
        loading: false
    };
    handleLoading = () => {
        this.setState({ loading: true });
    };

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
        <h3 >Welcome to the Would You Rather App!</h3>
        <h4 >   Please sign in to continue </h4>
    </div>
);

const LoginGridLayout = ({ image, form, loading }) => (
    <div>

        {loading === true}
        {image}
        <br />
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


    onChange = (value) => {
        this.setState(() => ({
            value
        })
        )
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

    render() {
        const { value } = this.state;
        const disabled = value !== 'none' ? false : true;
        const { users } = this.props;

        return (
            <div>
                <h2 color="green">
                    Sign In
                </h2>

                <form>
                    <select value={this.state.value} onChange={(e) => this.onChange(e.target.value)}>
                        <option value="none" disabled>Select a user</option>
                        {

                            users.map(user => (
                                <option
                                    key={user.id}
                                    value={user.id}
                                >
                                    {user.name}
                                </option>
                            ))
                        }

                    </select>
                </form>
                <button
                    className="btn"
                    onClick={(e) => this.handleSubmit(e)}
                    disabled={disabled}>
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
