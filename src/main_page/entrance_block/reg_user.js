import React from 'react'
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/es/Button/Button";
import MaskedTextField from "../additional_components/text_field_mask";
import FormJsonizer from 'form-jsonizer';
import * as PropTypes from "prop-types";

class FormReg extends React.Component {
    constructor(props) {
        super(props);
        this.RegUser = this.RegUser.bind(this);
        this.state = {
            password_repeat_true: true,
            response_message: ""
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props === prevProps) return;
        if(!this.props.open) {
            setTimeout(() => {this.setState({response_message: ""});}, 100);
        }
    }

    RegUser(event) {
        event.preventDefault();
        const jsonizer = new FormJsonizer();
        let form = event.target;
        const data = JSON.parse(jsonizer.serialize(form));
        if(data.password_again !== data.password) {
            this.setState({password_repeat_true: false});
            return false;
        }
        if(data.phone_number !== "") {
            data.phone_number = data.phone_number.match(/\d/ig).join("");
        }
        delete data.password_again;
        let request = new XMLHttpRequest();
        request.open("POST", "/sign_up");
        request.send(JSON.stringify(data));
        request.onload = () => {
            this.setState({response_message: request.responseText});
        }
    }

    render() {
        return (
            <Dialog open={this.props.open} className={"reg-dialog"} maxWidth={"xs"} onClose={this.props.CloseRegDialog}>
                <DialogTitle className={"title"}><span>Регистрация</span></DialogTitle>
                 <DialogContent>
                     {
                         this.state.response_message ?
                             <div className={"response"}>
                                 <p>{this.state.response_message}</p>
                                 <Button color={"primary"} className={"button"} variant={"contained"} onClick={this.props.CloseRegDialog}>Закрыть</Button>
                             </div>
                             :
                             <form onSubmit={this.RegUser}>
                                 <TextField
                                     autoFocus={true}
                                     variant={"outlined"}
                                     label={"Фамилия"}
                                     className={"input-reg"}
                                     name={"surname"}
                                 />
                                 <TextField
                                     variant={"outlined"}
                                     label={"Имя"}
                                     className={"input-reg"}
                                     name={"name"}
                                     required={true}
                                 />
                                 <TextField
                                     variant={"outlined"}
                                     label={"Отчество"}
                                     className={"input-reg"}
                                     name={"3rd_name"}
                                 />
                                 <MaskedTextField
                                     variant={"outlined"}
                                     label={"Телефон"}
                                     className={"input-reg"}
                                     placeholder={"(777) 777-77-77"}
                                     mask={['+', /\d/, '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                                     name={"phone_number"}
                                     required={true}
                                 />
                                 <TextField
                                     variant={"outlined"}
                                     label={"Email"}
                                     className={"input-reg"}
                                     required={true}
                                     InputProps={{
                                         type: "email",
                                     }}
                                     name={"email"}
                                 />
                                 <TextField
                                     variant={"outlined"}
                                     type={"password"}
                                     label={"Пароль"}
                                     className={"input-reg"}
                                     required={true}
                                     name={"password"}
                                 />
                                 <TextField
                                     variant={"outlined"}
                                     type={"password"}
                                     label={"Повторите пароль"}
                                     className={"input-reg"}
                                     required={true}
                                     name={"password_again"}
                                     error={!this.state.password_repeat_true}
                                 />
                                 <Button className={"button"} variant={"contained"} color={"primary"}
                                         type={"submit"}>Зарегестрироваться</Button>
                             </form>
                     }
                </DialogContent>
            </Dialog>
        )
    }
}

FormReg.propTypes = {
    CloseRegDialog: PropTypes.func.isRequired,
    ...Dialog.propTypes
};

export default FormReg;