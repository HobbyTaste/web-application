import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from "../Common/FormsControls/FormsControls";
/*import {maxLengthCreator, required} from "../../utils/validators/validators";*/
/*import {login} from "../../redux/auth-reducer";*/
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormsControls.module.css"

/*const maxLength = maxLengthCreator(30);*/

const LoginForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div><Field component={"input"} name={"email"} placeholder={"Email"} /></div>
            <div><Field component={"input"} name={"password"} placeholder={"Password"} type={"password"} /></div>
            <div><Field component={"input"} name={"rememberMe"} type={"checkbox"} />remember me</div>
{/*            <div>
                {props.error && <div className={style.formSummaryError}>
                    {props.error}
                </div>}
            </div>*/}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {

    const onSubmit = (formData) => {
        /*props.login(formData.email, formData.password, formData.rememberMe);*/
    };

    /*if(props.isAuth) {
        return <Redirect to={"/profile"} />
    }*/

    return(
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    );
};
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, null)(Login);