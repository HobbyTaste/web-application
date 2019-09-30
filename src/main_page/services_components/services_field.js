import React from 'react'
import Button from "@material-ui/core/es/Button/Button";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import {Place} from "@material-ui/icons";
import * as PropTypes from "prop-types";
import HobbyInfo from "../../provider_cabinet/hobby_info";
import '../../provider_cabinet/hobby_card.css'

class ServicesField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logged_in: true
        };
        this.user_info = {};
        this.OpenDialogWindow = this.OpenDialogWindow.bind(this);
        this.CloseDialogWindow = this.CloseDialogWindow.bind(this);
        this.AddHobby = this.AddHobby.bind(this);
    }

    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "/get_user_info");
        xhr.send();
        xhr.onload = () => {
            if (xhr.status === 200) {
                this.user_info = JSON.parse(xhr.responseText);
                this.setState({logged_in: true});
            }
        };
    }

    OpenDialogWindow() {
        this.setState({dialog_window_open: true});
    }

    CloseDialogWindow() {
        this.setState({dialog_window_open: false})
    }

    AddHobby(event) {
        let key = +event.target.getAttribute("data-key");
        let hobby = this.props.data[key];
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/add_hobby");
        xhr.send(JSON.stringify({
            provider: hobby.provider,
            email: hobby.email,
            hobby_name: hobby.name
        }));
    }


    render() {
        return (
            <div className={"services-container providers-block"}>
                <h1>Результаты поиска</h1>
                <div className={"providers-container"}>
                    {this.props.data.map((item, index) =>
                        <div key={index.toString()} className={"hobby"}>
                            <div className={"icon"}></div>
                            <h3>{item.name}</h3>
                            <p className={"users-rate"}>Оценило пользователей: <span>{item.users_rate.number_estimators}</span> на <span>{item.users_rate.rate}</span></p>
                            <ul>
                                <li><span>Телефон: </span> {item.phone}</li>
                                <li><span>email: </span>{item.email}</li>
                                <li><span>Метро: </span> {item.address.metro}</li>
                                <li>{item.address.precise_address}</li>
                            </ul>
                            {this.state.logged_in && <Button variant={"contained"} className={"add-hobby"} data-key={index} onClick={this.AddHobby}>Добавить в свой кабинет</Button>}
                            <HobbyInfo hobby_info={item} provider_mode={false}/>
                        </div>)}
                </div>
            </div>
        )
    }

}

ServicesField.propTypes = {
    data: PropTypes.array.isRequired
};

export default ServicesField;