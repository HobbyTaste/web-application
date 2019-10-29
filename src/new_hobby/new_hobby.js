import React from 'react'
import './new_hobby.css'
import Grid from "@material-ui/core/es/Grid";
import TextField from "@material-ui/core/es/TextField/TextField";
import MaskedTextField from "../main_page/additional_components/text_field_mask";
import SelectTextField from "../main_page/additional_components/select_text_field";
import Button from "@material-ui/core/es/Button/Button";
import ReactDOM from "react-dom";
import FormJsonizer from "form-jsonizer";

function getPhones(array) {
    if(typeof array == "string") {
        let phone = "+" + array;
        return <a href={"tel: " + phone}>{phone}</a>;
    }
    return array.map(item => "+" + item).map(item => <a href={"tel: " + item}>{item};  </a>);
}

class NewHobby extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hobby_info: {
                name: "",
                phone:  "",
                email: "",
                site: "",
                address: {
                    metro: "",
                    precise_address: ""
                },
                additional_information: "",
            },
            provider_info: {
                name: "",
                contacts: {
                    telephone: "",
                    email: "",
                    site: "",
                },
                about_provider: "",
            },
            metro: "",
            metro_array: []
        };
        this.onFormChange = this.onFormChange.bind(this);
        this.SetMetro = this.SetMetro.bind(this);
        this.GetMetroStations();
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentWillMount() {
        const xhr1 = new XMLHttpRequest();
        xhr1.open("GET", "/get_hobby_provider_info");
        xhr1.send();
        xhr1.onload = () => {
            this.setState({provider_info: JSON.parse(xhr1.responseText)});
        };
    }

    onFormChange(event) {
        let {name, value} = event.target;
        if (name === "precise_address" || name === "metro") {
            this.setState(prevState => {prevState.hobby_info.address[name] = value; return prevState;});
            return;
        }
        if (name === "phone") {
            value = value.match(/\d/gi).join("");
        }
        this.setState(prevState => {prevState.hobby_info[name] = value; return prevState; });
    }

    SetMetro(value) {
        this.setState(prevState => {
            prevState.metro = value;
            prevState.hobby_info.address.metro = value;
            return prevState;
        });
    }


    GetMetroStations() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/metro_stations");
        xhr.send();
        xhr.onload = () => {
            let data = JSON.parse(xhr.response);
            let stations = [...new Set(data.metro_staions)];
            this.setState({metro_array: stations});
        }
    }

    onFormSubmit(event) {
        event.preventDefault();
        let form = event.target;
        const jsonizer = new FormJsonizer();
        const data = jsonizer.serialize(form);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/add_new_hobby");
        xhr.send(data);
    }

    render() {
        return (
            <div className={"main-new-hobby"}>
                <header>
                    <h1>Hobby Taste</h1>
                </header>
                <section className={"content"}>
                    <Grid container>
                        <Grid item sm={6} xs={12} className={"new-hobby-form"}>
                            <h2>Заполните небольшую форму о вашем хобби</h2>
                            <form onChange={this.onFormChange} action={"/add_new_hobby"} method={"POST"}>
                                <TextField
                                    label={"Название"}
                                    variant={"outlined"}
                                    fullWidth={true}
                                    name={"name"}
                                    className={"input-field"}
                                    required={true}
                                />
                                <MaskedTextField
                                    label={"Телефон"}
                                    mask={['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                                    variant={"outlined"}
                                    name={"phone"}
                                    fullWidth={true}
                                    className={"input-field"}
                                    required={true}
                                />
                                <TextField
                                    label={"Email"}
                                    type={"email"}
                                    name={"email"}
                                    placeholder={"compony@compony.gmail"}
                                    variant={"outlined"}
                                    fullWidth={true}
                                    defaultValue={this.state.provider_info.contacts.email}
                                    className={"input-field"}
                                />
                                <TextField
                                    label={"Сайт"}
                                    type={"url"}
                                    fullWidth={true}
                                    variant={"outlined"}
                                    name={"site"}
                                    className={"input-field"}
                                />
                                <SelectTextField
                                    label={"Станция метро"}
                                    data={this.state.metro_array}
                                    setValue={this.SetMetro}
                                    fullWidth={true}
                                    variant={"outlined"}
                                    className={"input-field"}
                                    name={"metro"}
                                    value={this.state.metro}
                                    required={true}
                                />
                                <TextField
                                    label={"Точный адрес"}
                                    fullWidth={true}
                                    className={"input-field"}
                                    name={"precise_address"}
                                    variant={"outlined"}
                                    required={true}
                                />
                                <TextField
                                    label={"Краткая информация о хобби"}
                                    fullWidth={true}
                                    multiline={true}
                                    rows={5}
                                    className={"input-field"}
                                    variant={"outlined"}
                                    name={"additional_information"}
                                    required={true}
                                />
                                <Button variant={"contained"} color={"primary"} type={"submit"}>Отправить</Button>
                                <Button variant={"contained"} color={"primary"} type={"reset"}>Сбросить</Button>
                            </form>
                        </Grid>
                        <Grid item sm={6} xs={12} className={"preview"}>
                            <div className={"container"}>
                                <h2>{this.state.hobby_info.name}</h2>
                                <div className={"full-info"}>
                                    <h4>Краткая информация</h4>
                                    <p>{this.state.hobby_info.additional_information}</p>
                                    <hr/>
                                    <h4>{this.state.provider_info.name}</h4>
                                    <p>{this.state.provider_info.about_provider}</p>
                                    <hr/>
                                    <h4>Контактные данные</h4>
                                    <ul>
                                        {!!this.state.hobby_info.phone.length && <li>{getPhones(this.state.hobby_info.phone)}</li>}
                                        {!!this.state.hobby_info.email.length && <li><a href={"mailto: " + this.state.hobby_info.email}>{this.state.hobby_info.email}</a></li>}
                                        {!!this.state.hobby_info.site.length && <li><a href={this.state.hobby_info.site}>{this.state.hobby_info.site}</a></li>}
                                        <li>
                                            Метро: {this.state.hobby_info.address.metro} <br/>
                                            Адрес: {this.state.hobby_info.address.precise_address}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </section>
            </div>
        )
    }
}

export default NewHobby;
