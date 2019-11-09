/*
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import {connect} from "react-redux";
import {login} from "../../../redux/reducers/auth-reducer";

const renderTextField = ({ input, label, meta: { error }, ...custom }) => (
    <TextField hintText={label}
               floatingLabelText={label}
               errorText={error}
               {...input}
               {...custom}
    />
);

const MaterialUiForm = props => {
    const { handleSubmit } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name="email" component={renderTextField} label="Email"/>
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
};

const LoginReduxForm = reduxForm({ form: 'login' })(MaterialUiForm);

const Login = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password);
    };

    return(
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    );
};

export default connect(null, {login})(Login);

/!*export default reduxForm({
    form: 'MaterialUiForm'  // a unique identifier for this form
})(MaterialUiForm)*!/

*/
