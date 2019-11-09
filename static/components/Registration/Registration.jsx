import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from "../Common/FormsControls/FormsControls";
/*import {maxLengthCreator, required} from "../../utils/validators/validators";*/
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormsControls.module.css"
import createField from "./../Common/FormsControls/FormsControls";
import {createNewUser} from "../../redux/reducers/auth-reducer";

/*const maxLength = maxLengthCreator(30);*/

const RegistrationForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div><Field component={"input"} name={"email"} placeholder={"Email"} /></div>
            <div><Field component={"input"} name={"password"} placeholder={"Password"} type={"password"} /></div>
            <div><Field component={"input"} name={"name"} placeholder={"Name"} /></div>
            <div>
                <button>Зарегистрироваться</button>
            </div>
        </form>
    );
};

const RegistrationReduxForm = reduxForm({ form: 'registration' })(RegistrationForm);

const Registration = (props) => {

    const onSubmit = (formData) => {
        props.createNewUser(formData.email, formData.password, formData.name);
    };

    return(
        <div>
            <h1>Регистрация</h1>
            <RegistrationReduxForm onSubmit={onSubmit} />
        </div>
    );
};
/*const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});*/

export default connect(null, {createNewUser})(Registration);