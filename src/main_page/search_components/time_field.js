import React from "react";
import Button from "@material-ui/core/es/Button/Button";
import MaskedTextField from "../additional_components/text_field_mask";
import * as PropTypes from "prop-types";


class TimeField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled_from: false,
            disabled_to: false,
            value_from: this.props.value.time_from || "",
            value_to: this.props.value.time_to || "",
            days_week: this.props.value.days_week
        };
        this.onButtonChooseClick = this.onButtonChooseClick.bind(this);
        this.onButtonSkipClick = this.onButtonSkipClick.bind(this);
        this.onKeyPressed = this.onKeyPressed.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.TryToGoNextStep = this.TryToGoNextStep.bind(this);
        this.onChooseDay = this.onChooseDay.bind(this);
        this.onTimeChooseFieldClick = this.onTimeChooseFieldClick.bind(this);
        this.time_from = React.createRef();
        this.time_to = React.createRef();
        this.inputChanged = {
            from: false,
            to: false
        };
    }

    componentDidMount() {
        let days = [...this.state.days_week];
        days.forEach(day => {
            let li = document.querySelector(`.time-field .weekday-list li[data-key="${day}"]`);
            li.classList.add("active");
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState === this.state) return;
        this.TryToGoNextStep();
        this.props.update_external_value("time_from", this.state.value_from);
        this.props.update_external_value("time_to", this.state.value_to);
        this.props.update_external_value("days_week", [...this.state.days_week]); //преобразовать в массив
    }

    TryToGoNextStep() {
        if(this.state.disabled_from && this.state.disabled_to ) {
            this.props.endSearchFunction();
        }
    }

    onButtonChooseClick() {
        if(this.inputChanged.to === true) {
            this.setState({disabled_to: true});
            this.time_from.current.inputElement.focus();
        } else {
            this.time_to.current.inputElement.focus();
        }
        if(this.inputChanged.from === true) {
            this.setState({disabled_from: true});
            this.time_to.current.inputElement.focus()
        } else {
            this.time_from.current.inputElement.focus();
        }
    }

    onChooseDay(evet) {
        let target = evet.target;
        let {days_week} =  this.state;
        if(target.classList.contains("active")) {
            this.setState({days_week: days_week.delete(+target.getAttribute("data-key"))});
        } else {
            this.setState({days_week: days_week.add(+target.getAttribute("data-key"))});
        }
        target.classList.toggle("active");
    }

    onButtonSkipClick() {
        this.setState({
            disabled_from: true,
            disabled_to: true
        });
    }

    onKeyPressed(event) {
        if(event.which === 13) {
            if(event.target.id === "from") {
                this.time_to.current.inputElement.focus();
            } else {
                this.time_from.current.inputElement.focus();
            }
            this.setState({
                ["disabled_" + event.target.id]: true,
            });
        }
    }

    onInputChange(e) {
        let {id, value} = e.target;
        let state_name = "value_" + id;
        this.setState({[state_name]: value});
        this.inputChanged[id] = true;
    }

    onTimeChooseFieldClick(event) {
        let {id} = event.target;
        let state_name = "disabled_" + id;
        this.setState({[state_name]: false});
    }

    render() {
        const days_week = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

        return (
            <div className={"time-field search-div"}>
                <h2>Выберите время занятий</h2>
                <ul className={"weekday-list"}>
                    {days_week.map((day, index) => <li key={index.toString()} data-key={index.toString()} onClick={this.onChooseDay}>{day}</li>)}
                </ul>
                <div className={"time-select"}>
                    <span>С</span>
                    <MaskedTextField className={"text-field-time-select"}
                                     onClick={this.onTimeChooseFieldClick}
                                     placeholder={"01:05"}
                                     /*label={"Time"}*/
                                     disabled={this.state.disabled_from}
                                     id={"from"}
                                     inputRef={this.time_from}
                                     onKeyDown={this.onKeyPressed}
                                     autoFocus={true}
                                     onChange={this.onInputChange}
                                     value={this.state.value_from}
                                     mask={[/[0-2]?/, /[0-9]/, ':', /[0-9]/, /[0-9]/]}
                    />
                    <span>До</span>
                    <MaskedTextField    className={"text-field-time-select"}
                                        placeholder={"03:05"}
                                        disabled={this.state.disabled_to}
                                        onKeyDown={this.onKeyPressed}
                                        inputRef={this.time_to}
                                        id={"to"}
                                        onChange={this.onInputChange}
                                        value={this.state.value_to}
                                        mask={[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]}
                    />
                </div>
                <div className={"buttons"}>
                    {this.state.value_from || this.state.value_to || !!this.state.days_week.size
                        ?   <Button color={"primary"} variant={"contained"} className={"button-search"} onClick={this.onButtonChooseClick} id={"button-choose"}>
                        Выбрать </Button>
                    : <Button color={"primary"} variant={"contained"} className={"button-search"} onClick={this.onButtonSkipClick} id={"button-skip"}>
                            Пропустить </Button>}
                </div>
            </div>
        )
    }
}

TimeField.propTypes = {
    update_external_value: PropTypes.func.isRequired
};

export default TimeField;