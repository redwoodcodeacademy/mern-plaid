import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../actions/authActions";
import classnames from 'classnames';
import { CLEAR_ERRORS } from "../../actions/types";

const Login = (props) => {
    // Initial state
    const initialState = {
        email: "",
        password: ""
    }

    const dispatch = useDispatch();
    
    const [state, setState] = useState(initialState);

    const auth = useSelector(state => state.auth);
    const errors = useSelector(state => state.errors);

    useEffect(() => {
        if (auth.isAuthenticated) {
            props.history.push('/dashboard');
        }
        dispatch({ type: CLEAR_ERRORS});
    },[auth.isAuthenticated, props.history]);

    // onChange
    const onChange = e => {
        setState({...state, [e.target.id]: e.target.value});
    }

    // onSubmit
    const onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: state.email,
            password: state.password
        }
        dispatch(loginUser(userData));
    }

    return (
        <div className="container">
            <div style={{ marginTop: "4rem" }} className="row">
                <div className="col s8 offset-s2">
                    <Link to="/" className="btn-flat waves-effect">
                        <i className="material-icons left">keyboard_backspace</i> Back to home
                    </Link>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <h4>
                            <b>Login</b> below
                        </h4>
                        <p className="grey-text text-darken-1">
                            Don't have an account? <Link to="/register">Register</Link>
                        </p>
                    </div>
                    <form noValidate onSubmit={onSubmit}>
                        <div className="input-field col s12">
                            <input
                                onChange={onChange}
                                value={state.email}
                                error={errors.email}
                                id="email"
                                type="email"
                                className={classnames("", {
                                    invalid: errors.email || errors.emailnotfound
                                })}
                            />
                            <label htmlFor="email">Email</label>
                            <span className="red-text">
                                {errors.email}
                                {errors.emailnotfound}
                            </span>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={onChange}
                                value={state.password}
                                error={errors.password}
                                id="password"
                                type="password"
                                className={classnames("", {
                                    invalid: errors.password || errors.passwordincorrect
                                })}
                            />
                            <label htmlFor="password">Password</label>
                            <span className="red-text">
                                {errors.password}
                                {errors.passwordincorrect}
                            </span>
                        </div>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;