import React from 'react'
import Grid from "@material-ui/core/es/Grid";
import  './user_cabinet_styles.css'
import {Link} from 'react-router-dom';
import Button from "@material-ui/core/es/Button";
import HobbyInfo from "../provider_cabinet/hobby_info";
import TextField from "@material-ui/core/es/TextField/TextField";
import ReactDOM from "react-dom";
import  '../main_page/index.css'

function getArray(object, n) {
    return [...new Array(n)].map(item => Object.assign({}, object));
}

class UserCabinet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_info: {
                name: "Никита",
                phone: "+79153939881",
                email: "sikalov.ns@phystech.edu"
            },
            user_hobbies: [
                {
                    name: "Stretching",
                    phone: "7925234534",
                    email: "world.class@gmail.com",
                    site: "https://www.worldclass.ru/",
                    provider: "World Class",
                    address: {
                        metro: "Парк культуры",
                        precise_address: "БЦ \"Морозов\" "
                    },
                    users_rate: {
                        rate: 4.8,
                        number_estimators: 200
                    },
                    additional_information: "Подвид фитнеса, который включает упражнения, " +
                        "способствующие растяжению мышц и связок, называют стретчингом. Используют его в качестве отдельного направления и как дополнение " +
                        "к основному спортивному комплексу фитнеса или аэробики. Выясняя, что такое стретчинг в фитнесе, следует " +
                        "указать, что это направление используют для подготовки профессиональных спортсменов и включается в " +
                        "оздоровительную и лечебную гимнастику. Эта дисциплина подразумевает чередование напряжения и расслабления мышц, " +
                        "что поможет быстро снять напряжение и восстановить силы.\n",

                    about_provider: "Сеть фитнес-клубов премиум класса World Class — лидер индустрии " +
                        "в сегментах «люкс» и «премиум». Быть членом клуба World Class — значит, получить доступ к " +
                        "неограниченным возможностям фитнеса премиум класса: посещение групповых программ, тренажерного зала, " +
                        "бассейна, SPA-салонов, а также участию в светских и спортивных мероприятиях, тренировках на свежем " +
                        "воздухе и даже путешествиях.",
                    feedback: [
                        {
                            from: "Никита",
                            text: "Расслаюляющая атмосфера и приятные люди"
                        },
                    ]
                }
            ],
            conversations: [{
                provider: {
                    name: "WorldClass",
                    email: "world.class@gmail.com"
                },
                user: "Никита",
                messages: [
                    {
                        sender: "Никита",
                        text: "Сколько стоит одно занятие?"
                    },
                    {
                        sender: "World Class",
                        text: "2000 рублей - одно занятие"
                    }
                    ]
            }],
            text_field_opened: [false, false, false, false, false],
            current_message: ""
        };

        this.onMessageTyping = this.onMessageTyping.bind(this);
        this.SendMessage = this.SendMessage.bind(this);
        this.onConversationClick = this.onConversationClick.bind(this);

    }

    onMessageTyping(event) {
        let {value} = event.target;
        if(value.slice(-1) === "\n") {
            value.length > 1 && this.SendMessage(event);
            return;
        }
        this.setState({current_message: value});
    }



    SendMessage(event) {
        let {target} = event;
        let key = +target.getAttribute("data-key");
        let message = this.state.current_message;
        let to = this.state.conversations[key].provider.email;
        this.setState((prevState) => prevState.conversations[key].messages.push({sender: this.state.user_info.name, text: message}));
        this.setState({current_message: ""});
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/new_message");
        xhr.send(JSON.stringify({to, message}));
    }

    onConversationClick(event) {
        if(event.target.closest(".answer-field")) return false;
        let target = event.currentTarget;
        let key = +target.getAttribute("data-key");
        this.setState((prevState) => prevState.text_field_opened[key] = !prevState.text_field_opened[key]);
    }

    render() {
        return (
            <div className={"main-user-cabinet"}>
                <header className="page-header">
                    <Grid container>
                        <Grid item xs={6} sm={4} className={"logo"} onClick={this.onLogoClick}><h1>Hobby Taste</h1></Grid>
                        <Grid item xs={6} sm={8} className={"user"}>
                            <div>
                                <Button href={"/"} className={"exit-button"}>Выйти</Button>
                                <Link to='/'>На главную</Link>
                            </div>
                        </Grid>
                    </Grid>
                </header>
                <section className={"content"}>
                    <Grid container>
                        <Grid item xs={12} sm={6} lg={3}>
                            <div className={"container"}>
                                <div className={"user-info"}>
                                    <div className={"icon"}></div>
                                    <h3>{this.state.user_info.name}</h3>
                                    <ul>
                                        <li><span>Телефон:</span> <span>{this.state.user_info.phone}</span> </li>
                                        <li><span>Email:</span> <span>{this.state.user_info.email}</span></li>
                                    </ul>
                                    <Button variant={"contained"} color={"primary"}>Изменить</Button>
                                </div>
                                <div className={"messages"}>
                                    <h2>Текущие вопросы</h2>
                                    <div className={"messages-container"}>
                                    {this.state.conversations.map((conversation, index) =>
                                        <div className={"one-conversation"} key={index} data-key={index} onClick={this.onConversationClick}>
                                            <h3 className={"provider-name"}>{conversation.provider.name}</h3>
                                            <div className={"icon-provider"}></div>
                                            <div className={"conversation-messages"}>
                                                {conversation.messages.map((item, index) =>
                                                    <p><span className={"sender-name"} key={index}>{item.sender}: </span>{item.text}</p>)}
                                            </div>
                                            {this.state.text_field_opened[index] &&
                                            <div className={"answer-field"}>
                                                <TextField
                                                    className={"answer-field"}
                                                    variant={"outlined"}
                                                    multiline={true}
                                                    fullWidth={true}
                                                    placeholder={"Ваш ответ"}
                                                    value={this.state.current_message}
                                                    onChange={this.onMessageTyping}
                                                    data-key={index}
                                                    autoFocus={true}
                                                />
                                                <Button variant={"contained"} data-key={index} onClick={this.SendMessage}>Отправить</Button>
                                            </div>
                                           }
                                        </div>)}
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={9}>
                            <div className={"user-hobbies"}>
                                <h2>Мои хобби</h2>
                                {this.state.user_hobbies.map((item, index) =>
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
                                        <HobbyInfo hobby_info={item} provider_mode={false}/>
                                    </div>)}
                            </div>
                        </Grid>
                    </Grid>
                </section>
                <footer></footer>
            </div>
        )
    }
}

export default UserCabinet;
