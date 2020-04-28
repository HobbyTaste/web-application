import  React, {Component} from 'react'
import style from './Feedback.css';
import Rating from '@material-ui/lab/Rating';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ButtonProvider from '../Button/ButtonProvider';
import { connect } from 'react-redux';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CommentInput from './CommentInput';
import { addProviderResponse, addUserFeedback } from '../../../redux/actions/hobbyActions';


const useStyles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        color: 'rgba(0, 0, 0, 0.54)',
    },
    stars:{
        color: 'rgba(0, 0, 0, 0.54)'
    },
    countStars:{
        margin: '0px 5px',
    }
});


class CommentText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAnswered: false,
            isOwner: props.isOwner,
            isItAnswerProvider: props.isItAnswerProvider,
            isProviderAuth: props.isProviderAuth,
            text: props.comment.text,
            nameWriter: props.comment.nameWriter,
            date: props.comment.date,
            stars: props.comment.stars,
            isHaveAnswer: props.isHaveAnswer,

        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event) {
        this.setState({isAnswered: !this.state.isAnswered});
    }


    render(){
        const classes = useStyles()
        let classContainer = style.containerComment;
        if (this.state.isItAnswerProvider) {
            classContainer += (' ' + style.containerAnswer);
        }
        return (
            <div>
            <div className={classContainer}>
                <div className={style.info}>
                    <div className={style.containerInfo}>
                    <p className={style.icon}><AccountCircleIcon style={{ fontSize: 40}} /></p>
                    <div className={style.infoData}>
                        <p className={style.userName}>{this.state.nameWriter}</p>
                        <p className={style.data}> {this.state.date}</p>
                    </div>
                </div>
                {(this.state.isOwner && !this.state.isItAnswerProvider && !this.state.isHaveAnswer) && <ButtonProvider className={style.buttonContainer} onClick={this.handleClick} text="Ответить"/>}
                </div>
        { !this.state.isItAnswerProvider && <Rating style={classes.stars} size='small' name="half-rating-read" defaultValue={this.state.stars} emptyIcon={<StarBorderIcon fontSize="inherit" />} precision={0.5} readOnly /> }
        <div className={style.text}>
            {this.state.text}
        </div>
            </div>
                {this.state.isAnswered && <CommentInput onSubmit={this.props.handleSubmit} isAnswer={true}/>}
            </div>

);
    }
}


export default CommentText;


