import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from "../Common/FormsControls/FormsControls";
/*import {maxLengthCreator, required} from "../../utils/validators/validators";*/
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import createField from "./../Common/FormsControls/FormsControls";
import {createNewUser} from "../../redux/reducers/auth-reducer";
import style from ".././Header/LoginUser/SignIn/SignIn.module.css";
import {RedButton} from "../Common/MaterialsButtons";

/*const maxLength = maxLengthCreator(30);*/

const RegistrationForm = ({handleSubmit, error}) => {
    return(
        <form onSubmit={handleSubmit}>
            <div><Field component={Input} name={"email"} placeholder={"Email *"} autoFocus={true} fieldName={"Email"}/></div>
            <div><Field component={Input} name={"password"} placeholder={"Пароль *"} type={"password"} fieldName={"Пароль"}/></div>
            <div><Field component={Input} name={"name"} placeholder={"Имя *"} fieldName={"Имя"}/></div>
            <RedButton text={"Регистрация"} label="Submit" onSubmit={handleSubmit} />

            {/*<div>
                <button>Зарегистрироваться</button>
            </div>*/}
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
            <h1 className={style.label}>Регистрация</h1>
            <RegistrationReduxForm onSubmit={onSubmit} />
        </div>
    );
};
/*const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});*/

export default connect(null, {createNewUser})(Registration);