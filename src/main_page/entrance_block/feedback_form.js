import React from 'react';
import * as PropTypes from "prop-types";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import TextField from "@material-ui/core/es/TextField/TextField";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import Button from "@material-ui/core/es/Button/Button";
import FormJsonizer from 'form-jsonizer'

class FeedbackForm extends React.Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = {
            thanks_message: false
        };
    }


    onFormSubmit(event) {
        event.preventDefault();
        const jsonizer = new FormJsonizer();
        let form = event.target;
        const data = jsonizer.serialize(form);
        let request = new XMLHttpRequest();
        request.open("POST", "/feedback-message");
        request.send(data);
        this.setState({thanks_message: true});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps === this.props) return;
        if (this.props.open === false) {
            setTimeout(() => {this.setState({thanks_message: false});}, 300);

        }
    }


    render() {
        return (
            <Dialog className={"feedback-dialog"} {...this.props} maxWidth={"sm"} onClose={this.props.onClose}>
                <DialogTitle><span className={"title"}>{this.state.thanks_message ? "Благодарим за ваш отзыв" : "Отзыв"}</span></DialogTitle>
                <DialogContent>
                    {   !this.state.thanks_message ?
                        <form onSubmit={this.onFormSubmit}>
                            <TextField
                                className={"email-field"}
                                variant={"outlined"}
                                type={"email"}
                                label={"Email"}
                                placeholder={"Введите свой email"}
                                name={"email"}
                                required={true}
                                autoFocus={true}
                                fullWidth={true}
                            />
                            <TextField
                                placeholder={"Введите здесь свое сообщение"}
                                variant={"outlined"}
                                name={"message"}
                                multiline={true}
                                rows={15}
                                fullWidth={true}
                            />
                            <Button variant={"contained"} color={"primary"} type={"submit"}>Отправить</Button>
                            <Button variant={"contained"} color={"secondary"}
                                    onClick={this.props.onClose}>Отмена</Button>
                        </form>
                        :
                        <div>
                            <Button variant={"contained"} color={"secondary"}
                                    onClick={this.props.onClose} fullWidth={true}>Закрыть</Button>
                        </div>
                    }
                </DialogContent>
            </Dialog>
        );
    }
}

FeedbackForm.propTypes = {
  ...Dialog.propTypes
};

export default FeedbackForm;