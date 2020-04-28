import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import React from 'react';
import style from './Feedback.css';
const useStyles = theme => ({
    stars:{
        marginLeft: '5px',
        color: 'rgba(0, 0, 0, 0.54)'
    },
    error:{
        marginLeft: '5px',
        color: 'rgba(0, 0, 0, 0.54)',
        borderRadius: '5px',
        border: 'solid red 1px',
    }
});
const classes = useStyles();

const StarsRating = (props) => {
    const {input, meta} = props;
    const hasError = meta.touched && meta.error;
    return (
    <Rating style={(hasError ? classes.error : classes.stars )} size='small' name="half-rating-read" emptyIcon={<StarBorderIcon fontSize="inherit"/>}
            defaultValue={0} precision={1} {...input}
            onChange={(value) => input.onChange(value)}
            onBlur={() => input.onBlur(input.value)}
    />
    )
}

export default StarsRating;
