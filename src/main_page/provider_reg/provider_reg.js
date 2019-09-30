import React from 'react'
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import TextField from "@material-ui/core/es/TextField/TextField";
import MaskedTextField from "../additional_components/text_field_mask";
import Button from "@material-ui/core/es/Button/Button";
import * as PropTypes from "prop-types";
import Slide from "@material-ui/core/es/Slide/Slide";
import FormJsonizer from 'form-jsonizer';

class ProviderRegDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password_repeat_true: true,
            reg_success: true,
            response: ""
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.EnterProvider = this.EnterProvider.bind(this);
        this.onEnterButtonClick = this.onEnterButtonClick.bind(this);
    }

    Transition(props) {
        return <Slide direction={"up"} {...props}/>
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps === this.props) return;
        if(!this.props.open) {
            this.setState({reg_success: false, response: ""});
        }
    }

    onFormSubmit(event) {
        event.preventDefault();
        let form = event.target;
        const jsonizer = new FormJsonizer();
        const data = JSON.parse(jsonizer.serialize(form));
        if (data.password_again !== data.password) {
            this.setState({password_repeat_true: false});
            return false;
        }
        if (data.telephone !== "") {
            data.telephone = "7" + data.telephone.match(/\d/ig).join("");
        }
        delete data.password_again;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/reg_provider");
        xhr.send(JSON.stringify(data));
        xhr.onload = () => {
            this.setState({
                reg_success: xhr.status === 200,
                response: xhr.responseText,
            });
        }
    }

    EnterProvider(event) {
        event.preventDefault();
        let form = event.target;
        const jsonizer = new FormJsonizer();
        const data = JSON.parse(jsonizer.serialize(form));
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/provider_log_in");
        xhr.send(JSON.stringify(data));
        xhr.onload = () => {
            document.write(xhr.responseText);
        }
    }

    onEnterButtonClick() {
        this.setState({response: "Sucсess"});
    }

    render() {
        return (
            <Dialog open={this.props.open} fullScreen={true} className={"provider-reg"} onClose={this.props.onClose} TransitionComponent={this.Transition}>
                <DialogTitle className={"title"}>
                    <span className={"entrance-label"}>Вход в личный кабинет партнера</span>
                    <Button variant={"contained"} onClick={this.onEnterButtonClick}>ВОЙТИ</Button>
                </DialogTitle>
                <DialogContent className={"content"}>
                    <h2>Заполните небольшую форму регистрации и укажите информацию о себе</h2>
                        <div className={"container"}>
                            {
                            this.state.response ?
                                this.state.reg_success ?
                                    <div className={"response"}>
                                        <form action={"/provider_log_in"} method={"POST"}>
                                            <TextField
                                                variant={"outlined"}
                                                label={"Email"}
                                                name={"email"}
                                                fullWidth={true}
                                                className={"text-field"}
                                            />
                                            <TextField
                                                variant={"outlined"}
                                                label={"Пароль"}
                                                name={"password"}
                                                fullWidth={true}
                                                className={"text-field"}
                                                type={"password"}
                                            />
                                            <Button variant={"contained"} type={"submit"} color={"primary"}>Войти</Button>
                                        </form>
                                    </div>
                                    :
                                    <div className={"response"}>
                                        <p>{this.state.response}</p>
                                        <Button variant={"contained"} color={"primary"} onClick={this.props.onClose}>Закрыть</Button>
                                    </div>
                                :
                                <form onSubmit={this.onFormSubmit}>
                                    <TextField
                                        label={"Название организации"}
                                        placeholder={"Введите название вашей организации"}
                                        variant={"outlined"}
                                        name={"name"}
                                        className={"text-field"}
                                        fullWidth={true}
                                        autoFocus={true}
                                        required={true}
                                    />
                                    <MaskedTextField
                                        variant={"outlined"}
                                        label={"Контактный телефон"}
                                        placeholder={"+7(777) 777-77-77"}
                                        mask={['+', /\d/, '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                                        name={"telephone"}
                                        className={"text-field"}
                                        fullWidth={true}
                                        required={true}
                                    />
                                    <TextField
                                        label={"Почта"}
                                        variant={"outlined"}
                                        type={"email"}
                                        fullWidth={true}
                                        className={"text-field"}
                                        placeholder={"company@compony.ru"}
                                        name={"email"}
                                        required={true}
                                    />
                                    <TextField
                                        label={"Сайт"}
                                        variant={"outlined"}
                                        type={"url"}
                                        fullWidth={true}
                                        className={"text-field"}
                                        name={"site"}
                                        required={true}
                                    />
                                    <TextField
                                        multiline={true}
                                        rows={10}
                                        label={"Информация о вас"}
                                        fullWidth={true}
                                        className={"text-field"}
                                        required={true}
                                        variant={"outlined"}
                                        name={"about_provider"}
                                        placeholder={"Расскажите чем занимаетесь"}
                                    />
                                    <TextField
                                        label={"Пароль для входа в личный кабинет"}
                                        variant={"outlined"}
                                        type={"password"}
                                        fullWidth={true}
                                        className={"text-field"}
                                        required={true}
                                        name={"password"}
                                    />
                                    <TextField
                                        label={"Повторите пароль"}
                                        variant={"outlined"}
                                        type={"password"}
                                        fullWidth={true}
                                        className={"text-field"}
                                        required={true}
                                        name={"password_again"}
                                        error={!this.state.password_repeat_true}
                                    />
                                    <Button variant={"contained"} color={"primary"} type={"submit"}>Регистрация</Button>
                                    <Button variant={"contained"} color={"primary"} onClick={this.props.onClose}>Отмена</Button>
                                </form>
                            }
                        </div>
                </DialogContent>
            </Dialog>
        )
    }
}

ProviderRegDialog.propTypes = {
    metro_stations: PropTypes.array.isRequired
};

export default ProviderRegDialog;