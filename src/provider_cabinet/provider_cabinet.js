import React from 'react'
import './provider_cabinet_styles.css'
import Button from "@material-ui/core/es/Button/Button";
import Grid from "@material-ui/core/es/Grid";
import Tabs from "@material-ui/core/es/Tabs/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from '@material-ui/icons/Phone';
import ArrowDown from '@material-ui/icons/KeyboardArrowDownSharp'
import MessagesIcon from '@material-ui/icons/Message'
import HobbyInfo from "./hobby_info";

function getPhones(array) {
    if(typeof array == "string") return "+" + array;
    return array.map(item => "+" + item).map(item => <a href={"tel: " + item}>{item};  </a>);
}

function getEmail(email) {
    return <a href={"mailto: " + email}> {email}</a>
}

function getArray(object, n) {
    return [...new Array(n)].map(item => Object.assign({}, object));
}

class ProviderCabinet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 0,
            mobile_section: 0,
            mobile_mode: false,
            provider_info: {
                name: "",
                contacts: {
                    telephone: "",
                    email: "",
                    site: ""
                }
            },
            provider_hobbies: [],
            messages: [],
            applications: [],
            subscribers: []
        };
        this.onTabChange = this.onTabChange.bind(this);
        this.onMobileTabChange = this.onMobileTabChange.bind(this);
    };

    onTabChange(event, value) {
        this.setState({tab: value});
    };

    onMobileTabChange(event, value) {
        this.setState({mobile_section: value});
    }


    componentWillMount() {
        let screen_width = screen.width;
        if(screen_width <= 425) {
            this.setState({mobile_mode: true});
        }
        const xhr1 = new XMLHttpRequest();
        xhr1.open("GET", "/get_hobby_provider_info");
        xhr1.send();
        xhr1.onload = () => {
            this.setState({provider_info: JSON.parse(xhr1.responseText)});
        };

        const xhr2 = new XMLHttpRequest();
        xhr2.open("GET", "/get_provider_hobbies");
        xhr2.send();
        xhr2.onload = () => {
            this.setState({provider_hobbies: JSON.parse(xhr2.responseText)});
        };

        const xhr3 = new XMLHttpRequest();
        xhr3.open("GET", "/get_provider_messages");
        xhr3.send();
        xhr3.onload = () => {
            this.setState({messages: JSON.parse(xhr3.responseText)});
        };

        const xhr4 = new XMLHttpRequest();
        xhr4.open("GET", "/get_applications");
        xhr4.send();
        xhr4.onload = () => {
            this.setState({applications: JSON.parse(xhr4.responseText)});
        };

        const xhr5 = new XMLHttpRequest();
        xhr5.open("GET", "/get_subscribers");
        xhr5.send();
        xhr5.onload = () => {
            this.setState({subscribers: JSON.parse(xhr5.responseText)});
        };

    }

    componentDidMount() {
        let flex_container = document.querySelector(".main-provider-cabinet .mobile-tabs button").parentElement;
        flex_container.classList.add("my-flex-container");
    }

    render() {
        return (
            <div className={"main-provider-cabinet"}>
                <header>
                    <Button variant={"contained"} color={"primary"} href={"/provider_log_out"}>Выйти</Button>
                    <h1>Hobby Taste</h1>
                </header>
                <section className={"content"}>
                    {this.state.mobile_section === 2 && <a href={"#add-new-hobby"}><span>Новое <br/> хобби</span> <ArrowDown/></a>}
                    <Grid container>
                        <Grid item xs={12} sm={6} lg={3} alignItems={"center"} justify={"center"}>
                            <div className={"container"}>
                                <div className={"provider-info"}>
                                    <div className={"icon"}></div>
                                    <h3>{this.state.provider_info.name}</h3>
                                    <ul>
                                        <li><span>Телефон:</span> <span>{getPhones(this.state.provider_info.contacts.telephone)}</span> </li>
                                        <li><span>Email:</span> <span>{getEmail(this.state.provider_info.contacts.email)}</span></li>
                                    </ul>
                                    <Button variant={"contained"} color={"primary"}>Изменить</Button>
                                </div>
                                <Tabs
                                    className={"mobile-tabs"}
                                    value={this.state.mobile_section}
                                    onChange={this.onMobileTabChange}
                                    >
                                    <Tab label={"Сообщения/заявки"}/>
                                    <Tab label={"Подписчики"}/>
                                    <Tab label={"Мои хобби"}/>
                                </Tabs>
                                {(this.state.mobile_section === 0 || !this.state.mobile_mode)  &&
                                <div className={"messages-applications"}>
                                    <Tabs
                                        value={this.state.tab}
                                        onChange={this.onTabChange}
                                    >
                                        <Tab label={"Сообщения"} icon={<MessagesIcon/>} className={"tab"}/>
                                        <Tab label={"Заявки на звонок"} className={"tab"} icon={<PhoneIcon/>}/>
                                    </Tabs>
                                    {this.state.tab === 0 &&
                                    <div className={"messages"}>
                                        {this.state.messages.map((item, index) =>
                                            <div className={"one-message"} key={index}>
                                                <div className={"icon-user"}></div>
                                                <div className={"message-text"}>
                                                    <h3 className={"user-name"}>{item.from}</h3>
                                                    <p>{item.text}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    }
                                    {this.state.tab === 1 &&
                                    <div className={"messages"}>
                                        {this.state.applications.map((item, index) =>
                                            <div className={"one-message"}>
                                                <div className={"icon-user"}></div>
                                                <div className={"message-text"}>
                                                    <h3 className={"user-name"}>{item.from}</h3>
                                                    <p>Меня заинтересовало у вас <span>{item.hobbie_name}</span>.<br/>
                                                    Прошу перезвонить с <span className={"time"}>{item.time_from}</span> до <span className={"time"}>{item.time_to}</span> <br/>
                                                        Телефон: <span>{item.user_phone}</span> </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    }
                                </div>}
                                {(this.state.mobile_section === 1 || !this.state.mobile_mode)  &&
                                <div className={"subscribers"}>
                                    <h3>Подписчики</h3>
                                    <div className={"subscribers-container"}>
                                        {this.state.subscribers.map(item =>
                                            <div className={"one-message"}>
                                                <div className={"icon-user"}></div>
                                                <div className={"message-text"}>
                                                    <h4 className={"user-name"}>{item.name}</h4>
                                                    <h4 className={"user-hobby"}>{item.hobby_name}</h4>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>}
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={9}>
                            {(this.state.mobile_section === 2 || !this.state.mobile_mode)  &&

                            <div className={"provider-hobbies"}>
                                <h2>Мои хобби</h2>
                                {this.state.provider_hobbies.map((item, index) =>
                                    <div key={index.toString()} className={"hobby"}>
                                        <div className={"icon"}></div>
                                        <h3>{item.name}</h3>
                                        <p className={"users-rate"}>Оценило пользователей: <span>{item.users_rate.number_estimators}</span> на <span>{item.users_rate.rate}</span></p>
                                        <ul>
                                            <li><span>Телефон: </span> {getPhones(item.phone)}</li>
                                            <li><span>email: </span>{getEmail(item.email)}</li>
                                            <li><span>Метро: </span> {item.address.metro}</li>
                                            <li>{item.address.precise_address}</li>
                                        </ul>
                                        <HobbyInfo hobby_info={item} provider_mode={true}/>
                                    </div>
                                )}
                                <a href={"/new_hobby_page"} id={"add-new-hobby"}>
                                    <h3>Добавить новое хобби</h3>
                                    <div className={"add-icon"}></div>
                                </a>
                            </div>}
                        </Grid>
                    </Grid>
                </section>
            </div>
        )
    }

}

export default ProviderCabinet;