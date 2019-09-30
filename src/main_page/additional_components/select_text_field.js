import React from 'react'
import TextField from "@material-ui/core/es/TextField/TextField"
import './styles_components.css'
import PropTypes from 'prop-types';
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";

class SelectTextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            select_options: [],
            tooltip_opened: false
        };
        this.data = this.props.data || [];

        this.input_ref = this.props.inputRef || React.createRef();
        this.select_ref = React.createRef();
        this.onTextFieldChange = this.onTextFieldChange.bind(this);
        this.onTextFieldFocus = this.onTextFieldFocus.bind(this);
        this.onTextFieldBlur = this.onTextFieldBlur.bind(this);
        this.ChoseOption = this.ChoseOption.bind(this);
    }

    componentDidMount() {
        //let fieldset_styles = window.getComputedStyle(this.input_ref.current.closest("fieldset"));
        //console.log(this.input_ref.current.closest("_select-text-field"));
        let input_styles = window.getComputedStyle(this.input_ref.current.closest("._select-text-field"));
        [this.select_ref.current.style.width] = [input_styles.width];
        this.props.value && this.setState({select_options: this.SearchOptions(this.props.value)});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.data.length !== this.data.length) this.data = this.props.data;
        if(prevProps.disabled === this.props.disabled) return;
        if(this.props.disabled) {
            let val = this.state.select_options[0] || "";
            this.props.setValue(val);
            this.setState({tooltip_opened: false});
            this.select_ref.current.classList.remove("_active");
        }
    }

    onTextFieldChange(event) {
        let {value} = event.target;
        let approparate_options = this.SearchOptions(value);
        if(approparate_options.length) {
            this.select_ref.current.classList.add("_active");
        } else {
            this.select_ref.current.classList.remove("_active");
        }
        this.setState({
            select_options: approparate_options,
            tooltip_opened: !approparate_options.length && value
        });
        this.props.setValue(value);
        this.props.onChange && this.props.onChange(event);
    }

    SearchOptions(option) {
        option = option.toLowerCase();
        return (!option && []) || this.data.filter(item => item && item.toString().toLowerCase().startsWith(option));
    }

    onTextFieldFocus(event) {
        this.state.select_options.length && this.select_ref.current.classList.add("_active");
        this.props.onFocus && this.props.onFocus(event);
    }

    onTextFieldBlur(event) {
        setTimeout(() => {this.select_ref.current.classList.remove("_active")} , 200);
        this.props.onBlur && this.props.onBlur(event);
    }

    ChoseOption(event) {
        let option = event.target.getAttribute("data-key");
        this.props.setValue(option);
    }

    render() {
        const {setValue, data, tooltipTexts, className, ...props} = this.props;
        return (
            <div className={`_select-text-field ${className}`}>
                <Tooltip className={"_tooltip"} title={(tooltipTexts && tooltipTexts.NotFound) || "Не найдено"} open={this.state.tooltip_opened}>
                    <TextField
                        {...props}
                        onFocus={this.onTextFieldFocus}
                        onBlur={this.onTextFieldBlur}
                        onChange={this.onTextFieldChange}
                        inputRef={this.input_ref}
                        autoFocus={false}/>
                </Tooltip>
                    <ul ref={this.select_ref}>
                        {this.state.select_options.map((item, index) => <li key={index} data-key={item} onClick={this.ChoseOption}>{item}</li>)}
                    </ul>
            </div>
        )
    }
}

SelectTextField.propTypes = {
    setValue: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    tooltipTexts: PropTypes.object,
    onChange: PropTypes.func,
    tooltipShow: PropTypes.bool,
    ...TextField.propTypes
};

export default SelectTextField;