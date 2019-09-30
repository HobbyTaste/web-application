import React from "react";
import {Place} from "@material-ui/icons";
import InputAdornment from "@material-ui/core/es/InputAdornment/InputAdornment";
import Button from "@material-ui/core/es/Button/Button";
import SelectTextField from "../additional_components/select_text_field";
import * as PropTypes from "prop-types";

class SelectField extends React.Component {
    constructor(props) {
        super(props);
        let storage_stations = window.sessionStorage.getItem("metro_stations");
        storage_stations = storage_stations && storage_stations.split("%");
        this.state = {
            disabled: this.props.value,
            metro_stations: storage_stations || [],
            value: "" || this.props.value
        };
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onKeyPressed = this.onKeyPressed.bind(this);
        this.GetMetroStation = this.GetMetroStation.bind(this);
        this.CancelDisabled = this.CancelDisabled.bind(this);
        this.SetValue = this.SetValue.bind(this);

        this.input_ref = React.createRef();
        this.root_element = React.createRef();
    }

    SetValue(new_val) {
        this.setState({value: new_val});
    }

    onButtonClick(event) {
        this.setState({disabled: true});
        event && event.stopPropagation();
        this.props.onButtonClick(event);
    }

    onKeyPressed(event) {
        if(event.which === 13) {
            this.onButtonClick(event);
        }
    }

    componentDidMount() {
        this.GetMetroStation();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state === prevState) return;
        this.props.update_external_value("metro_station", this.state.value);
    }


    GetMetroStation() {
        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        let xhr = new XMLHttpRequest();
        xhr.open("GET", proxyUrl + "https://api.superjob.ru/2.0/suggest/town/4/metro/all/");
        xhr.onload = () => {
            this.setState({
                metro_stations: JSON.parse(xhr.responseText).objects.map(item => item.title)
            }, () => {window.sessionStorage.setItem("metro_stations", this.state.metro_stations.join("%"))});
        };
        xhr.send();
    }

    CancelDisabled() {
        this.setState({disabled: false}, () => {this.input_ref.current.focus()});
    }

    render() {
        return (
            <div ref={this.root_element} className={"search-div"} onClick={this.CancelDisabled}>
                <h2>Выберите место занятий</h2>
                    <SelectTextField
                        setValue={this.SetValue}
                        data={this.state.metro_stations}
                        variant={"outlined"}
                        disabled={this.state.disabled}
                        placeholder={"Станция метро"}
                        onChange={this.onInputChange}
                        onKeyDown={this.onKeyPressed}
                        autoFocus={true}
                        value={this.state.value}
                        className={"search-input"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Place/>
                                </InputAdornment>
                            ),
                        }}
                        inputRef={this.input_ref}
                    />
                    <Button color={"primary"} variant={"contained"} className={"button-search"} onClick={this.onButtonClick}>
                        {!this.state.value ? "Пропустить" : "Выбрать"}</Button>
            </div>
        )
    }
}

SelectField.proptTypes = {
    update_external_value: PropTypes.func.isRequired
};

export default SelectField;