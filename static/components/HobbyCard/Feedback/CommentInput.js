import  React, {Component} from 'react'
import style from './Feedback.css';
import Rating from '@material-ui/lab/Rating';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ButtonSend from '../Button/ButtonsSend';
import ButtonCancel from '../Button/ButtonCancel';

import StarBorderIcon from '@material-ui/icons/StarBorder';
import { connect } from 'react-redux';

const anwerInBD=[{
    userId: 1,
    userName: 'Азалия',
    data: '28.12.2020',
    text:'Текст отзыва. Много много текста мМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текста',
    star: 5,
    answerId:1,
},
    {
        userId: 2,
        userName: 'Имя',
        data: '21.10.2020',
        text:'Текст отзыва. Много много текста мМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текста',
        star: 3,
        answerId:2,
    },
]



const useStyles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        color: 'rgba(0, 0, 0, 0.54)',
    },
    stars:{
        marginLeft: '5px',
        color: 'rgba(0, 0, 0, 0.54)'
    },
    countStars:{
        margin: '0px 5px',
    }
});


class CommentInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isAnswer: props.isAnswer,
            userName: 'Имя пользователя из store',
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleClick(event) {
        this.setState({value: ''});
    }


    render() {
        const classes = useStyles()
        var today = new Date(), dataNow = today.getDate() + '. ' + (today.getMonth() + 1) + '. ' + today.getFullYear();

        let classContainer = style.container +' '+ style.containerComment;
        if (this.state.isAnswer) {
            classContainer += (' ' + style.containerAnswer);
        }
        return (<div className={classContainer}>
                <div className={style.info}>
                    <div className={style.containerInfo}>
                        <p className={style.icon}><AccountCircleIcon style={{ fontSize: 40 }}/></p>
                        <div className={style.infoData}>
                            <p className={style.userName}>{this.state.userName}</p>
                            <p className={style.data}> {dataNow}</p>
                        </div>
                    </div>
                </div>
                <div className={style.containerAction}>
                    <form className={style.text}>
                        <textarea value={this.state.value} id="TextFeedback" placeholder="Оставьте свой отзыв" onChange={this.handleChange} className={style.textArea}/>
                    </form>
                    <div className={style.lastLine}>
                        {!this.state.isAnswer ? <div className={style.rating}>
                            Моя оценка:
                            <Rating style={classes.stars} size='small' name="half-rating-read" emptyIcon={<StarBorderIcon fontSize="inherit" />} defaultValue={0} precision={1}/>
                        </div> : <div></div>}
                        <div className={style.buttonsContainer}><ButtonSend/><ButtonCancel onClick={this.handleClick}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentInput;
