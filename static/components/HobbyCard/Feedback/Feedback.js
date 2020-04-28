import React, { Component } from 'react';
import style from './Feedback.css';
import { connect } from 'react-redux';
import CommentText from './CommentText';
import CommentInput from './CommentInput';
import { addProviderResponse, addUserFeedback } from '../../../redux/actions/hobbyActions';


class Feedback extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (values) => {
        console.log(values);
        if (this.props.isUserAuth) {
            this.props.onUserFeedback(this.props.hobbyId, this.props.id, values);
        } else {
            this.props.onProviderResponse(this.props.hobbyId, this.props.id, values);
        }
    };

    render() {
        const isProvider = this.props.isProviderAuth;
        const isOwner = this.props.isOwner;
        const onSubmit = this.handleSubmit
        return (
            <div>
                <ul className={style.list}>
                    {
                        this.props.comments.map(function (item) {
                            let isHaveAnswer = true;
                            if ((item.answer) == null){
                                isHaveAnswer = false;
                            }
                            return <li key={item.idComment} className={style.container}>
                                <CommentText comment={item} handleSubmit={onSubmit} isProviderAuth={isProvider} isHaveAnswer= {isHaveAnswer} isOwner = {isOwner} isItAnswerProvider={false}/>
                                {item.answer &&
                                <CommentText comment={item.answer} isProviderAuth={isProvider} isItAnswerProvider={true}/>}
                            </li>;
                        })
                    }
                </ul>
                {this.props.isUserAuth &&
                <div><p className={style.labelAnswer}> Добавить отзыв:</p>
                    <CommentInput onSubmit={onSubmit} isAnswer={false} name={this.props.name}/></div>}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isUserAuth: state.auth.isAuth,
    isProviderAuth: state.providerCabinet.isProviderAuth,
    id: state.auth.userId || state.providerCabinet.providerId,
    hobbyId: state.hobbyPage.id,
    comments: state.hobbyPage.comments,
    name: state.auth.name || state.providerCabinet.name,
});
const mapDispatchToProps = (dispatch) => ({
    onUserFeedback: (idHobby, idUser, values) => dispatch(addUserFeedback(idHobby, idUser, values)),
    onProviderResponse: (idHobby, idUser, values) => dispatch(addProviderResponse(idHobby, idUser, values)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

