import React from 'react';
import MaskedInput from 'react-text-mask';
import TextField from "@material-ui/core/es/TextField/TextField";

const TextMaskCustom = (props) => {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={inputRef}
            placeholderChar={'\u2000'}
        />
    );
};

class MaskedTextField extends React.Component {
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.state = {value: "" }
    }

    onInputChange(event) {
        const {value} = event.target;
        this.setState({value: value});
        if(this.props.onChange) {
            this.props.onChange(event);
        }
    }

    render() {
        const {mask, inputRef, placeholder, ...props} = this.props;

        return (
            <TextField
                {...props}
                onChange={this.onInputChange}
                value={this.state.value}
                InputProps={{
                    inputComponent: TextMaskCustom,
                    inputProps: {
                        mask: mask,
                        placeholder: placeholder,
                        inputRef: inputRef,
                    }
                }}
            />
        );
    }
}

export default MaskedTextField;