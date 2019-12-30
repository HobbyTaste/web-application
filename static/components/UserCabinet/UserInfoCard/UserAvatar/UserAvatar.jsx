import React, {Component} from 'react';
import style from "./UserAvatar.module.css";
import User from '../../../../api/User';

const userApi = new User();

function UserAvatar (props) {
    const [avatarUrl, setUrl] = React.useState(null);
    React.useEffect( () => {
        let cancel = undefined;
        const promise = new Promise((resolve, reject) => {
            cancel = reject;
            userApi.getInfo()
                .then(response => {
                    cancel = undefined;
                    resolve(response.avatar);
                })
        });
        promise.then(setUrl);
        return cancel;
    }, []);
    const url = avatarUrl || 'https://mirpozitiva.ru/uploads/posts/2016-08/medium/1472042492_01.jpg';
    return (
        <div className={style.imgWrapper}>
            <div className={style.imgContainer}>
                <div className={style.img}
                     style={{
                         backgroundImage: `url("${url}")`
                     }}>
                </div>
            </div>
        </div>
    );
};

export default UserAvatar;
