import React from 'react'
import TextField from "@material-ui/core/es/TextField/TextField";
import * as PropTypes from "prop-types";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import Button from "@material-ui/core/es/Button/Button";
import FormJsonizer from 'form-jsonizer'

class FormSignIn extends React.Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = {
            error_message: ""
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props === prevProps) return;
        if(!this.props.open) {
            setTimeout(() => {this.setState({error_message: ""})}, 100);
        }
    }

    onFormSubmit(event) {
        event.preventDefault();
        const jsonizer = new FormJsonizer();
        let form = event.target;
        const data = jsonizer.serialize(form);
        let request = new XMLHttpRequest();
        let user_info = {};
        request.open("POST", "/sign_in");
        request.send(data);
        request.onload = () => {
            if (request.status === 200) {
                let resp = JSON.parse(request.responseText);
                user_info.name = resp.name || "";
                user_info.third_name = resp.third_name || "";
                this.props.CloseSignInDialog();
                this.props.SignIn(user_info);
            } else {
                this.setState({error_message: request.responseText});
            }
        };
    };

    render() {
        return (
            <Dialog className={"reg-dialog"} maxWidth={"xs"} open={this.props.open} onClose={this.props.CloseSignInDialog}>
                <DialogTitle className={"title"}><span>Вход</span></DialogTitle>
                <DialogContent>
                    {
                        this.state.error_message ?
                            <div className={"response"}>
                                <p>{this.state.error_message}</p>
                                <Button color={"primary"} className={"button"} variant={"contained"} onClick={this.props.CloseSignInDialog}>Закрыть</Button>
                            </div>
                            :
                            <form onSubmit={this.onFormSubmit}>
                                <TextField
                                    autoFocus={true}
                                    variant={"outlined"}
                                    label={"Почта"}
                                    placeholder={"user@user.com"}
                                    className={"input-reg"}
                                    name={"email"}
                                    required={true}
                                    type={"email"}
                                />
                                <TextField
                                    type={"password"}
                                    variant={"outlined"}
                                    label={"Пароль"}
                                    className={"input-reg"}
                                    name={"password"}
                                    required={true}
                                />
                                <Button className={"button"} color={"primary"} variant={"contained"} type={"submit"}>Войти</Button>
                            </form>
                    }
                </DialogContent>
            </Dialog>
        );
    }
}

FormSignIn.propTypes = {
    CloseSignInDialog: PropTypes.func.isRequired,
    SignIn: PropTypes.func.isRequired,
    ...Dialog.propTypes
};

export default FormSignIn;