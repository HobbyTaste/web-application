import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from "../Common/FormsControls/FormsControls";
import {connect} from "react-redux";
import {login} from "../../redux/reducers/auth-reducer";
import {CommonButton} from "../Common/CommonButton";


const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div><Field component={Input} name={"email"} placeholder={"Email *"} autoFocus={true}/></div>
            <div><Field component={Input} name={"password"} placeholder={"Пароль *"} type={"password"} /></div>

                <CommonButton text={"ВОЙТИ"} label="Submit" onSubmit={handleSubmit}>ВОЙТИ</CommonButton>

        </form>
    );
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password);
    };

    /*if(props.isAuth) {
        return <Redirect to={"/profile"} />
    }*/

    return(
        <div>
            <h1>Вход</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    );
};
/* const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuth
 });*/

export default connect(null, {login})(Login);