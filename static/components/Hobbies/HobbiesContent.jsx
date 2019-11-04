import React, {Component} from 'react';
import s from './HobbiesContent.module.css';
import HobbyCard from "./HobbyCard/HobbyCard";


let HobbiesContent = (props) => {
    /*let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for(let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }*/

    const hobbyCards = props.hobbyCards.map(c => <HobbyCard {...c}/>);

    return (<div>
        <div className={s.title}>Результаты поиска</div>
        <div className={s.body}>
            {hobbyCards}
{/*                {
                props.hobbyCards.map(c => <div className={s.card} key={c.id}>
                        <img src={c.photo} alt="" />
                    </div>)
                    }*/}

            {/*<div className={s.cardContainer}> </div>
            <div className={s.cardContainer}> </div>*/}
        </div>

    </div>);
};

export default HobbiesContent;