import React from "react";
import {Search} from "@material-ui/icons";
import InputAdornment from "@material-ui/core/es/InputAdornment/InputAdornment";
import Button from "@material-ui/core/es/Button/Button";
import SelectTextField from "../additional_components/select_text_field";
import * as PropTypes from "prop-types";

class SearchField extends  React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        let storage_hobbies = window.sessionStorage.getItem("hobbies");
        storage_hobbies = storage_hobbies && storage_hobbies.split("%");
        this.state = {
            input_disabled: this.props.value,
            value: this.props.value || "",
            data: storage_hobbies || []
        };
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onKeyPressed = this.onKeyPressed.bind(this);
        this.CancelDisabled = this.CancelDisabled.bind(this);
        this.SetValue = this.SetValue.bind(this);
        this.onInputChange = this.onInputChange.bind(this);

        this.ref_input = React.createRef();
        this.tooltips_text = {
            NotFound: "К сожалению, данного хобби у нас пока нет в базе"
        };


/*        //test zone
        let test_hobbies = ["теннис", "музыка", "танцы", "волейбол", "школа музыкальная"];
        this.state.data = test_hobbies;*/
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.update_external_value("hobby_name", this.state.value);
    }

    onButtonClick(event) {
        this.props.onButtonClick();
        this.setState({input_disabled: true});
        window.sessionStorage.setItem("hobbies", this.state.data.join("%"));
        event && event.stopPropagation();
    }

    onKeyPressed(event) {
        if(event.which === 13) {
            this.onButtonClick(event);
        }
    }

    onInputChange(event) {
        let {value} = event.target;
        let xhr = new XMLHttpRequest();
        xhr.open('POST',  "/our_hobbies");
        xhr.send(JSON.stringify({substring: value}));
        xhr.onload = () => {
            this.setState({data: JSON.parse(xhr.responseText).specialization});
        }
    }

    CancelDisabled(event) {
        this.setState({input_disabled: false}, () => {this.ref_input.current.focus();});
    }

    SetValue(new_val) {
        this.setState({value: new_val});
    }

    render() {
        return (
            <div className={"search-div"} onClick={this.CancelDisabled}>
                <SelectTextField
                    tooltipTexts={this.tooltips_text}
                   /* tooltipShow={!this.state.data.length && this.state.value.length && !this.state.input_disabled}*/
                    variant={"outlined"}
                    placeholder={"Поиск"}
                    onChange={this.onInputChange}
                    className={"search-input"}
                    value={this.state.value}
                    disabled={this.state.input_disabled}
                    autoFocus={true}
                    onKeyDown={this.onKeyPressed}
                    style={{color: "white"}}
                    inputRef={this.ref_input}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search className={"search-icon"}/>
                            </InputAdornment>
                        ),
                    }}
                    setValue={this.SetValue}
                    data={this.state.data}
                />
                <Button color={"primary"} variant={"contained"} className={"button-search"}  onClick={this.onButtonClick}>
                    {!this.state.value ? "Пропустить" : "Искать"}</Button>
            </div>
        )
    }
}

SearchField.propTypes = {
    update_external_value: PropTypes.func.isRequired
};

export default SearchField;
