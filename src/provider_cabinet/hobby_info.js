import React from 'react';
import * as PropTypes from "prop-types";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import './hobby_info_styles.css'
import DialogContent from "@material-ui/core/es/DialogContent";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Button from "@material-ui/core/es/Button/Button";
import TextField from "@material-ui/core/es/TextField/TextField";
import StarRate from "@material-ui/icons/StarRate"

function getPhones(array) {
    if(typeof array == "string") return "+" + array;
    return array.map(item => "+" + item).map(item => <a href={"tel: " + item}>{item};  </a>);
}

class HobbyInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            show_feedback_field: false,
            show_question_field: false,
            current_feedback: "",
            feedback: this.props.hobby_info.feedback,
            user_info: {},
            show_error: false,
            current_message: "",
            user_rate: 0
        };

        this.CloseDialog = this.CloseDialog.bind(this);
        this.OpenDialog = this.OpenDialog.bind(this);
        this.SendFeedback = this.SendFeedback.bind(this);
        this.onWriteFeedback = this.onWriteFeedback.bind(this);
        this.onFeedBackFieldChange = this.onFeedBackFieldChange.bind(this);
        this.onAskQuestion = this.onAskQuestion.bind(this);
        this.SendMessage = this.SendMessage.bind(this);
        this.onQuestionFieldChange = this.onQuestionFieldChange.bind(this);
        this.ChangeRate = this.ChangeRate.bind(this);
    }

    OpenDialog() {
        this.setState({open: true, show_error: false});
    }

    CloseDialog() {
        this.setState({open: false})
    };

    SendFeedback() {
        if(this.state.current_feedback.length === 0) return;
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/push_feedback");
        xhr.send(JSON.stringify({
            text: this.state.current_feedback,
            provider: this.props.hobby_info.email,
            hobby_name: this.props.hobby_info.name
        }));
        xhr.onload = () => {
            if(xhr.status === 200) {
                this.setState((prevState) => {
                    prevState.feedback.push({
                        from: prevState.user_info.name,
                        text: prevState.current_feedback
                    });
                    prevState.current_feedback = "";
                    prevState.show_feedback_field = false;
                });
            }
        }
    }

    SendMessage() {
        if(this.state.current_message.length === 0) return;
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/new_message");
        xhr.send(JSON.stringify({
            to: this.state.hobby_info.email,
            message: this.state.current_message
        }));
        this.setState((prevState) => {prevState.show_question_field = false;})
    }

    onWriteFeedback() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "/get_user_info");
        xhr.send();
        xhr.onload = () => {
            if(xhr.status === 200) {
                this.setState((prevState) => {
                    prevState.user_info = JSON.parse(xhr);
                    prevState.show_feedback_field = true;
                });
            } else {
                this.setState({show_error: true});
            }
        }
    }

    onAskQuestion() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "/get_user_info");
        xhr.send();
        xhr.onload = () => {
            if(xhr.status === 200) {
                this.setState((prevState) => {
                    prevState.user_info = JSON.parse(xhr);
                    prevState.show_question_field = true;
                });
            } else {
                this.setState({show_error: true});
            }
        }
    }

    onFeedBackFieldChange(event) {
        let {value} = event.target;
        if(value.length === 0) return false;
        if(value.slice(-1) === "\n") {
            this.SendFeedback();
            return false;
        }
        this.setState((prevState) => prevState.current_feedback = value);
    }

    onQuestionFieldChange(event) {
        let {value} = event.target;
        if(value.length === 0) return false;
        if(value.slice(-1) === "\n") {
            this.SendMessage();
            return false;
        }
        this.setState((prevState) => prevState.current_message = value);
    }

    ChangeRate(event) {
        let {target} = event;
        let gold_label = target.closest("#star-reviews").querySelector("label.gold");
        gold_label && gold_label.classList.remove("gold");
        target.parentElement.classList.add("gold");
    }

    render() {
        let {provider_mode} = this.props;    //if true => we're in provider cabinet else in user_cabinet
        return (
            <div className={"hobby-info-container"} >
                <div className={"buttons"}>
                    {provider_mode ?
                        <Button variant={"contained"}>Редактировать</Button> :
                        <Button variant={"contained"}>Оставить заявку</Button>
                    }
                    <Button variant={"contained"} onClick={this.OpenDialog}>Подробнее</Button>
                </div>
                <Dialog open={this.state.open} className={"hobby-info"} fullWidth={true} maxWidth={"md"} onClose={this.CloseDialog} fullScreen={screen.width <= 425}>
                    <DialogTitle className={"title"}>
                        <span>{this.props.hobby_info.name}</span>
                        <IconButton className={"icon-button"} onClick={this.CloseDialog}><CloseIcon/></IconButton>
                    </DialogTitle>
                    <DialogContent className={"content"}>
                        <h4>Краткая информация</h4>
                        <p>{this.props.hobby_info.additional_information}</p>
                        <hr/>
                        <h4>{this.props.hobby_info.provider}</h4>
                        <p>{this.props.hobby_info.about_provider}</p>
                        <hr/>
                        <h4>Контактные данные</h4>
                        <ul>
                            <li>{getPhones(this.props.hobby_info.phone)}</li>
                            <li><a href={"mailto: " + this.props.hobby_info.email}>{this.props.hobby_info.email}</a></li>
                            <li><a href={this.props.hobby_info.site}>Сайт</a></li>
                            <li>
                                Метро: {this.props.hobby_info.address.metro} <br/>
                                Адрес: {this.props.hobby_info.address.precise_address}
                            </li>
                        </ul>
                        { provider_mode ?
                            <Button variant={"contained"}>Редактировать</Button> :
                            <div>
                                <Button variant={"contained"} onClick={this.onWriteFeedback}>Оставить отзыв</Button>
                                <Button variant={"contained"} onClick={this.onAskQuestion}>Задать вопрос</Button>
                                <div id={"star-reviews"}>
                                        <label>
                                            <StarRate className={"star-rate"}/>
                                            <input type={"radio"} name={"5"} onChange={this.ChangeRate}/>
                                        </label>

                                        <label>
                                            <StarRate className={"star-rate"}/>
                                            <input type={"radio"} name={"4"} onChange={this.ChangeRate}/>
                                        </label>

                                        <label>
                                            <StarRate className={"star-rate"}/>
                                            <input type={"radio"} name={"3"} onChange={this.ChangeRate}/>
                                        </label>

                                        <label>
                                            <StarRate className={"star-rate"}/>
                                            <input type={"radio"} name={"2"} onChange={this.ChangeRate}/>
                                        </label>

                                        <label>
                                            <StarRate className={"star-rate"}/>
                                            <input type={"radio"} name={"1"} onChange={this.ChangeRate}/>
                                        </label>
                                </div>
                                {this.state.show_question_field &&
                                    <div>
                                        <TextField
                                            fullWidth={true}
                                            variant={"outlined"}
                                            label={"Написать вопрос"}
                                            placeholder={"Опишите вашу проблему здесь"}
                                            className={"question-field"}
                                            multiline={true}
                                            onChange={this.onQuestionFieldChange}
                                            value={this.state.current_message}
                                        />
                                        <Button variant={"contained"} className={"send-button"} onClick={this.SendMessage}>Отправить</Button>
                                    </div>
                                }
                                {this.state.show_error && <p className={"warning-message"}>Чтобы задать вопрос или оставить отзыв, пожалуйста авторизируйтесь в системе</p>}
                            </div>

                        }

                        <div className={"feedback"}>
                            <h4>Отзывы:</h4>
                                {this.props.hobby_info.feedback.map((item, index) =>
                                    <div className={"one-message"} key={index}>
                                        <div className={"icon-user"}></div>
                                        <div className={"message-text"}>
                                            <h3 className={"user-name"}>{item.from}</h3>
                                            <p>{item.text}</p>
                                        </div>
                                    </div>
                                )}
                            {this.state.show_feedback_field &&
                                <div>
                                    <TextField
                                        multiline={true}
                                        variant={"outlined"}
                                        label={"Отзыв"}
                                        fullWidth={true}
                                        className={"feedback-field"}
                                        placeholder={"Оставьте ваш комментарий"}
                                        onChange={this.onFeedBackFieldChange}
                                        value={this.state.current_feedback}
                                    />
                                    <Button variant={"contained"} className={"send-button"}>Отправить</Button>
                                </div>
                            }
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }

}

HobbyInfo.propTypes = {
    hobby_info: PropTypes.object.isRequired,
    provider_mode: PropTypes.bool.isRequired
};

export default HobbyInfo;